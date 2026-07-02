from typing import Optional

from pydantic import BaseModel, Field


class UpdateUserInformation(BaseModel):
    email : Optional[str] = Field(default=None)
    student_id : Optional[str] = Field(default=None)
    fullname: Optional[str] = Field(default=None)
    contact_no: Optional[str] = Field(default=None)
    academic_year: Optional[str] = Field(default=None)
    program_type: Optional[str] = Field(default=None)
    program: Optional[str] = Field(default=None)
    institution: Optional[str] = Field(default=None)
    total_hours: Optional[int] = Field(default=None)