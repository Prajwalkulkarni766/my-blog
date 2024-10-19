from pydantic import BaseModel
from typing import Optional


class ClapBase(BaseModel):
    user_id: int
    blog_id: int


class ClapCreate(BaseModel):
    blog_id: int


class Clap(ClapBase):
    id: int

    class Config:
        from_attributesl = True
