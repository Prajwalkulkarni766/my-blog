"""
models/follower.py

This module defines the Follower model for the application. It represents 
the relationship between users in the database, allowing users to follow 
each other in a social network context.
"""


from sqlalchemy import Column, ForeignKey, Integer, DateTime, func
from ..configs.db import Base


class Follower(Base):
  """
    Represents a relationship where one user follows another.

    Attributes:
        follower_id (int): The ID of the user who is following.
        followed_id (int): The ID of the user being followed.
        created_at (datetime): The timestamp when the follow relationship was created.
  """
  __tablename__ = "follower"
  follower_id = Column(Integer, ForeignKey("user.id"), primary_key=True)
  followed_id = Column(Integer, ForeignKey("user.id"), primary_key=True)
  created_at = Column(DateTime, default=func.now())
