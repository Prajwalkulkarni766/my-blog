from pydantic import BaseModel
from datetime import datetime


class ReadLaterBase(BaseModel):
    user_id: int
    blog_id: int


class ReadLaterCreate(BaseModel):
    blog_id: int


class ReadLater(ReadLaterBase):
    id: int
    created_at: datetime

    class Config:
        orm_model = True
