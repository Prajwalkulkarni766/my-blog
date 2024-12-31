"""
routes/user.py

This module defines the routes for managing user-related operations in the application. 
It includes endpoints for retrieving all users and updating user information.
"""


from fastapi import APIRouter, Depends
from ..configs.db import get_db
from sqlalchemy.orm import Session
from ..utilities.token import oauth2_scheme


# importing schema
from ..schemas import user as schemas


# importing controller
from ..controllers import user as UserController


# setting up route
user_router = APIRouter(prefix="/users", tags=["User"])


# get all user
@user_router.get("")
def get_all_users(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
  return UserController.get_users(db=db, token=token)


# update user
@user_router.patch("", response_model=schemas.UserUpdate)
def update_the_user(
  user: schemas.UserUpdate,
  token: str = Depends(oauth2_scheme),
  db: Session = Depends(get_db),
):
  return UserController.update_user(db=db, user=user, token=token)


export = user_router
