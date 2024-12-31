"""
schemas/user.py

This module defines the Pydantic models for user management in the application. 
It includes schemas for user creation, updating, login, and representation.
"""


from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class UserBase(BaseModel):
  email: EmailStr
  name: str
  password: str = Field(..., min_length=6)
  about: Optional[str] = Field(default="")
  is_active: bool = Field(default=True)


class UserCreate(UserBase):
  confirm_password: str


class UserUpdate(BaseModel):
  id: int
  email: Optional[EmailStr]
  name: Optional[str]
  about: Optional[str]


class UserLogin(BaseModel):
  email: EmailStr
  password: str


class User(UserBase):
  id: int

  class Config:
    from_attributesl = True
