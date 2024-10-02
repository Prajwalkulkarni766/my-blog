from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from ..configs.db import Base


class Follower(Base):
    __tablename__ = "follwer"
    id = Column(Integer, primary_key=True, index=True)
    follower_id = Column(Integer, ForeignKey("user.id"))
    followed_id = Column(Integer, ForeignKey("user.id"))
