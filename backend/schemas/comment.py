"""
schemas/comment.py

This module defines the Pydantic models for comment-related operations in the application. 
It includes schemas for creating, responding to, and managing comments on blog posts.
"""


from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class CommentBase(BaseModel):
  blog_id: int
  content: str = Field(..., max_length=255)


class CommentCreate(CommentBase):
  user_id: Optional[int] = None


class CommentResponse(BaseModel):
  user_name: str
  created_at: datetime
  content: str


class Comment(CommentBase):
  id: int
  user_id: int

  class Config:
    from_attributes = True
