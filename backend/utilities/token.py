import jwt
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from jwt import PyJWTError
from datetime import datetime, timedelta, timezone
import os

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


SECRET_KEY = os.getenv("SECRET_KEY")
HASHING_ALGORITHM = os.getenv("HASHING_ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")


# OAuth2 password bearer token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


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


def verify_token(token: str):
    try:
        print("token : ", token)
        payload = jwt.decode(token, SECRET_KEY, algorithms=[HASHING_ALGORITHM])
        print(payload)
        return payload
    except PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


def get_current_user(token: str = Depends(oauth2_scheme)):
    return verify_token(token)
