from fastapi import APIRouter, Depends
from ..schemas import follwer as schemas
from ..models import follwer as models
from ..configs.db import get_db
from ..controllers.follower import (
    get_followed_list,
    get_follwers_list,
    follow_someone,
    unfollow,
)
from sqlalchemy.orm import Session

follwer_router = APIRouter(prefix=f"/follwers", tags=["Follower"])


# get all follwer list
@follwer_router.get("/follwer/{user_id}")
def fetch_follower(user_id: int, db: Session = Depends(get_db)):
    return get_follwers_list(db=db, user_id=user_id)


# get all follwed list
@follwer_router.get("/follwed/{user_id}")
def fetch_followed(user_id: int, db: Session = Depends(get_db)):
    return get_followed_list(db=db, user_id=user_id)


# add follower
@follwer_router.post("/")
def generate_follower(follow: schemas.FollwerBase, db: Session = Depends(get_db)):
    return follow_someone(db=db, follow=follow)


# remove follower
@follwer_router.delete("/{follow_id}")
def unfollow_someone(follow_id: int, db: Session = Depends(get_db)):
    return unfollow(db=db, follow_id=follow_id)


export = follwer_router
