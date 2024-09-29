from sqlalchemy.orm import Session
from ..schemas import user as schemas
from ..models import user as models
from passlib.context import CryptContext
import jwt
import os
from datetime import datetime, timezone, timedelta
from fastapi import HTTPException, status


SECRET_KEY = os.getenv("SECRET_KEY")
HASHING_ALGORITHM = os.getenv("HASHING_ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES)
        )
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=HASHING_ALGORITHM)
    return encoded_jwt


def get_user_by_email(db: Session, email: str):
    user = db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def login_user(db: Session, user: schemas.UserLogin):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()

    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )

    if not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )

    token = create_access_token({"id": db_user.id, "name": db_user.name})

    return {"authToken": token}


def create_user(db: Session, user: schemas.User):
    hashed_password = hash_password(user.password)

    db_user = models.User(
        email=user.email,
        name=user.name,
        password=hashed_password,
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
