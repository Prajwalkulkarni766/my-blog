"""
models/user.py

This module defines the User model for the application. It represents 
the users of the application, containing their details such as name, 
email, password, and account status, along with metadata about their 
following behavior and account creation.
"""


from sqlalchemy import Boolean, Column, Integer, String, DateTime, func, Text
from ..configs.db import Base


class User(Base):
  """
    Represents a user in the application.

    Attributes:
        id (int): The unique identifier for the user.
        name (str): The name of the user.
        email (str): The email address of the user, must be unique.
        password (str): The hashed password of the user.
        about (str): A brief description about the user.
        follower_count (int): The number of followers the user has.
        following_count (int): The number of users the user is following.
        is_active (bool): Indicates whether the user's account is active.
        created_at (datetime): The timestamp when the account was created.
        updated_at (datetime): The timestamp when the account was last updated.
  """
  __tablename__ = "user"
  id = Column(Integer, primary_key=True, index=True)
  name = Column(String(255), index=True)
  email = Column(String(255), unique=True, index=True)
  password = Column(String(255))
  about = Column(Text)
  follower_count = Column(Integer, default=0)
  following_count = Column(Integer, default=0)
  is_active = Column(Boolean, default=False)
  created_at = Column(DateTime, default=func.now())
  updated_at = Column(DateTime, onupdate=func.now())
