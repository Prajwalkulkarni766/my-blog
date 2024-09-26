from sqlalchemy.orm import Session
from . import models, schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.User):
    db_user = models.User(
        email=user.email,
        name=user.name,
        password=user.password,
        about=user.about,
        is_active=True,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, user_id: int, user: schemas.User):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user is None:
        return None
    db_user.name = user.name
    db_user.email = user.email
    db_user.password = user.password
    db_user.about = user.about
    db_user.is_active = user.is_active
    db.commit()
    db.refresh(db_user)
    return db_user


def create_blog(db: Session, blog: schemas.Blog):
    db_blog = models.Blog(
        title=blog.title,
        sub_title=blog.sub_title,
        content=blog.content,
        user_id=blog.user_id,
    )
    db.add(db_blog)
    db.commit()
    db.refresh(db_blog)
    return db_blog


def update_blog(db: Session, blog_id: int, blog: schemas.Blog):
    db_blog = db.query(models.Blog).filter(models.Blog.id == blog_id).first()
    if db_blog is None:
        return None
    db_blog.title = blog.title
    db_blog.sub_title = blog.sub_title
    db_blog.content = blog.content
    db_blog.image = blog.image
    db.commit()
    db.refresh(db_blog)
    return db_blog


def delete_blog(db: Session, blog_id: int):
    db_blog = db.query(models.Blog).filter(models.Blog.id == blog_id).first()
    if db_blog is None:
        return None
    db.delete(db_blog)
    db.commit()
    db.refresh(db_blog)
    return {"msg": "Blog deleted successfully"}


def create_comment(db: Session, comment: schemas.Comment):
    db_comment = models.Comment(
        user_id=comment.user_id,
        blog_id=comment.blog_id,
        content=comment.content,
    )

    db_blog = db.query(models.Blog).filter(models.Blog.id == comment.blog_id).first()

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

    db_blog = db.query(models.Blog).filter(models.Blog.id == db_comment.blog_id).first()

    if db_blog:
        db_blog.comment_count -= 1
        db.add(db_blog)

    db.delete(db_comment)
    db.commit()
    return {"msg": "Comment deleted successfully"}


def create_like(db: Session, like: schemas.Like):
    db_like = models.Like(
        user_id=like.user_id,
        blog_id=like.blog_id,
    )

    db_blog = db.query(models.Blog).filter(models.Blog.id == like.blog_id).first()

    if db_blog:
        db_blog.like_count += 1
        db.add(db_like)
        db.commit()
        db.refresh(db_like)
        db.refresh(db_blog)

    return db_like


def remove_like(db: Session, like_id: int):
    db_like = db.query(models.Like).filter(models.Like.id == like_id).first()

    if db_like is None:
        return None

    db_blog = db.query(models.Blog).filter(models.Blog.id == db_like.blog_id).first()

    if db_blog:
        db_blog.like_count -= 1
        db.add(db_blog)

    db.delete(db_like)
    db.commit()
    return {"msg": "Like deleted successfully"}
