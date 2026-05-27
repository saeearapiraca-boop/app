from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.api.deps import get_db
from app.crud import user as crud_user
from app.core.security import get_password_hash
from app.schemas.user import UserCreate, UserRead, UserUpdate, UserLogin, TokenResponse
from app.services.user import register_user, login_user

router = APIRouter(prefix="/usuarios", tags=["Usuários"])


@router.post(
    "/login",
    response_model=TokenResponse,
    status_code=status.HTTP_200_OK,
    summary="Login de usuário",
    description="Autentica um usuário e retorna um token JWT.",
)
def login(
    user_in: UserLogin,
    db: Session = Depends(get_db),
) -> TokenResponse:
    return login_user(db=db, user_in=user_in)


@router.post(
    "/",
    response_model=UserRead,
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
) -> UserRead:
    return register_user(db=db, user_in=user_in)


@router.get(
    "/{user_id}",
    response_model=UserRead,
    status_code=status.HTTP_200_OK,
    summary="Obter dados do usuário",
    description="Retorna os dados de um usuário específico pelo ID.",
)
def get_user(
    user_id: UUID,
    db: Session = Depends(get_db),
) -> UserRead:
    user = crud_user.get_user_by_id(db, user_id=str(user_id))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado.",
        )
    return user


@router.put(
    "/{user_id}",
    response_model=UserRead,
    status_code=status.HTTP_200_OK,
    summary="Atualizar dados do usuário",
    description="Atualiza os dados de um usuário específico.",
)
def update_user(
    user_id: UUID,
    user_in: UserUpdate,
    db: Session = Depends(get_db),
) -> UserRead:
    user = crud_user.get_user_by_id(db, user_id=str(user_id))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado.",
        )
    
    # Se o e-mail está sendo alterado, verifica se já existe
    if user_in.email and user_in.email != user.email:
        existing = crud_user.get_user_by_email(db, email=user_in.email)
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="E-mail já cadastrado.",
            )
    
    # Hash da nova senha se fornecida
    hashed_password = None
    if user_in.senha:
        hashed_password = get_password_hash(user_in.senha)
    
    return crud_user.update_user(db, user=user, user_in=user_in, hashed_password=hashed_password)


@router.delete(
    "/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Deletar usuário",
    description="Remove um usuário da base de dados.",
)
def delete_user(
    user_id: UUID,
    db: Session = Depends(get_db),
) -> None:
    user = crud_user.get_user_by_id(db, user_id=str(user_id))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado.",
        )
    
    crud_user.delete_user(db, user=user)
