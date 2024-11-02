"""
schemas/report.py

This module defines the Pydantic models for generating reports related to user registrations and interactions.
It includes schemas for daily, weekly, and monthly registration statistics, as well as clap and comment counts.
"""


from pydantic import BaseModel
from datetime import date


class MonthlyRegistration(BaseModel):
  label: str
  dataset: int


class DailyRegistration(BaseModel):
  label: str
  dataset: int


class WeeklyRegistration(BaseModel):
  label: str
  dataset: int


class ClapCommentCount(BaseModel):
  date: date
  clap_count: int
  comment_count: int
