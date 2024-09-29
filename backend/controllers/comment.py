from ..schemas import comment as schemas
from ..models import comment as models
from ..models import blog
from sqlalchemy.orm import Session


def get_comments(db: Session, blog_id):
    return db.query(models.Comment).filter(blog.Blog.id == blog_id).first()


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
