from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from ..configs.db import Base


class Comment(Base):
    __tablename__ = "comment"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(String(255))
    user_id = Column(Integer, ForeignKey("user.id"))
    blog_id = Column(Integer, ForeignKey("blog.id"))
