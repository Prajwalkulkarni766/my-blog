from fastapi import FastAPI

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


# add tags column in blog
# get route for blog - by using recommendation model
# work on generate notifications, get notficiation
# work pending on follwers
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
app.include_router(comment_router, prefix=version_1_prefix)
app.include_router(clap_router, prefix=version_1_prefix)
app.include_router(history_router, prefix=version_1_prefix)
