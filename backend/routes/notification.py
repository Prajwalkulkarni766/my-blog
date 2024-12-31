"""
routes/notification.py

This module defines the routes for managing notifications in the application. 
It includes endpoints for fetching notifications and triggering background tasks 
to send notifications.
"""


from fastapi import APIRouter, Depends, BackgroundTasks
from ..configs.db import get_db, SessionLocal
from sqlalchemy.orm import Session
from ..utilities.token import oauth2_scheme


# importing schema
from ..schemas import notification as NotificationSchema


# importing controller
from ..controllers import notification as NotificationController


notification_router = APIRouter(prefix="/notifications", tags=["Notification"])


# get all notifications
@notification_router.get("")
def fetch_notifications(
  token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
  return NotificationController.get_notifications(db=db, token=token)


# add notifications
def send_notification(notification: NotificationSchema.NotificationCreate):
  with SessionLocal() as db:
    NotificationController.create_notification(db=db, notification=notification)


# send notification to particular user
@notification_router.post("/trigger_notification")
def trigger_notification(
  notification: NotificationSchema.NotificationCreate,
  background_tasks: BackgroundTasks,
):
  background_tasks.add_task(send_notification, notification=notification)
  return {"message": "Notification task added to background"}


export = notification_router
