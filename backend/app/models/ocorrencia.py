from sqlalchemy import Column, String, DateTime, Enum, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.db.database import Base
import enum

class TipoOcorrencia(str, enum.Enum):
    esgoto = "esgoto"
    agua = "agua"
    mosquito = "mosquito"
    lixo = "lixo"

class Ocorrencia(Base):
    __tablename__ = "ocorrencias"

    id = Column(UUID(as_uuid=False), primary_key=True, server_default=func.gen_random_uuid())
    descricao = Column(String(500), nullable=False)
    localizacao = Column(String(255), nullable=False)
    tipo = Column(Enum(TipoOcorrencia), nullable=False)
    midia_url = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    # Se quiser associar a um usuário futuramente, adicione o campo abaixo:
    # usuario_id = Column(UUID(as_uuid=False), ForeignKey("users.id"), nullable=True)
    # usuario = relationship("User")
