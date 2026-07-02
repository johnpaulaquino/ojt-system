from datetime import datetime
from uuid import uuid4

from pydantic.v1 import EmailStr
from sqlalchemy import Column, DateTime, func
from sqlmodel import Field, SQLModel
from starlette.authentication import BaseUser


class UserRole(str):
    ADMIN = "Admin"
    USER = "User"



class BaseUsers(SQLModel):
    student_id : str = Field(nullable=False, unique=True)
    email : str | EmailStr = Field(nullable=True, unique=True)



class Users(BaseUsers, table=True):
    __tablename__ = "users"
    user_id : str = Field(default_factory=lambda : str(uuid4()),primary_key=True)
    password : str = Field(nullable= True)
    user_role : str = Field(default=UserRole.USER,nullable=True)
    user_status : bool = Field(default=False,nullable=True)
    created_at: datetime = Field(sa_column=Column(DateTime(timezone=True),nullable=True, server_default=func.now()),default=func.now())
    updated_at : datetime = Field(sa_column=Column(DateTime(timezone=True),nullable=True, ))


class CreateUser(BaseUsers):
    pass

class UpdateUser(BaseUser):
    pass