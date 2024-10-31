"""
main.py

This module initializes and runs the FastAPI application for the project.
It sets up CORS, static files, and includes the various API routers for
authentication, user management, blogging, notifications, and more.

Dependencies:
- FastAPI
- CORS Middleware
- Static Files

Routes:
- /api/v1/auth
- /api/v1/user
- /api/v1/blog
- /api/v1/comment
- /api/v1/clap
- /api/v1/history
- /api/v1/notification
- /api/v1/follower
- /api/v1/readlater
- /api/v1/report
"""


from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .routes.auth import auth_router
from .routes.user import user_router
from .routes.history import history_router
from .routes.clap import clap_router
from .routes.comment import comment_router
from .routes.blog import blog_router
from .routes.notification import notification_router
from .routes.follower import follwer_router
from .routes.readlater import read_later_router
from .routes.report import report_router

from .utilities.token import get_current_user
from .utilities.token import create_access_token

# it will create database automatically
# models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

version_1_prefix = "/api/v1"


@app.get("/", tags=["Default"])
def root_location():
  return {"msg": "Hello from server"}


@app.post("/token", tags=["Default"])
def token_location():
  token = create_access_token({"id": 1})
  return {"access_token": token, "token_type": "bearer"}


app.mount("/static", StaticFiles(directory="static"), name="static")
app.include_router(auth_router, prefix=version_1_prefix)
app.include_router(
  user_router,
  prefix=version_1_prefix,
  dependencies=[Depends(get_current_user)],
)
app.include_router(
  blog_router,
  prefix=version_1_prefix,
  dependencies=[Depends(get_current_user)],
)
app.include_router(
  comment_router,
  prefix=version_1_prefix,
  dependencies=[Depends(get_current_user)],
)
app.include_router(
  clap_router,
  prefix=version_1_prefix,
  dependencies=[Depends(get_current_user)],
)
app.include_router(
  history_router,
  prefix=version_1_prefix,
  dependencies=[Depends(get_current_user)],
)
app.include_router(
  notification_router,
  prefix=version_1_prefix,
  dependencies=[Depends(get_current_user)],
)
app.include_router(
  follwer_router,
  prefix=version_1_prefix,
  dependencies=[Depends(get_current_user)],
)
app.include_router(
  read_later_router,
  prefix=version_1_prefix,
  dependencies=[Depends(get_current_user)],
)
app.include_router(
  report_router,
  prefix=version_1_prefix,
)
