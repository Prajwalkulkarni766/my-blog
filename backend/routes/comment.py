from fastapi import APIRouter, Depends, HTTPException
from ..schemas import comment as schemas
from ..models import comment as models
from ..models import blog
from ..configs.db import get_db
from sqlalchemy.orm import Session

comment_router = APIRouter(prefix=f"/comments", tags=["Comment"])


# add comment
@comment_router.post("")
def add_comment(comment: schemas.CommentCreate, db: Session = Depends(get_db)):
    return create_comment(db=db, comment=comment)


# remove comment
@comment_router.delete("/{comment_id}")
def delete_comment(comment_id: int, db: Session = Depends(get_db)):
    return remove_comment(db=db, comment_id=comment_id)


def create_comment(db: Session, comment: schemas.Comment):
    db_comment = models.Comment(
        user_id=comment.user_id,
        blog_id=comment.blog_id,
        content=comment.content,
    )

    db_blog = db.query(blog.Blog).filter(blog.Blog.id == comment.blog_id).first()

    if db_blog:
        db_blog.comment_count += 1
        db.add(db_comment)
        db.commit()
        db.refresh(db_comment)
        db.refresh(db_blog)

    return db_comment


def remove_comment(db: Session, comment_id: int):
    db_comment = (
        db.query(models.Comment).filter(models.Comment.id == comment_id).first()
    )

    if db_comment is None:
        return None

    db_blog = db.query(blog.Blog).filter(blog.Blog.id == db_comment.blog_id).first()

    if db_blog:
        db_blog.comment_count -= 1
        db.add(db_blog)

    db.delete(db_comment)
    db.commit()
    return {"msg": "Comment deleted successfully"}


export = comment_router