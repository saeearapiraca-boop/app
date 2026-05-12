from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.core.config import settings
from app.core.logger import logger
from app.core.health import verify_database_connection, get_database_info


def startup():
    """
    Executa verificações ao iniciar a aplicação
    """
    
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
    """Gerencia o ciclo de vida da aplicação"""
    startup()
    yield
    logger.info("Encerrando SAAE Arapiraca API...")


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url="/openapi.json",
    lifespan=lifespan
)


@app.get("/")
def read_root():
    return {"status": "SAAE Arapiraca API está online!"}
