"""
models/history.py

This module defines the History model for the application. It represents 
the history of user interactions with blog posts, tracking which users 
have engaged with which blog entries.
"""


from sqlalchemy import Column, ForeignKey, Integer, DateTime, func
from ..configs.db import Base
from sqlalchemy.orm import relationship
from ..models.user import User
from ..models.blog import Blog


class History(Base):
  """
    Represents a record of a user's interaction with a blog post.

    Attributes:
        id (int): The unique identifier for the history entry.
        user_id (int): The ID of the user who interacted with the blog post.
        blog_id (int): The ID of the blog post that was interacted with.
        created_at (datetime): The timestamp when the interaction occurred.
  """
  __tablename__ = "history"
  id = Column(Integer, primary_key=True, index=True)
  user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
  blog_id = Column(Integer, ForeignKey("blog.id"), nullable=False)
  created_at = Column(DateTime, default=func.now())

  user = relationship("User")
  blog = relationship("Blog")
