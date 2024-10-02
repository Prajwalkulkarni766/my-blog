from fastapi import APIRouter, Depends
from ..schemas import notification as schemas
from ..models import notification as models
from ..configs.db import get_db
from ..controllers.notification import get_notifications, create_notification
from sqlalchemy.orm import Session

notification_router = APIRouter(prefix=f"/notifications", tags=["Notification"])


# get all notifications
@notification_router.get("/{user_id}")
def fetch_notifications(user_id: int, db: Session = Depends(get_db)):
    return get_notifications(db=db, user_id=user_id)


# add notifications
@notification_router.post("/")
def generate_notifications(db: Session = Depends(get_db)):
    # create_notification(db=db)
    pass


export = notification_router
