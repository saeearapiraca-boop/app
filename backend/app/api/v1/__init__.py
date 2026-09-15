from fastapi import APIRouter


from app.api.v1.endpoints import users, ocorrencias, notificacoes

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(users.router)
api_router.include_router(ocorrencias.router)
api_router.include_router(notificacoes.router)
