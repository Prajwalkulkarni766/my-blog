from pydantic import BaseModel


class NotificationBase(BaseModel):
    user_id: int
    notification_title: str
    notification_body: str


class NotificationCreate(NotificationBase):
    pass


class Notification(NotificationBase):
    id: int

    class Config:
        from_attributesl = True
