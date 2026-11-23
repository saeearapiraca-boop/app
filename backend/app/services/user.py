from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import get_password_hash, verify_password, create_access_token
from app.crud import user as crud_user
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin


def register_user(db: Session, user_in: UserCreate) -> User:
    existing = crud_user.get_user_by_email(db, email=user_in.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="E-mail já cadastrado.",
        )

    hashed_password = get_password_hash(user_in.senha)
    return crud_user.create_user(db, user_in=user_in, hashed_password=hashed_password)


def login_user(db: Session, user_in: UserLogin) -> dict:
    user = crud_user.get_user_by_email(db, email=user_in.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha inválidos.",
        )

    if not verify_password(user_in.senha, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha inválidos.",
        )

    access_token = create_access_token(data={"sub": str(user.id)})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }


def bootstrap_admin_user(db: Session) -> None:
    if not settings.ADMIN_EMAIL:
        return

    email = str(settings.ADMIN_EMAIL).lower()
    existing_user = crud_user.get_user_by_email(db, email=email)
    if existing_user:
        if not existing_user.is_admin:
            raise RuntimeError(
                "ADMIN_EMAIL já pertence a um usuário comum. "
                "Use um e-mail exclusivo para a conta administrativa."
            )
        return

    required_settings = {
        "ADMIN_PASSWORD": settings.ADMIN_PASSWORD,
        "ADMIN_NAME": settings.ADMIN_NAME,
        "ADMIN_BIRTH_DATE": settings.ADMIN_BIRTH_DATE,
        "ADMIN_SEXO": settings.ADMIN_SEXO,
    }
    missing_settings = [
        name for name, value in required_settings.items() if not value
    ]
    if missing_settings:
        raise RuntimeError(
            "Configuração incompleta para criar o administrador: "
            + ", ".join(missing_settings)
        )

    admin_data = UserCreate(
        nome_completo=settings.ADMIN_NAME,
        email=email,
        senha=settings.ADMIN_PASSWORD,
        data_nascimento=settings.ADMIN_BIRTH_DATE,
        sexo=settings.ADMIN_SEXO,
    )
    crud_user.create_user(
        db,
        user_in=admin_data,
        hashed_password=get_password_hash(admin_data.senha),
        is_admin=True,
    )

