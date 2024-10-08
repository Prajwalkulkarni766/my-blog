from pydantic import BaseModel
from datetime import datetime


class CommentBase(BaseModel):
    blog_id: int
    content: str


class CommentCreate(CommentBase):
    pass

class CommentResponse(BaseModel):
    user_name: str
    created_at: datetime
    content: str

class Comment(CommentBase):
    id: int
    user_id: int

    class Config:
        orm_model = True
