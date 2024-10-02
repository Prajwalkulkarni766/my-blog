from pydantic import BaseModel


class FollwerBase(BaseModel):
    follower_id: int
    followed_id: int


class FollwerCreate(FollwerBase):
    pass


class Follwer(FollwerBase):
    id: int

    class Config:
        orm_model = True
