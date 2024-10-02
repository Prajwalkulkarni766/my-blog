from fastapi import APIRouter, Depends
from ..schemas import blog as schemas
from ..configs.db import get_db
from ..controllers.blog import create_blog, update_blog, delete_blog
from sqlalchemy.orm import Session

blog_router = APIRouter(prefix=f"/blogs", tags=["Blog"])


# create blog
@blog_router.post("", response_model=schemas.BlogCreate)
def post_blog(blog: schemas.BlogCreate, db: Session = Depends(get_db)):
    return create_blog(db=db, blog=blog)


# update blog
@blog_router.patch("/{blog_id}", response_model=schemas.Blog)
def patch_blog(blog: schemas.BlogUpdate, db: Session = Depends(get_db)):
    return update_blog(db=db, blog_id=blog.id, blog=blog)


# delete blog
@blog_router.delete("/{blog_id}")
def del_blog(blog_id: int, db: Session = Depends(get_db)):
    return delete_blog(db=db, blog_id=blog_id)


export = blog_router
