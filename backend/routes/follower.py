from fastapi import APIRouter, Depends
from ..schemas import follower as schemas
from ..models import follower as models
from ..configs.db import get_db
from ..controllers.follower import (
    get_followed_list,
    get_follwers_list,
    follow_someone,
    unfollow,
)
from sqlalchemy.orm import Session
from ..utilities.token import oauth2_scheme

follwer_router = APIRouter(prefix=f"/followers", tags=["Follower"])


# get all follwer list
@follwer_router.get("/follower/{user_id}")
def fetch_follower(user_id: int, db: Session = Depends(get_db)):
    return get_follwers_list(db=db, user_id=user_id)


# get all follwed list
@follwer_router.get("/followed/{user_id}")
def fetch_followed(user_id: int, db: Session = Depends(get_db)):
    return get_followed_list(db=db, user_id=user_id)


# add follower
@follwer_router.post("", response_model=schemas.Follower)
def generate_follower(
    follow: schemas.FollowerBase,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    return follow_someone(db=db, follow=follow, token=token)


# remove follower
@follwer_router.delete("")
def unfollow_someone(followed_id: int, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    return unfollow(db=db, followed_id=followed_id, token=token)


export = follwer_router
