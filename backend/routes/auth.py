"""
routes/auth.py

This module defines the authentication routes for the application. It 
includes endpoints for user login and signup, handling user 
authentication and notifications upon registration.
"""


from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from ..configs.db import get_db

# imporing schemas
from ..schemas import user as UserSchema
from ..schemas import notification as NotificationSchema


# importing controllers
from ..controllers import user as UserController
from .notification import send_notification


# setting up route
auth_router = APIRouter(prefix="/auth", tags=["Auth"])


# login user
@auth_router.post("/login")
def login_user(user: UserSchema.UserLogin, db: Session = Depends(get_db)):
  return UserController.login_user(db, user=user)


# signup
@auth_router.post("/signup", response_model=UserSchema.UserBase)
def post_user(
  user: UserSchema.UserCreate,
  background_tasks: BackgroundTasks,
  db: Session = Depends(get_db),
):
  db_user = UserController.get_user_by_email(db, email=user.email)
  if db_user:
    raise HTTPException(status_code=400, detail="Email already registered")

  created_user = UserController.create_user(db=db, user=user)

  notification_data = NotificationSchema.NotificationCreate(
    user_id=created_user.id,
    notification_title="Welcome!",
    notification_body="Welcome to our platform!",
  )

  background_tasks.add_task(send_notification, notification=notification_data)

  return created_user


export = auth_router
