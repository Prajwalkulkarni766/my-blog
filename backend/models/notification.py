from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, func
from ..configs.db import Base


class Notification(Base):
    __tablename__ = "notification"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    notification_title = Column(String(25))
    notification_body = Column(String(25))
    created_at = Column(DateTime, default=func.now())
