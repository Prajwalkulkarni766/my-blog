from fastapi import APIRouter, Depends, File, UploadFile, Form, Query
from typing import Optional
from ..schemas import blog as schemas
from ..configs.db import get_db
from ..controllers.blog import (
    create_blog,
    update_blog,
    delete_blog,
    recommend_blog,
    get_blog,
    follwing_blog,
    trending_blog,
    search_blogs,
)
from sqlalchemy.orm import Session
from typing import List
from ..utilities.token import oauth2_scheme

blog_router = APIRouter(prefix=f"/blogs", tags=["Blog"])


# recommend blog
@blog_router.get("/recommend", response_model=List[schemas.BlogStr])
def get_recommended_blogs(
    page: int = 1, limit: int = 10, db: Session = Depends(get_db)
):
    return recommend_blog(db=db, page=page, limit=limit)


# follwing blog
@blog_router.get("/following", response_model=List[schemas.BlogStr])
def get_following_blogs(
    page: int = 1,
    limit: int = 10,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    return follwing_blog(db=db, page=page, limit=limit, token=token)


@blog_router.get("/trending", response_model=List[schemas.BlogStr])
def get_trending_blogs(
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db),
):
    return trending_blog(db=db, page=page, limit=limit)


# search blog
@blog_router.get("/search", response_model=List[schemas.BlogStr])
def search_blogs_route(
    queryString: str,
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db),
):
    results = search_blogs(db=db, queryString=queryString, page=page, limit=limit)
    return results


# get blog
@blog_router.get("/{blog_id}", response_model=schemas.BlogGet)
def get_requested_blog(
    blog_id: int, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
):
    return get_blog(db=db, blog_id=blog_id, token=token)


# create blog
@blog_router.post("", response_model=schemas.BlogCreate)
def post_blog(
    title: str = Form(...),
    sub_title: str = Form(...),
    content: str = Form(...),
    tags: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    blog_data = schemas.BlogCreate(
        title=title, sub_title=sub_title, content=content, tags=tags
    )
    return create_blog(db=db, blog=blog_data, token=token, image=image)


# update blog
@blog_router.patch("/{blog_id}", response_model=schemas.Blog)
def patch_blog(blog: schemas.BlogUpdate, db: Session = Depends(get_db)):
    return update_blog(db=db, blog_id=blog.id, blog=blog)


# delete blog
@blog_router.delete("/{blog_id}")
def del_blog(blog_id: int, db: Session = Depends(get_db)):
    return delete_blog(db=db, blog_id=blog_id)


export = blog_router
