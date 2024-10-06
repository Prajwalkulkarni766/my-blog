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


def create_notification(db: Session):
    pass
