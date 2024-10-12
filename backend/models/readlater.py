from sqlalchemy import Column, ForeignKey, Integer, DateTime, func
from ..configs.db import Base
from sqlalchemy.orm import relationship
from ..models.blog import Blog
from ..models.user import User


class ReadLater(Base):
    __tablename__ = "read_later"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    blog_id = Column(Integer, ForeignKey("blog.id"))
    created_at = Column(DateTime, default=func.now())

    user = relationship("User")
    blog = relationship("Blog")
