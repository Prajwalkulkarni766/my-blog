"""
routes/follower.py

This module defines the routes for managing followers in the application. 
It includes endpoints for fetching follower and followed lists, 
adding followers, and removing followers.
"""


from fastapi import APIRouter, Depends
from ..configs.db import get_db
from sqlalchemy.orm import Session
from ..utilities.token import oauth2_scheme


# importing schema
from ..schemas import follower as FollowerSchema


# importing controller
from ..controllers import follower as FollowerController


# setting up route
follwer_router = APIRouter(prefix="/followers", tags=["Follower"])


# get all follwer list
@follwer_router.get("/follower/{user_id}")
def fetch_follower(user_id: int, db: Session = Depends(get_db)):
  return FollowerController.get_follwers_list(db=db, user_id=user_id)


# get all follwed list
@follwer_router.get("/followed/{user_id}")
def fetch_followed(user_id: int, db: Session = Depends(get_db)):
  return FollowerController.get_followed_list(db=db, user_id=user_id)


# add follower
@follwer_router.post("", response_model=FollowerSchema.Follower)
def generate_follower(
  follow: FollowerSchema.FollowerBase,
  token: str = Depends(oauth2_scheme),
  db: Session = Depends(get_db),
):
  return FollowerController.follow_someone(db=db, follow=follow, token=token)


# remove follower
@follwer_router.delete("")
def unfollow_someone(
  followed_id: int, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
  return FollowerController.unfollow(db=db, followed_id=followed_id, token=token)


export = follwer_router
