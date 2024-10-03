from fastapi import APIRouter, Depends, HTTPException
from ..schemas import user as schemas
from ..models import user as models
from ..configs.db import get_db
from ..controllers.user import (
    update_user,
    get_users,
)
from sqlalchemy.orm import Session

user_router = APIRouter(prefix="/users", tags=["User"])


# get all user
@user_router.get("/")
def get_all_users(db: Session = Depends(get_db)):
    return get_users(db=db)


# update user
@user_router.patch("", response_model=schemas.User)
def update_user(user: schemas.UserUpdate, db: Session = Depends(get_db)):
    return update_user(db=db, user_id=user.id, user=user)


export = user_router
