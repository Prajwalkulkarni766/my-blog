"""
schemas/blog.py

This module defines the Pydantic models for blog-related operations in the application. 
It includes schemas for creating, updating, retrieving, and displaying blog data.
"""


from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class BlogBase(BaseModel):
  title: str = Field(..., max_length=255)
  sub_title: str = Field(..., max_length=255)
  content: str = Field(..., min_length=1)
  tags: Optional[str] = Field(default="")


class BlogCreate(BlogBase):
  pass


class BlogUpdate(BlogBase):
  id: int


class BlogGet(BlogBase):
  id: int
  image: str
  clap_count: int
  comment_count: int
  created_at: datetime
  user_id: int
  user_name: str
  user_about: str
  user_follower: int
  is_following: bool
  tags: str


class BlogStr(BaseModel):
  id: int
  image: str
  title: str
  sub_title: str
  clap_count: int
  comment_count: int
  created_at: datetime


class Blog(BlogBase):
  id: int
  user_id: int
  clap_count: int
  comment_count: int

  class Config:
    from_attributesl = True
