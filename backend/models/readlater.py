"""
models/read_later.py

This module defines the ReadLater model for the application. It represents 
the functionality allowing users to save blog posts for later reading, 
tracking which users have saved which posts along with the timestamp of 
when each entry was created.
"""


from sqlalchemy import Column, ForeignKey, Integer, DateTime, func
from ..configs.db import Base
from sqlalchemy.orm import relationship
from ..models.blog import Blog
from ..models.user import User


class ReadLater(Base):
  """
    Represents a user's action of saving a blog post for later reading.

    Attributes:
        id (int): The unique identifier for the read-later entry.
        user_id (int): The ID of the user who saved the blog post.
        blog_id (int): The ID of the blog post being saved.
        created_at (datetime): The timestamp when the entry was created.
  """
  __tablename__ = "read_later"
  id = Column(Integer, primary_key=True, index=True)
  user_id = Column(Integer, ForeignKey("user.id"))
  blog_id = Column(Integer, ForeignKey("blog.id"))
  created_at = Column(DateTime, default=func.now())

  user = relationship("User")
  blog = relationship("Blog")
