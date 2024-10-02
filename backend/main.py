from fastapi import FastAPI, Depends

from .routes.user import user_router
from .routes.history import history_router
from .routes.clap import clap_router
from .routes.comment import comment_router
from .routes.blog import blog_router
from .routes.notification import notification_router
from .routes.follower import follwer_router

from .utilities.token import get_current_user

# it will create database automatically
# models.Base.metadata.create_all(bind=engine)

app = FastAPI()

version_1_prefix = "/api/v1"


@app.get("/", tags=["Default"])
def root_location():
    return {"msg": "Hello from server"}


@app.post("/token")
def root_location():
    return {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNzI3ODkyMTUwfQ.q9BlZTQYTfzeOxAN3mV5rvP2dGfCewqAl8U1wIEnwlk",
        "token_type": "bearer",
    }


# add functionality of notification
# optional : add functionality of generate overview
# get route for blog - by using recommendation model and in that function mention history saving function
# change db name in .env file at last

"""
when user fetch the blog then add this code in get route
db_history = models.History(
        blog_id=blog.id,
        user_id=blog.user_id,
        blog_title=blog.title,
        blog_subtitle=blog.sub_title,
    )
"""

app.include_router(user_router, prefix=version_1_prefix)
app.include_router(blog_router, prefix=version_1_prefix)
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
