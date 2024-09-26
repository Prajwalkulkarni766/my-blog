from fastapi import FastAPI, Depends, HTTPException, APIRouter
from . import models, schemas
from .db import SessionLocal, engine
from . import crud
from sqlalchemy.orm import Session

# models.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


version_1_prefix = "/api/v1"


@app.get(version_1_prefix, tags=["Default"])
def root_location():
    return {"msg": "Hello from server"}


user_router = APIRouter(prefix=f"{version_1_prefix}/users", tags=["User"])


# login user
@user_router.post("/login")
def post_user(user: schemas.UserLogin, db: Session = Depends(get_db)):
    return crud.get_user_by_email(db, email=user.email)


# signup
@user_router.post("/signup", response_model=schemas.User)
def post_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


# update user
@user_router.patch("", response_model=schemas.User)
def update_user(user: schemas.UserUpdate, db: Session = Depends(get_db)):
    return crud.update_user(db=db, user_id=user.id, user=user)


blog_router = APIRouter(prefix=f"{version_1_prefix}/blogs", tags=["Blog"])


# create blog
@blog_router.post("", response_model=schemas.Blog)
def post_blog(blog: schemas.BlogCreate, db: Session = Depends(get_db)):
    return crud.create_blog(db=db, blog=blog)


# update blog
@blog_router.patch("/{blog_id}", response_model=schemas.Blog)
def update_blog(blog: schemas.BlogUpdate, db: Session = Depends(get_db)):
    return crud.update_blog(db=db, blog_id=blog.id, blog=blog)


# delete blog
@blog_router.delete("/{blog_id}")
def delete_blog(blog_id: int, db: Session = Depends(get_db)):
    return crud.delete_blog(db=db, blog_id=blog_id)


comment_router = APIRouter(prefix=f"{version_1_prefix}/comments", tags=["Comment"])


# add comment
@comment_router.post("")
def add_comment(comment: schemas.CommentCreate, db: Session = Depends(get_db)):
    return crud.create_comment(db=db, comment=comment)


# remove comment
@comment_router.delete("/{comment_id}")
def remove_comment(comment_id: int, db: Session = Depends(get_db)):
    return crud.remove_comment(db=db, comment_id=comment_id)


like_router = APIRouter(prefix=f"{version_1_prefix}/likes", tags=["Likes"])


# add like
@like_router.post("")
def add_like(like: schemas.LikeCreate, db: Session = Depends(get_db)):
    return crud.create_like(db=db, like=like)


# remove comment
@like_router.delete("/{like_id}")
def remove_like(like_id: int, db: Session = Depends(get_db)):
    return crud.remove_like(db=db, like_id=like_id)


app.include_router(user_router)
app.include_router(blog_router)
app.include_router(comment_router)
app.include_router(like_router)
