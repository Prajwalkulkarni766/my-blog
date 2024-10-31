"""
controllers/notification.py

This module contains the business logic for managing user notifications 
within the application. It provides functions to retrieve and create 
notifications for users.

Functions:
- get_notifications: Retrieves all notifications for a user based on 
  their ID extracted from the provided token.
- create_notification: Creates a new notification for a user.

Dependencies:
- SQLAlchemy for database interactions.
- Utilities for token validation.
"""


from ..schemas import notification as schemas
from ..models import notification as models
from sqlalchemy.orm import Session
from ..utilities.token import get_current_user


def get_notifications(db: Session, token: str):
  decoded_token = get_current_user(token)
  return (
    db.query(models.Notification)
    .filter(models.Notification.user_id == decoded_token["id"])
    .all()
  )


def create_notification(db: Session, notification: schemas.NotificationCreate):
  db_notification = models.Notification(
    user_id=notification.user_id,
    notification_title=notification.notification_title,
    notification_body=notification.notification_body,
  )
  db.add(db_notification)
  db.commit()
  db.refresh(db_notification)
  return 0
