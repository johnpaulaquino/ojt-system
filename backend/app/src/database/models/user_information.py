
from typing import Optional
from uuid import uuid4

from sqlalchemy import Column, JSON
from sqlmodel import Field, SQLModel

from app.src.schema import CloudinaryImageSchema


class UserProgramType(str):
    SPES = 'SPES'
    OJT = 'OJT'
    WORK_IMMERSION = "Work Immersion"


class BaseUserInformation(SQLModel):
    fullname: str = Field(nullable=True)
    contact_no: str = Field(nullable=True)
    academic_year: str = Field(nullable=True)
    program_type: str = Field(nullable=True)
    program: str = Field(nullable=True)
    institution: str = Field(nullable=True)
    total_hours: int = Field(nullable=True)


class UserInformation(BaseUserInformation, table=True):
    __tablename__ = "user_information"
    user_info_id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    profile_img: CloudinaryImageSchema = Field(sa_column=Column(JSON, nullable=True))
    user_id_ufk: str = Field(foreign_key="users.user_id", nullable=True, ondelete='CASCADE')


class CreateUserInformation(BaseUserInformation):
    pass


class UpdateUserInformation(BaseUserInformation):
    profile_img: Optional[CloudinaryImageSchema] = Field(sa_column=Column(JSON, nullable=True))


