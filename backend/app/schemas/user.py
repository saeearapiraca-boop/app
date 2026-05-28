import re
from datetime import date, datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field, field_validator


_PASSWORD_REGEX = re.compile(
    r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+\-_])[A-Za-z\d@$!%*?&#+\-_]{8,}$"
)

_VALID_SEXO = {"masculino", "feminino", "outro", "prefiro-nao-dizer"}


class UserCreate(BaseModel):
    nome_completo: str = Field(min_length=3, max_length=150)
    email: EmailStr
    senha: str = Field(min_length=8)
    data_nascimento: date
    sexo: str = Field(min_length=1, max_length=20)

    @field_validator("nome_completo", mode="before")
    @classmethod
    def strip_name(cls, v: str) -> str:
        return v.strip()

    @field_validator("sexo", mode="before")
    @classmethod
    def validate_sexo(cls, v: str) -> str:
        if v.lower() not in _VALID_SEXO:
            raise ValueError(
                "Sexo deve ser um dos seguintes: masculino, feminino, outro, prefiro-nao-dizer"
            )
        return v.lower()

    @field_validator("senha")
    @classmethod
    def validate_password_strength(cls, v: str) -> str:
        if not _PASSWORD_REGEX.match(v):
            raise ValueError(
                "Senha deve conter pelo menos 8 caracteres, "
                "uma letra maiúscula, uma minúscula, "
                "um número e um caractere especial (@$!%*?&#+_-)"
            )
        return v


class UserRead(BaseModel):
    id: UUID
    nome_completo: str
    email: EmailStr
    data_nascimento: date
    sexo: str
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class UserUpdate(BaseModel):
    nome_completo: str | None = Field(default=None, min_length=3, max_length=150)
    email: EmailStr | None = None
    senha: str | None = Field(default=None, min_length=8)
    data_nascimento: date | None = None
    sexo: str | None = Field(default=None, min_length=1, max_length=20)

    @field_validator("nome_completo", mode="before")
    @classmethod
    def strip_name(cls, v: str | None) -> str | None:
        return v.strip() if v else v

    @field_validator("sexo", mode="before")
    @classmethod
    def validate_sexo(cls, v: str | None) -> str | None:
        if v is not None and v.lower() not in _VALID_SEXO:
            raise ValueError(
                "Sexo deve ser um dos seguintes: masculino, feminino, outro, prefiro-nao-dizer"
            )
        return v.lower() if v else v

    @field_validator("senha")
    @classmethod
    def validate_password_strength(cls, v: str | None) -> str | None:
        if v is not None and not _PASSWORD_REGEX.match(v):
            raise ValueError(
                "Senha deve conter pelo menos 8 caracteres, "
                "uma letra maiúscula, uma minúscula, "
                "um número e um caractere especial (@$!%*?&#+_-)"
            )
        return v


class UserLogin(BaseModel):
    email: EmailStr
    senha: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserRead
