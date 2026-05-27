from sqlalchemy.orm import Session
from app.schemas.ocorrencia import OcorrenciaCreate
from app.models.ocorrencia import Ocorrencia
from app.crud.ocorrencia import create_ocorrencia

def registrar_ocorrencia(db: Session, ocorrencia_in: OcorrenciaCreate, midia_url: str = None) -> Ocorrencia:
    return create_ocorrencia(db=db, ocorrencia_in=ocorrencia_in, midia_url=midia_url)
