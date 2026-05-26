from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum

class TipoOcorrencia(str, Enum):
    esgoto = "esgoto"
    agua = "agua"
    mosquito = "mosquito"
    lixo = "lixo"

class OcorrenciaBase(BaseModel):
    descricao: str = Field(..., min_length=5, max_length=500)
    localizacao: str = Field(..., min_length=3, max_length=255)
    tipo: TipoOcorrencia

class OcorrenciaCreate(OcorrenciaBase):
    pass

class OcorrenciaRead(OcorrenciaBase):
    id: UUID
    midia_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
