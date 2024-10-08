from fastapi import APIRouter, Depends, HTTPException
from ..schemas import comment as schemas
from ..models import comment as models
from ..models import blog
from ..configs.db import get_db
from ..controllers.comment import create_comment, remove_comment, get_comments
from sqlalchemy.orm import Session
from ..utilities.token import oauth2_scheme
from typing import List

comment_router = APIRouter(prefix=f"/comments", tags=["Comment"])


# get all comments
@comment_router.get("/{blog_id}", response_model=List[schemas.CommentResponse])
def fetch_comments(blog_id: int, db: Session = Depends(get_db)):
    return get_comments(db=db, blog_id=blog_id)


# add comment
@comment_router.post("", response_model=schemas.CommentResponse)
def add_comment(
    comment: schemas.CommentCreate,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    return create_comment(db=db, comment=comment, token=token)


# remove comment
@comment_router.delete("/{comment_id}")
def delete_comment(comment_id: int, db: Session = Depends(get_db)):
    return remove_comment(db=db, comment_id=comment_id)


export = comment_router
