from pydantic import BaseModel


class BlogBase(BaseModel):
    title: str
    sub_title: str
    content: str
    image: str
    user_id: int
    tags: str


class BlogCreate(BlogBase):
    pass


class BlogUpdate(BlogBase):
    id: int


class Blog(BlogBase):
    id: int
    clap_count: int
    comment_count: int

    class Config:
        orm_model = True
