import enum
from datetime import datetime

from sqlalchemy import DateTime, Enum, String, func, text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.database import Base


class TipoOcorrencia(str, enum.Enum):
    esgoto = "esgoto"
    agua = "agua"
    mosquito = "mosquito"
    lixo = "lixo"


class Ocorrencia(Base):
    __tablename__ = "ocorrencias"

    id: Mapped[str] = mapped_column(
        UUID(as_uuid=False),
        primary_key=True,
        server_default=text("gen_random_uuid()"),
    )
    descricao: Mapped[str] = mapped_column(String(500), nullable=False)
    localizacao: Mapped[str] = mapped_column(String(255), nullable=False)
    tipo: Mapped[TipoOcorrencia] = mapped_column(Enum(TipoOcorrencia), nullable=False)
    midia_url: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
    # Associação com usuário (descomente para ativar):
    # usuario_id: Mapped[str] = mapped_column(UUID(as_uuid=False), ForeignKey("users.id"), nullable=True)
    # usuario: Mapped["User"] = relationship("User")
