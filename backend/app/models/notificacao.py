import enum

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, String, func, text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import relationship

from app.db.database import Base


class TipoNotificacao(str, enum.Enum):
    """Evento que originou a notificação.

    O conteúdo específico de cada evento vive na coluna `dados` (JSONB), então
    acrescentar um tipo aqui não exige alteração na tabela.
    """

    status_alterado = "status_alterado"


class Notificacao(Base):
    __tablename__ = "notificacoes"

    id = Column(UUID(as_uuid=False), primary_key=True, server_default=func.gen_random_uuid())
    # as_uuid=False para acompanhar o tipo de User.id.
    usuario_id = Column(
        UUID(as_uuid=False),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    ocorrencia_id = Column(
        UUID(as_uuid=False),
        ForeignKey("ocorrencias.id", ondelete="CASCADE"),
        nullable=False,
    )
    # Discriminador: diz ao frontend como renderizar o item.
    tipo = Column(
        String(50),
        nullable=False,
        index=True,
        default=TipoNotificacao.status_alterado.value,
    )
    # Payload do evento. Para status_alterado: {"de": "Aberto", "para": "Resolvido"}.
    dados = Column(JSONB, nullable=False, default=dict, server_default=text("'{}'::jsonb"))
    mensagem = Column(String(255), nullable=False)
    lida = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    usuario = relationship("User")
    ocorrencia = relationship("Ocorrencia")
