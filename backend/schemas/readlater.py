"""
schemas/readlater.py

This module defines the Pydantic models for managing 'read later' functionality in the application. 
It includes schemas for tracking which blog posts users want to save for later reading.
"""


from pydantic import BaseModel
from datetime import datetime


class ReadLaterBase(BaseModel):
  user_id: int
  blog_id: int


class ReadLaterCreate(BaseModel):
  blog_id: int


class ReadLater(ReadLaterBase):
  id: int
  created_at: datetime

  class Config:
    from_attributesl = True
