from fastapi import FastAPI, Depends, HTTPException, APIRouter

# from .schemas import user
# from .configs.db import SessionLocal, engine
# from . import crud
# from sqlalchemy.orm import Session

from .routes.user import user_router
from .routes.history import history_router
from .routes.clap import clap_router
from .routes.comment import comment_router
from .routes.blog import blog_router

# it will create database automatically
# models.Base.metadata.create_all(bind=engine)

app = FastAPI()

version_1_prefix = "/api/v1"


@app.get(version_1_prefix, tags=["Default"])
def root_location():
    return {"msg": "Hello from server"}


# hash the password
# when login assign jwt token or store user id in session
# work on history clear route
# work on generate notifications, get notficiation
# pending follwers

app.include_router(user_router, prefix=version_1_prefix)
app.include_router(blog_router, prefix=version_1_prefix)
app.include_router(comment_router, prefix=version_1_prefix)
app.include_router(clap_router, prefix=version_1_prefix)
app.include_router(history_router, prefix=version_1_prefix)
