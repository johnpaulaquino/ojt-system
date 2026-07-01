from datetime import datetime
from typing import List

from pydantic import BaseModel, ConfigDict

from backend.app.src.schema import CloudinaryImageSchema


class UsersDTO(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    student_id: str  | None = None
    email: str  | None = None
    user_id: str  | None = None
    password: str  | None = None
    user_role: str  | None = None
    user_status: bool  | None = None
    created_at: datetime  | None = None
    updated_at: datetime | None = None


class ListOfUserDTO(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    users : List[UsersDTO]


class FullUserInformationDTO(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    student_id: str | None = None
    email: str | None = None
    user_id: str | None = None
    password: str | None = None
    user_role: str | None = None
    user_status: bool | None = None
    created_at: datetime | None = None
    updated_at: datetime | None = None
    user_info_id: str  | None = None
    profile_img: CloudinaryImageSchema  | None = None
    fullname: str | None = None
    contact_no: str | None = None
    academic_year: str | None = None
    program_type: str  | None = None
    program: str  | None = None
    institution: str  | None = None
    total_hours: int | None = None


class ListOfFullUserInformation(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    users : List[FullUserInformationDTO]