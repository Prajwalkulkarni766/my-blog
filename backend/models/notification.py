"""
models/notification.py

This module defines the Notification model for the application. It represents 
notifications sent to users, containing titles and body messages, along 
with the timestamp of when each notification was created.
"""


from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, func, Text
from ..configs.db import Base


class Notification(Base):
  """
    Represents a notification for a user.

    Attributes:
        id (int): The unique identifier for the notification.
        user_id (int): The ID of the user receiving the notification.
        notification_title (str): The title of the notification.
        notification_body (str): The body content of the notification.
        created_at (datetime): The timestamp when the notification was created.
  """
  __tablename__ = "notification"
  id = Column(Integer, primary_key=True, index=True)
  user_id = Column(Integer, ForeignKey("user.id"))
  notification_title = Column(String(25))
  notification_body = Column(Text)
  created_at = Column(DateTime, default=func.now())
