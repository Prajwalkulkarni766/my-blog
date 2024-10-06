from pydantic import BaseModel
from datetime import datetime


class BlogBase(BaseModel):
    title: str
    sub_title: str
    content: str
    image: str = ""
    user_id: int
    tags: str


class BlogCreate(BaseModel):
    title: str
    sub_title: str
    content: str
    image: str = ""
    tags: str


class BlogUpdate(BlogBase):
    id: int


class BlogStr(BaseModel):
    id: int
    title: str
    sub_title: str
    clap_count: int
    comment_count: int
    created_at: datetime


class Blog(BlogBase):
    id: int
    clap_count: int
    comment_count: int

    class Config:
        orm_model = True
