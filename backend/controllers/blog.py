from ..schemas import blog as schemas
from ..models import blog as models
from sqlalchemy.orm import Session


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
    return {"msg": "Blog deleted successfully"}
