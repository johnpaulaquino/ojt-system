import os
from pathlib import Path

from dotenv import load_dotenv
from pydantic import BaseModel, EmailStr, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict

load_dotenv()

class Constants(BaseSettings):

    # this is for jwt configuration
    JWT_KEY: str
    JWT_ALGORITHM: str
    JWT_EXPIRATION: int
    
    ENVIRONMENT: str
    # this is for database
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str
    DB_HOST: str
    DB_PORT: int

    SERVER_PORT: int
    
    # Cloudinary config
    C_NAME: str
    C_KEY: str
    C_SECRET: str
    C_SECURE: bool

    #production_env
    DB_PROD_USER :str
    DB_PROD_HOST : str
    DB_PROD_NAME : str
    DB_PROD_PORT : int
    DB_PROD_PASSWORD : str



    TEMPLATE_PATH: Path = Path(__file__).resolve().parent

    FILE_SIZE_LIMIT: int = 1024 * 1024 * 10  # it is exactly 10 mb

    STATIC_PATH: str = os.path.abspath(os.path.join(os.curdir, 'static'))

     # For sending email in localhost
    MAIL_USERNAME: str
    MAIL_PASSWORD: SecretStr
    MAIL_FROM: str | EmailStr
    MAIL_PORT: int
    MAIL_SERVER: str
    MAIL_STARTTLS: bool
    MAIL_SSL_TLS: bool
    MAIL_USE_CREDENTIALS: bool
    MAIL_VALIDATE_CERTS: bool


class EnvironmentStatus(str):
    DEVELOPMENT ="Dev"
    PRODUCTION  = "Production"
    TESTING = "Testing"


ConstantsData = Constants()
