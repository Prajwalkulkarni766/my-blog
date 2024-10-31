"""
schemas/follower.py

This module defines the Pydantic models for follower-related operations in the application. 
It includes schemas for creating and managing follower relationships between users.
"""


from pydantic import BaseModel


class FollowerBase(BaseModel):
  followed_id: int


class FollowerCreate(FollowerBase):
  pass


class Follower(FollowerBase):
  follower_id: int

  class Config:
    from_attributes = True
