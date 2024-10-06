from fastapi import APIRouter, Depends, HTTPException
from ..schemas import user as schemas
from ..models import user as models
from ..configs.db import get_db
from ..controllers.user import (
    update_user,
    get_users,
)
from sqlalchemy.orm import Session
from ..utilities.token import oauth2_scheme

user_router = APIRouter(prefix="/users", tags=["User"])


# get all user
@user_router.get("")
def get_all_users(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    return get_users(db=db, token=token)


# update user
@user_router.patch("", response_model=schemas.BasicUserUpdate)
def update_the_user(
    user: schemas.BasicUserUpdate,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    return update_user(db=db, user=user, token=token)


export = user_router
