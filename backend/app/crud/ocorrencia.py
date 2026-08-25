from sqlalchemy.orm import Session
from app.models.ocorrencia import Ocorrencia, TipoOcorrencia, StatusOcorrencia
from app.schemas.ocorrencia import OcorrenciaCreate
from typing import Optional, List

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

def get_ocorrencia(db: Session, ocorrencia_id: str):
    return db.query(Ocorrencia).filter(Ocorrencia.id == ocorrencia_id).first()

def update_ocorrencia_status(db: Session, ocorrencia_id: str, novo_status: StatusOcorrencia):
    ocorrencia = get_ocorrencia(db, ocorrencia_id)

    if ocorrencia:
        ocorrencia.status = novo_status
        db.commit()
        db.refresh(ocorrencia)
    
    return ocorrencia

def get_all_ocorrencias(db: Session, localizacao: Optional[str] = None) -> List[Ocorrencia]:
    query = db.query(Ocorrencia)

    #se o front passar uma localizaçao ou bairro, filtramos por aproximaçao, case insensitive
    if localizacao:
        query = query.filter(Ocorrencia.localizacao.ilike(f"%{localizacao}%"))
    
    return query.all()