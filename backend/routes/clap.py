from fastapi import APIRouter, Depends, HTTPException
from ..schemas import clap as schemas
from ..models import clap as models
from ..models import blog
from ..configs.db import get_db
from sqlalchemy.orm import Session



clap_router = APIRouter(prefix="/claps", tags=["Claps"])


# add clap
@clap_router.post("")
def add_clap(clap: schemas.ClapCreate, db: Session = Depends(get_db)):
    return create_clap(db=db, clap=clap)


# remove comment
@clap_router.delete("/{clap_id}")
def remove_clap(clap_id: int, db: Session = Depends(get_db)):
    return remove_clap(db=db, clap_id=clap_id)



def create_clap(db: Session, clap: schemas.Clap):
    db_clap = models.Clap(
        user_id=clap.user_id,
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


export = clap_router