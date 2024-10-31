"""
models/blog.py

This module defines the Blog model for the application. It represents the
structure of the blog table in the database and includes fields for 
the blog's title, content, user association, and various counts related 
to user interactions such as claps and comments.
"""


from sqlalchemy import Column, ForeignKey, Integer, DateTime, func, Text
from ..configs.db import Base
from sqlalchemy.orm import relationship


class Blog(Base):
  """
    Represents a blog post in the application.

    Attributes:
        id (int): The unique identifier for the blog post.
        title (str): The title of the blog post.
        sub_title (str): The subtitle of the blog post.
        content (str): The main content of the blog post.
        clap_count (int): The number of claps for the blog post.
        comment_count (int): The number of comments for the blog post.
        image (str): The URL of the blog post's image.
        tags (str): The tags associated with the blog post.
        user_id (int): The ID of the user who created the blog post.
        created_at (datetime): The timestamp when the blog post was created.
        updated_at (datetime): The timestamp when the blog post was last updated.
  """
  __tablename__ = "blog"
  id = Column(Integer, primary_key=True, index=True)
  title = Column(Text, nullable=False)
  sub_title = Column(Text, nullable=False)
  content = Column(Text, nullable=False)
  clap_count = Column(Integer, default=0)
  comment_count = Column(Integer, default=0)
  image = Column(Text, default="")
  tags = Column(Text, default="")
  user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
  created_at = Column(DateTime, default=func.now())
  updated_at = Column(DateTime, onupdate=func.now())

  user = relationship("User")
