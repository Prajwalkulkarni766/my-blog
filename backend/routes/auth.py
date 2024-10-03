from fastapi import APIRouter, Depends, HTTPException
from ..schemas import user as schemas
from ..models import user as models
from ..configs.db import get_db
from ..controllers.user import (
    login_user,
    get_user_by_email,
    create_user,
    update_user,
    get_users,
)
from sqlalchemy.orm import Session

auth_router = APIRouter(prefix="/auth", tags=["Auth"])


# login user
@auth_router.post("/login")
def post_user(user: schemas.UserLogin, db: Session = Depends(get_db)):
    return login_user(db, user=user)


# signup
@auth_router.post("/signup", response_model=schemas.UserBase)
def post_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user(db=db, user=user)


export = auth_router
