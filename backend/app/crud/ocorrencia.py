from sqlalchemy.orm import Session
from sqlalchemy import func # Importação necessária para as agregações (COUNT, etc)
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

# --- Consultas do Dashboard Administrativo ---

def get_totais_ocorrencias(db: Session):
    # Calcula o total geral de ocorrências
    total = db.query(func.count(Ocorrencia.id)).scalar() or 0
    
    # É necessário ajustar as strings "ABERTO" e "RESOLVIDO" caso o Enum StatusOcorrencia utilize valores diferentes
    em_aberto = db.query(func.count(Ocorrencia.id)).filter(Ocorrencia.status == "ABERTO").scalar() or 0
    resolvidas = db.query(func.count(Ocorrencia.id)).filter(Ocorrencia.status == "RESOLVIDO").scalar() or 0
    
    return {
        "totalOcorrencias": total,
        "emAberto": em_aberto,
        "resolvidas": resolvidas
    }

def get_ocorrencias_por_status(db: Session):
    # Retorna uma lista de tuplas: [(status1, contagem1), (status2, contagem2)]
    return db.query(Ocorrencia.status, func.count(Ocorrencia.id)).group_by(Ocorrencia.status).all()

def get_ocorrencias_por_bairro(db: Session):
    # Como o schema possui o campo "localizacao", estamos agrupando por ele.
    # Retorna uma lista de tuplas: [(localizacao1, contagem1), (localizacao2, contagem2)]
    return db.query(Ocorrencia.localizacao, func.count(Ocorrencia.id)).group_by(Ocorrencia.localizacao).all()