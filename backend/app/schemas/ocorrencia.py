from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, ConfigDict, Field, field_validator
from typing import Optional
from app.models.ocorrencia import TipoOcorrencia, StatusOcorrencia


class OcorrenciaBase(BaseModel):
    descricao: str = Field(..., min_length=5, max_length=500)
    localizacao: str = Field(..., min_length=3, max_length=255)
    tipo: TipoOcorrencia

    @field_validator("descricao", "localizacao", mode="before")
    @classmethod
    def limpar_espacos(cls, value:str) -> str:
        if isinstance(value, str):
            valor_limpo = value.strip()
            if not valor_limpo:
                raise ValueError("Este campo não pode estar vazio ou conter apenas espaços.")
            return valor_limpo
        return value
    
class OcorrenciaCreate(OcorrenciaBase):
    pass

class OcorrenciaUpdateStatus(BaseModel):
    status: StatusOcorrencia

class OcorrenciaRead(OcorrenciaBase):
    id: UUID
    status: StatusOcorrencia
    midia_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
