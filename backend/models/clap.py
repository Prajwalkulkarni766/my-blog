"""
models/clap.py

This module defines the Clap model for the application. It represents 
the structure of the clap table in the database, allowing tracking of 
user interactions (claps) with blog posts.
"""


from sqlalchemy import Column, ForeignKey, Integer, DateTime, func
from ..configs.db import Base
from sqlalchemy.orm import relationship


class Clap(Base):
  """
    Represents a clap (like) action by a user on a blog post.

    Attributes:
        id (int): The unique identifier for the clap.
        user_id (int): The ID of the user who clapped.
        blog_id (int): The ID of the blog post being clapped.
        created_at (datetime): The timestamp when the clap was created.
  """
  __tablename__ = "clap"
  id = Column(Integer, primary_key=True, index=True)
  user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
  blog_id = Column(Integer, ForeignKey("blog.id"), nullable=False)
  created_at = Column(DateTime, default=func.now())

  user = relationship("User")
  blog = relationship("Blog")
