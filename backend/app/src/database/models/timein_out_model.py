from datetime import datetime
from uuid import uuid4

from pydantic import BaseModel
from sqlalchemy import Column, DateTime
from sqlmodel import Field


class BaseTimeInOut(BaseModel):
    time_in : datetime = Field(sa_column=Column(DateTime(timezone=True), nullable=True))
    time_out : datetime = Field(sa_column=Column(DateTime(timezone=True),nullable=True))


class TimeInOut(BaseTimeInOut, table=True):
    __tablename__ = "timein_out"
    timein_out : str = Field(default_factory=lambda : str(uuid4()), primary_key=True)
    user_id_tfk : str = Field(foreign_key="users.user_id", ondelete="CASCADE",nullable=True)
    status : str = Field(default=None, nullable= True)
    