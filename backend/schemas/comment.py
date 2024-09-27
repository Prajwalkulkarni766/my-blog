from pydantic import BaseModel


class CommentBase(BaseModel):
    user_id: int
    blog_id: int
    content: str


class CommentCreate(CommentBase):
    pass


class Comment(CommentBase):
    id: int

    class Config:
        orm_model = True
