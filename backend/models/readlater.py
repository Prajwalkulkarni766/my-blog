from sqlalchemy import Column, ForeignKey, Integer, DateTime, func
from ..configs.db import Base


class ReadLater(Base):
    __tablename__ = "read_later"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    blog_id = Column(Integer, ForeignKey("blog.id"))
    created_at = Column(DateTime, default=func.now())
