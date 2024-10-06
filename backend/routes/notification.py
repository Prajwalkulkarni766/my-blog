from fastapi import APIRouter, Depends
from ..schemas import notification as schemas
from ..models import notification as models
from ..configs.db import get_db
from ..controllers.notification import get_notifications, create_notification
from sqlalchemy.orm import Session
from ..utilities.token import oauth2_scheme

notification_router = APIRouter(prefix=f"/notifications", tags=["Notification"])


# get all notifications
@notification_router.get("")
def fetch_notifications(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    return get_notifications(db=db, token=token)


# add notifications
@notification_router.post("")
def generate_notifications(db: Session = Depends(get_db)):
    # create_notification(db=db)
    pass


export = notification_router
