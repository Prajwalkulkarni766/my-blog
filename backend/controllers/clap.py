from ..schemas import clap as schemas
from ..models import clap as models
from ..models import blog
from sqlalchemy.orm import Session
from ..utilities.token import get_current_user
from sqlalchemy import and_


def create_clap(db: Session, clap: schemas.ClapCreate, token: str):
    decoded_token = get_current_user(token)
    exisiting_clap = (
        db.query(models.Clap)
        .filter(
            and_(
                models.Clap.blog_id == clap.blog_id,
                models.Clap.user_id == decoded_token["id"],
            )
        )
        .first()
    )

    if exisiting_clap:
        return exisiting_clap

    db_clap = models.Clap(
        user_id=decoded_token["id"],
        blog_id=clap.blog_id,
    )

    db_blog = db.query(blog.Blog).filter(blog.Blog.id == clap.blog_id).first()

    if db_blog:
        db_blog.clap_count += 1
        db.add(db_clap)
        db.commit()
        db.refresh(db_clap)
        db.refresh(db_blog)

    return db_clap


def remove_clap(db: Session, clap_id: int):
    db_clap = db.query(models.Clap).filter(models.Clap.id == clap_id).first()

    if db_clap is None:
        return None

    db_blog = db.query(blog.Blog).filter(blog.Blog.id == db_clap.blog_id).first()

    if db_blog:
        db_blog.clap_count -= 1
        db.add(db_blog)

    db.delete(db_clap)
    db.commit()
    return {"msg": "Clap deleted successfully"}
