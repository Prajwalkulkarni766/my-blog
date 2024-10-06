from pydantic import BaseModel
from datetime import datetime


class HistoryBase(BaseModel):
    user_id: int
    blog_id: int
    blog_title: str
    blog_sub_title: str
    blog_tags: str


class HistoryGet(BaseModel):
    id: int
    blog_title: str
    blog_sub_title: str
    created_at: datetime


class HistoryCreate(HistoryBase):
    pass


class History(HistoryBase):
    id: int

    class Config:
        orm_model = True
