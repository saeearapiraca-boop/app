from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.user import UserCreate, UserCreateResponse
from app.services.user import register_user

router = APIRouter(prefix="/usuarios", tags=["Usuários"])


@router.post(
    "/",
    response_model=UserCreateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Cadastrar novo usuário",
    description=(
        "Cria uma nova conta de usuário. "
        "O e-mail deve ser único e a senha deve atender aos critérios de segurança."
    ),
)
def create_user(
    user_in: UserCreate,
    db: Session = Depends(get_db),
) -> UserCreateResponse:
    return register_user(db=db, user_in=user_in)
