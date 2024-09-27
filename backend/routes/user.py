from fastapi import APIRouter, Depends, HTTPException
from ..schemas import user as schemas
from ..models import user as models
from ..configs.db import get_db
from sqlalchemy.orm import Session

user_router = APIRouter(prefix="/users", tags=["User"])


# login user
@user_router.post("/login")
def post_user(user: schemas.UserLogin, db: Session = Depends(get_db)):
    return get_user_by_email(db, email=user.email)


# signup
@user_router.post("/signup", response_model=schemas.User)
def post_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user(db=db, user=user)


# update user
@user_router.patch("", response_model=schemas.User)
def update_user(user: schemas.UserUpdate, db: Session = Depends(get_db)):
    return update_user(db=db, user_id=user.id, user=user)


# main functions


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.User):
    db_user = models.User(
        email=user.email,
        name=user.name,
        password=user.password,
        about=user.about,
        is_active=True,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, user_id: int, user: schemas.User):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user is None:
        return None
    db_user.name = user.name
    db_user.email = user.email
    db_user.password = user.password
    db_user.about = user.about
    db_user.is_active = user.is_active
    db.commit()
    db.refresh(db_user)
    return db_user


export = user_router
