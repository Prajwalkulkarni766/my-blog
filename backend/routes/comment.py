"""
routes/comment.py

This module defines the routes for handling comments in the application. 
It includes endpoints for fetching, adding, and removing comments associated 
with blog posts.
"""


from fastapi import APIRouter, Depends
from ..configs.db import get_db
from sqlalchemy.orm import Session
from ..utilities.token import oauth2_scheme
from typing import List


# importing schema
from ..schemas import comment as CommentSchema


# importing controller
from ..controllers import comment as CommentController


# setting up route
comment_router = APIRouter(prefix="/comments", tags=["Comment"])


# get all comments
@comment_router.get("/{blog_id}", response_model=List[CommentSchema.CommentResponse])
def fetch_comments(blog_id: int, db: Session = Depends(get_db)):
  return CommentController.get_comments(db=db, blog_id=blog_id)


# add comment
@comment_router.post("", response_model=CommentSchema.CommentResponse)
def add_comment(
  comment: CommentSchema.CommentCreate,
  token: str = Depends(oauth2_scheme),
  db: Session = Depends(get_db),
):
  return CommentController.create_comment(db=db, comment=comment, token=token)


# remove comment
@comment_router.delete("/{comment_id}")
def delete_comment(comment_id: int, db: Session = Depends(get_db)):
  return CommentController.remove_comment(db=db, comment_id=comment_id)


export = comment_router
