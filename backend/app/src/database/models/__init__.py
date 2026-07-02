from sqlmodel import SQLModel

from app.src.database.models.user_information import UserInformation
from app.src.database.models.user_model import Users



BaseSQLModel = SQLModel()
__all__ = ['BaseSQLModel','Users','UserInformation',]