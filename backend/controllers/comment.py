from ..schemas import comment as schemas
from ..models import comment as models
from ..models import user
from ..models import blog
from sqlalchemy.orm import Session
from ..utilities.token import get_current_user
from typing import List


# def get_comments(db: Session, blog_id):
#     return db.query(models.Comment).filter(blog.Blog.id == blog_id).first()

def get_comments(db: Session, blog_id: int):
    results = (
        db.query(user.User.name, models.Comment.created_at, models.Comment.content)
        .join(models.Comment, user.User.id == models.Comment.user_id)
        .filter(models.Comment.blog_id == blog_id)
        .all()
    )

    print(results)
    comments = [
        schemas.CommentResponse(user_name=user, created_at=created_at, content=content)
        for user, created_at, content in results
    ]
    
    return comments

def create_comment(db: Session, comment: schemas.Comment, token: str):
    decoded_token = get_current_user(token)
    db_comment = models.Comment(
        user_id=decoded_token["id"],
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

        result = {
            "user_name": decoded_token["name"],
            "created_at": db_comment.created_at,
            "content": db_comment.content
        }
        return result
    else:
        return {"msg":"blog not found"}

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
