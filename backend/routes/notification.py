from fastapi import APIRouter, Depends, BackgroundTasks
from ..schemas import notification as schemas
from ..models import notification as models
from ..configs.db import get_db
from ..controllers.notification import get_notifications, create_notification
from sqlalchemy.orm import Session
from ..utilities.token import oauth2_scheme
from ..configs.db import SessionLocal

notification_router = APIRouter(prefix=f"/notifications", tags=["Notification"])


# get all notifications
@notification_router.get("")
def fetch_notifications(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    return get_notifications(db=db, token=token)


# add notifications
def send_notification(notification: schemas.NotificationCreate):
    with SessionLocal() as db:
        create_notification(db=db, notification=notification)


@notification_router.post("/trigger_notification")
def trigger_notification(
    notification: schemas.NotificationCreate, background_tasks: BackgroundTasks
):
    background_tasks.add_task(send_notification, notification=notification)
    return {"message": "Notification task added to background"}


export = notification_router
