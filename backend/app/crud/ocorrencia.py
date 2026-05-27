from sqlalchemy.orm import Session
from app.models.ocorrencia import Ocorrencia, TipoOcorrencia
from app.schemas.ocorrencia import OcorrenciaCreate

def create_ocorrencia(db: Session, ocorrencia_in: OcorrenciaCreate, midia_url: str = None) -> Ocorrencia:
    ocorrencia = Ocorrencia(
        descricao=ocorrencia_in.descricao,
        localizacao=ocorrencia_in.localizacao,
        tipo=ocorrencia_in.tipo,
        midia_url=midia_url,
    )
    db.add(ocorrencia)
    db.commit()
    db.refresh(ocorrencia)
    return ocorrencia
