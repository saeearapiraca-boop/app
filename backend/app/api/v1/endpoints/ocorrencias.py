import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.ocorrencia import OcorrenciaCreate, OcorrenciaRead, OcorrenciaUpdateStatus
from app.crud.ocorrencia import get_ocorrencia, update_ocorrencia_status
from app.services.ocorrencia import registrar_ocorrencia

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