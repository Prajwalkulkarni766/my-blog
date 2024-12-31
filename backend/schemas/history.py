"""
schemas/history.py

This module defines the Pydantic models for history-related operations in the application. 
It includes schemas for tracking user interactions with blogs, such as views and reads.
"""


from pydantic import BaseModel
from datetime import datetime


class HistoryDetails(BaseModel):
  user_id: int
  blog_id: int


class HistoryGet(BaseModel):
  id: int
  blog_title: str
  blog_subtitle: str
  created_at: datetime


class HistoryCreate(HistoryDetails):
  pass


class History(HistoryDetails):
  id: int

  class Config:
    from_attributes = True
