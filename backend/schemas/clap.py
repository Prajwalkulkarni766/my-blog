from pydantic import BaseModel


class ClapBase(BaseModel):
    user_id: int
    blog_id: int


class ClapCreate(BaseModel):
    blog_id: int


class Clap(ClapBase):
    id: int

    class Config:
        orm_model = True
