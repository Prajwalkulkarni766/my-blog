from pydantic import BaseModel


class HistoryBase(BaseModel):
    user_id: int
    blog_id: int
    blog_title: str
    blog_sub_title: str
    blog_tags: str


class HistoryCreate(HistoryBase):
    pass


class History(HistoryBase):
    id: int

    class Config:
        orm_model = True
