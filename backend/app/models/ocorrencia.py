from sqlalchemy import Column, String, DateTime, Enum, ForeignKey, func, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.db.database import Base
import enum

class StatusOcorrencia(str, enum.Enum):
    aberto = "Aberto"
    em_analise = "Em análise"
    resolvido = "Resolvido"

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
    status = Column(Enum(StatusOcorrencia), nullable=False, default=StatusOcorrencia.aberto)
    midia_url = Column(String(255), nullable=False)
    curtidas = Column(Integer, default=0, nullable=False)
    comentarios = relationship("Comentario", back_populates="ocorrencia", cascade="all, delete-orphan")
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    # Se quiser associar a um usuário futuramente, adicione o campo abaixo:
    # usuario_id = Column(UUID(as_uuid=False), ForeignKey("users.id"), nullable=True)
    # usuario = relationship("User")

class Comentario(Base):
    __tablename__ = "comentarios"

    id = Column(UUID(as_uuid=False), primary_key=True, server_default=func.gen_random_uuid())
    ocorrencia_id = Column(UUID(as_uuid=False), ForeignKey("ocorrencias.id", ondelete="CASCADE"), nullable=False)
    texto = Column(String(500), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    # Relacionamento para puxar os comentários direto da ocorrência se precisar
    ocorrencia = relationship("Ocorrencia", back_populates="comentarios")