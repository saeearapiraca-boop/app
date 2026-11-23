from datetime import date

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "SAAE Arapiraca API"

    # Estas variáveis serão lidas do ficheiro .env
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ADMIN_EMAIL: str | None = None
    ADMIN_PASSWORD: str | None = None
    ADMIN_NAME: str | None = None
    ADMIN_BIRTH_DATE: date | None = None
    ADMIN_SEXO: str | None = None

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
