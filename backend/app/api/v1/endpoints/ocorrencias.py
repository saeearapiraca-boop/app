import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.ocorrencia import OcorrenciaCreate, OcorrenciaRead, OcorrenciaUpdateStatus, ComentarioCreate, ComentarioRead
from app.crud.ocorrencia import get_ocorrencia, update_ocorrencia_status, create_comentario, get_comentarios_by_ocorrencia
from app.services.ocorrencia import registrar_ocorrencia
from typing import List, Optional
from app.crud.ocorrencia import get_all_ocorrencias, curtir_ocorrencia

router = APIRouter(prefix="/ocorrencias", tags=["Ocorrências"])

UPLOAD_DIR = Path("static/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/webp", "video/mp4"}
MAX_FILE_SIZE_MB = 10


@router.post(
    "/",
    response_model=OcorrenciaRead,
    status_code=status.HTTP_201_CREATED,
    summary="Registrar nova ocorrência",
    description="Registra uma nova ocorrência com mídia obrigatória (imagem/vídeo), descrição, localização e tipo.",
)
async def criar_ocorrencia(
    descricao: str = Form(...),
    localizacao: str = Form(...),
    tipo: str = Form(...),
    midia: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    # Validar tipo MIME
    if midia.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Tipo de arquivo não permitido: {midia.content_type}. Use JPEG, PNG, WEBP ou MP4.",
        )

    # Ler conteúdo e validar tamanho
    content = await midia.read()
    if len(content) > MAX_FILE_SIZE_MB * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"Arquivo muito grande. Limite: {MAX_FILE_SIZE_MB}MB.",
        )

    # Nome seguro: uuid + extensão original (evita path traversal)
    suffix = Path(midia.filename).suffix.lower()
    safe_filename = f"{uuid.uuid4()}{suffix}"
    file_path = UPLOAD_DIR / safe_filename

    with open(file_path, "wb") as f:
        f.write(content)

    midia_url = f"/static/uploads/{safe_filename}"

    ocorrencia_in = OcorrenciaCreate(descricao=descricao, localizacao=localizacao, tipo=tipo)
    return registrar_ocorrencia(db=db, ocorrencia_in=ocorrencia_in, midia_url=midia_url)


@router.patch(
    "/{ocorrencia_id}/status",
    response_model=OcorrenciaRead,
    status_code=status.HTTP_200_OK,
    summary="Atualizar o status de uma ocorrência",
    description="Altera o status de uma denúncia. Valores aceitos: Aberto, Em análise, Resolvido."
)
def atualizar_status_ocorrencia(
    ocorrencia_id: str,
    status_update: OcorrenciaUpdateStatus, 
    db: Session = Depends(get_db)
):
    ocorrencia_existente = get_ocorrencia(db, ocorrencia_id=ocorrencia_id)
    if not ocorrencia_existente:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ocorrência não encontrada.")
    
    ocorrencia_atualizada = update_ocorrencia_status(
        db=db, 
        ocorrencia_id=ocorrencia_id, 
        novo_status=status_update.status
    )
    
    return ocorrencia_atualizada

@router.get(
    "/",
    response_model=List[OcorrenciaRead],
    status_code=status.HTTP_200_OK,
    summary="Listar todas as ocorrências",
    description="Retorna uma lista de todas as denúncias cadastradas, com opção de filtro por localização/bairro.",
)
def listar_ocorrencias(
    localizacao: Optional[str] = None,
    db: Session = Depends(get_db),
) -> List[OcorrenciaRead]:
    return get_all_ocorrencias(db=db, localizacao=localizacao)

@router.post(
    "/{ocorrencia_id}/curtir",
    response_model=OcorrenciaRead,
    status_code=status.HTTP_200_OK,
    summary="Curtir uma ocorrência",
    description="Incrementa o contador de curtidas de uma denúncia específica.",
)
def curtir_denuncia(
    ocorrencia_id: str,
    db: Session = Depends(get_db),
):
    ocorrencia = curtir_ocorrencia(db=db, ocorrencia_id=ocorrencia_id)
    if not ocorrencia:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ocorrência não encontrada.",
        )
    return ocorrencia

@router.post(
    "/{ocorrencia_id}/comentarios",
    response_model=ComentarioRead,
    status_code=status.HTTP_201_CREATED,
    summary="Adicionar comentário a uma ocorrência",
    description="Cria um novo comentário vinculado a uma denúncia específica.",
)
def adicionar_comentario(
    ocorrencia_id: str,
    comentario_in: ComentarioCreate,
    db: Session = Depends(get_db),
):
    ocorrencia = get_ocorrencia(db, ocorrencia_id=ocorrencia_id)
    if not ocorrencia:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ocorrência não encontrada.",
        )
    return create_comentario(db=db, ocorrencia_id=ocorrencia_id, comentario_in=comentario_in)


@router.get(
    "/{ocorrencia_id}/comentarios",
    response_model=List[ComentarioRead],
    status_code=status.HTTP_200_OK,
    summary="Listar comentários de uma ocorrência",
    description="Retorna a lista de todos os comentários feitos em uma denúncia.",
)
def listar_comentarios(
    ocorrencia_id: str,
    db: Session = Depends(get_db),
):
    ocorrencia = get_ocorrencia(db, ocorrencia_id=ocorrencia_id)
    if not ocorrencia:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ocorrência não encontrada.",
        )
    return get_comentarios_by_ocorrencia(db=db, ocorrencia_id=ocorrencia_id)