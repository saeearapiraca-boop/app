from fastapi import APIRouter, Depends, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional
from app.api.deps import get_db
from app.schemas.ocorrencia import OcorrenciaCreate, OcorrenciaRead
from app.services.ocorrencia import registrar_ocorrencia

router = APIRouter(prefix="/ocorrencias", tags=["Ocorrências"])

@router.post(
    "/",
    response_model=OcorrenciaRead,
    status_code=status.HTTP_201_CREATED,
    summary="Registrar nova ocorrência",
    description="Registra uma nova ocorrência com mídia, descrição, localização e tipo.",
)
async def criar_ocorrencia(
    descricao: str = Form(...),
    localizacao: str = Form(...),
    tipo: str = Form(...),
    midia: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
):
    # Aqui você pode salvar o arquivo e obter a URL
    midia_url = None
    if midia:
        # Exemplo: salvar em disco ou serviço de arquivos
        midia_url = f"/static/uploads/{midia.filename}"
        with open(f"static/uploads/{midia.filename}", "wb") as f:
            f.write(await midia.read())
    ocorrencia_in = OcorrenciaCreate(descricao=descricao, localizacao=localizacao, tipo=tipo)
    ocorrencia = registrar_ocorrencia(db=db, ocorrencia_in=ocorrencia_in, midia_url=midia_url)
    return ocorrencia
