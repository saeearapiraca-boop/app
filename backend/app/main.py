from fastapi import FastAPI
from app.core.config import settings
from app.db.database import engine, Base

# Isto cria as tabelas automaticamente se elas ainda não existirem
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url="/openapi.json"
)

@app.get("/")
def read_root():
    return {"status": "SAAE Arapiraca API está online!"}
