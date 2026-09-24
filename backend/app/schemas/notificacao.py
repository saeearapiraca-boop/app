from datetime import datetime
from typing import Any, Dict
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class NotificacaoRead(BaseModel):
    id: UUID
    usuario_id: UUID
    ocorrencia_id: UUID
    tipo: str = Field(
        description="Evento que gerou a notificação. Ex.: status_alterado."
    )
    dados: Dict[str, Any] = Field(
        default_factory=dict,
        description=(
            "Dados do evento. Para status_alterado: "
            '{"de": "Aberto", "para": "Em análise"}.'
        ),
    )
    mensagem: str
    lida: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ContagemNaoLidas(BaseModel):
    nao_lidas: int = Field(description="Quantidade de notificações ainda não lidas.")
