from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class HistoryDetails(BaseModel):
    user_id: int
    blog_id: int


class HistoryGet(BaseModel):
    id: int
    blog_title: str
    blog_subtitle: str
    created_at: datetime


class HistoryCreate(HistoryDetails):
    pass


class History(HistoryDetails):
    id: int

    class Config:
        from_attributes = True
