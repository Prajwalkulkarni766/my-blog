from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, func
from ..configs.db import Base


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    email = Column(String(255), unique=True, index=True)
    password = Column(String(255))
    about = Column(String(255))
    follower_count = Column(Integer, default=0)
    following_count = Column(Integer, default=0)
    is_active = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
