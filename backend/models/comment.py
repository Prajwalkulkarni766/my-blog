"""
models/comment.py

This module defines the Comment model for the application. It represents 
the structure of the comment table in the database, allowing users to 
leave comments on blog posts.
"""


from sqlalchemy import Column, ForeignKey, Integer, DateTime, func, Text
from ..configs.db import Base
from sqlalchemy.orm import relationship


class Comment(Base):
  """
    Represents a comment made by a user on a blog post.

    Attributes:
        id (int): The unique identifier for the comment.
        user_id (int): The ID of the user who made the comment.
        blog_id (int): The ID of the blog post being commented on.
        content (str): The text content of the comment.
        created_at (datetime): The timestamp when the comment was created.
  """
  __tablename__ = "comment"
  id = Column(Integer, primary_key=True, index=True)
  user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
  blog_id = Column(Integer, ForeignKey("blog.id"), nullable=False)
  content = Column(Text, nullable=False)
  created_at = Column(DateTime, default=func.now())

  user = relationship("User")
  blog = relationship("Blog")
