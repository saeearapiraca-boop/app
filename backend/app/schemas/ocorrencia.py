from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, ConfigDict, Field
from typing import Optional, List
from app.models.ocorrencia import TipoOcorrencia, StatusOcorrencia


class OcorrenciaBase(BaseModel):
    descricao: str = Field(..., min_length=5, max_length=500)
    localizacao: str = Field(..., min_length=3, max_length=255)
    tipo: TipoOcorrencia

class OcorrenciaCreate(OcorrenciaBase):
    pass

class OcorrenciaUpdateStatus(BaseModel):
    status: StatusOcorrencia

class OcorrenciaRead(OcorrenciaBase):
    id: UUID
    usuario_id: Optional[UUID] = None
    status: StatusOcorrencia
    midia_url: Optional[str] = None
    curtidas: Optional[int] = 0
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class ComentarioCreate(BaseModel):
    texto: str = Field(..., min_length=1, max_length=500, description="Texto do comentário.")

class ComentarioRead(BaseModel):
    id: str
    ocorrencia_id: str
    texto: str
    created_at: datetime

    class Config:
        from_attributes = True

# --- Schemas do Dashboard Administrativo ---

class DashboardResumo(BaseModel):
    totalOcorrencias: int
    emAberto: int
    resolvidas: int

class DashboardStatusDistribuicao(BaseModel):
    status: str
    quantidade: int

class BairroMaisAfetado(BaseModel):
    nome: str
    quantidade: int

class DashboardBairroDistribuicao(BaseModel):
    bairro: str
    quantidade: int

class DashboardBairros(BaseModel):
    # Definido como Optional para não quebrar a API caso o banco de dados esteja vazio
    bairroMaisAfetado: Optional[BairroMaisAfetado] = None
    distribuicao: List[DashboardBairroDistribuicao]

class DashboardResponse(BaseModel):
    resumo: DashboardResumo
    distribuicaoPorStatus: List[DashboardStatusDistribuicao]
    bairros: DashboardBairros