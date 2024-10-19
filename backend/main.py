from fastapi import FastAPI, Depends
from redis import Redis
from rq import Queue
import random
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
redis_conn = Redis(host="localhost", port=6379)
task_queue = Queue("task_queue", connection=redis_conn)


def print_number():
    print(random.randint())


@app.get("/", tags=["Default"])
def root_location():
    return {"msg": "Hello from server"}


@app.post("/token", tags=["Default"])
def root_location():
    token = create_access_token({"id": 1})
    return {"access_token": token, "token_type": "bearer"}


@app.post("/enqueue_task")
def enqueue_task():
    task_queue.enqueue(print_number)

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
