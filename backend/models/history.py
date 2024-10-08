from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, func
from ..configs.db import Base


class History(Base):
    __tablename__ = "history"
    id = Column(Integer, primary_key=True, index=True)
    blog_id = Column(Integer, ForeignKey("blog.id"))
    user_id = Column(Integer, ForeignKey("user.id"))
    blog_title = Column(String(255))
    blog_sub_title = Column(String(255))
    blog_tags = Column(String(2000))
    created_at = Column(DateTime, default=func.now())
