from contextlib import asynccontextmanager
from pathlib import Path
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.v1 import api_router
from app.core.config import settings
from app.core.health import get_database_info, verify_database_connection
from app.core.logger import logger
from app.db.database import Base, engine


def startup():
    """Executa verificações e migrações ao iniciar a aplicação."""
    # Criar tabelas que ainda não existem no banco
    Base.metadata.create_all(bind=engine)
    logger.info("Tabelas verificadas/criadas com sucesso.")

    # Verificar conexão com banco de dados
    logger.info("\nVerificando conexão com banco de dados")

    if verify_database_connection():
        db_info = get_database_info()
        logger.info("INFO: BANCO DE DADOS OPERANTE")
        logger.info(f"      Banco: {db_info.get('database', 'N/A')}")
        logger.info(f"      Usuário: {db_info.get('user', 'N/A')}")
        logger.info(f"      Versão: {db_info.get('version', 'PostgreSQL')}")
    else:
        logger.error("INFO: Falha na conexão com o banco de dados")
        raise RuntimeError("Database connection failed")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Gerencia o ciclo de vida da aplicação."""
    startup()
    yield
    logger.info("Encerrando SAEE Arapiraca API...")


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url="/openapi.json",
    lifespan=lifespan,
)

# CORS - Permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuração de Arquivos Estáticos (Uploads de imagens/vídeos)
# Path(__file__).resolve().parent é 'backend/app', e .parent é 'backend'
BASE_BACKEND_DIR = Path(__file__).resolve().parent.parent
STATIC_DIR = BASE_BACKEND_DIR / "static"

# Garante que a pasta física exista
os.makedirs(STATIC_DIR / "uploads", exist_ok=True)

# Monta a rota /static apontando para a pasta física backend/static
app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

app.include_router(api_router)


@app.get("/")
def read_root():
    return {"status": "SAEE Arapiraca API está online!"}