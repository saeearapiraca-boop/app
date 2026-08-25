from sqlalchemy.orm import Session
from app.models.ocorrencia import Ocorrencia, TipoOcorrencia, StatusOcorrencia, Comentario
from app.schemas.ocorrencia import OcorrenciaCreate, ComentarioCreate
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

def curtir_ocorrencia(db: Session, ocorrencia_id: str):
    ocorrencia = get_ocorrencia(db, ocorrencia_id)
    if ocorrencia:
        ocorrencia.curtidas += 1
        db.commit()
        db.refresh(ocorrencia)
    return ocorrencia

def create_comentario(db: Session, ocorrencia_id: str, comentario_in: ComentarioCreate) -> Comentario:
    comentario = Comentario(
        ocorrencia_id=ocorrencia_id,
        texto=comentario_in.texto,
    )
    db.add(comentario)
    db.commit()
    db.refresh(comentario)
    return comentario

def get_comentarios_by_ocorrencia(db: Session, ocorrencia_id: str) -> List[Comentario]:
    return db.query(Comentario).filter(Comentario.ocorrencia_id == ocorrencia_id).all()