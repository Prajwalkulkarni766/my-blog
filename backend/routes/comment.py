from fastapi import APIRouter, Depends, HTTPException
from ..schemas import comment as schemas
from ..models import comment as models
from ..models import blog
from ..configs.db import get_db
from ..controllers.comment import create_comment, remove_comment, get_comments
from sqlalchemy.orm import Session

comment_router = APIRouter(prefix=f"/comments", tags=["Comment"])


# get all comments
@comment_router.get("/{blog_id}")
def fetch_comments(blog_id: int, db: Session = Depends(get_db)):
    return get_comments(db=db, blog_id=blog_id)


# add comment
@comment_router.post("")
def add_comment(comment: schemas.CommentCreate, db: Session = Depends(get_db)):
    return create_comment(db=db, comment=comment)


# remove comment
@comment_router.delete("/{comment_id}")
def delete_comment(comment_id: int, db: Session = Depends(get_db)):
    return remove_comment(db=db, comment_id=comment_id)


export = comment_router
