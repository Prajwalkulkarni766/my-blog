"""
controllers/user.py

This module provides functions for user management, including user creation, 
login, and retrieval of user information. It also handles password hashing 
and verification.

Functions:
- hash_password: Hashes a plain text password.
- verify_password: Verifies a hashed password against a plain text password.
- get_user_by_email: Retrieves a user by their email address.
- get_users: Retrieves the currently authenticated user.
- login_user: Authenticates a user and generates an access token.
- create_user: Creates a new user with hashed password.
- update_user: Updates the information of the currently authenticated user.
"""


from sqlalchemy.orm import Session
from ..schemas import user as schemas
from ..models import user as models
from passlib.context import CryptContext
from ..utilities.token import create_access_token
from fastapi import HTTPException, status
from ..utilities.token import get_current_user

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
  return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
  return pwd_context.verify(plain_password, hashed_password)


def get_user_by_email(db: Session, email: str):
  return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, token: str):
  decoded_token = get_current_user(token)
  return db.query(models.User).filter(models.User.id == decoded_token["id"]).first()


def get_all_users(db: Session):
  return db.query(models.User).all()


def login_user(db: Session, user: schemas.UserLogin):
  try:
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
    return {"access_token": token, "token_type": "bearer"}
  except Exception as e:
    raise HTTPException(status_code=500, detail="Internal Server Error") from e


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


def update_user(db: Session, user: schemas.UserUpdate, token: str):
  decoded_token = get_current_user(token)
  db_user = (
    db.query(models.User).filter(models.User.id == decoded_token["id"]).first()
  )
  if db_user is None:
    return None
  db_user.name = user.name
  db_user.email = user.email
  db_user.about = user.about
  db.commit()
  db.refresh(db_user)
  return db_user
