"""
schemas/clap.py

This module defines the Pydantic models for clap-related operations in the application. 
It includes schemas for creating and managing claps on blog posts.
"""


from pydantic import BaseModel


class ClapBase(BaseModel):
  user_id: int
  blog_id: int


class ClapCreate(BaseModel):
  blog_id: int


class Clap(ClapBase):
  id: int

  class Config:
    from_attributesl = True
