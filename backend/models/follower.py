from sqlalchemy import Column, ForeignKey, Integer, DateTime, func
from ..configs.db import Base


class Follower(Base):
    __tablename__ = "follower"
    follower_id = Column(Integer, ForeignKey("user.id"), primary_key=True)
    followed_id = Column(Integer, ForeignKey("user.id"), primary_key=True)
    created_at = Column(DateTime, default=func.now())
