from ..schemas import notification as schemas
from ..models import notification as models
from sqlalchemy.orm import Session


def get_notifications(db: Session, user_id: int):
    return (
        db.query(models.Notification)
        .filter(models.Notification.user_id == user_id)
        .all()
    )


def create_notification(db: Session):
    pass
