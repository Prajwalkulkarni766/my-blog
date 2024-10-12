from pydantic import BaseModel


class FollowerBase(BaseModel):
    followed_id: int


class FollowerCreate(FollowerBase):
    pass


class Follower(FollowerBase):
    follower_id: int

    class Config:
        from_attributes = True
