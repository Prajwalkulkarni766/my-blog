"""
routes/blog.py

This module defines the blog-related routes for the application. It 
includes endpoints for recommending, following, trending, searching, 
creating, updating, and deleting blog posts.
"""


from fastapi import APIRouter, Depends, File, UploadFile, Form, BackgroundTasks, Query
from typing import Optional
from sqlalchemy.orm import Session
from typing import List
from ..utilities.token import oauth2_scheme
from ..configs.db import get_db


# importing schema
from ..schemas import blog as schemas


# importing controller
from ..controllers import blog as BlogController
from ..controllers import history as HistoryController


# setting up route
blog_router = APIRouter(prefix="/blogs", tags=["Blog"])


# recommend blog
@blog_router.get("/recommend", response_model=List[schemas.BlogStr])
def get_recommended_blogs(
  page: int = 1, 
  limit: int = 10, 
  token: str = Depends(oauth2_scheme),
  db: Session = Depends(get_db)
):
  tags = HistoryController.get_history_tags(db=db, token=token)
  print(tags)
  return BlogController.recommend_blog(db=db, page=page, limit=limit, tags=tags)


# suggest blog
@blog_router.get("/suggest", response_model=List[schemas.BlogStr])
def get_recommended_blogs(
  page: int = 1, 
  limit: int = 4, 
  tags: str = Query(...), 
  db: Session = Depends(get_db)
):
  return BlogController.suggest_blog(db=db, tags=tags, page=page, limit=limit)


# follwing blog
@blog_router.get("/following", response_model=List[schemas.BlogStr])
def get_following_blogs(
  page: int = 1,
  limit: int = 10,
  token: str = Depends(oauth2_scheme),
  db: Session = Depends(get_db),
):
  return BlogController.follwing_blog(db=db, page=page, limit=limit, token=token)


@blog_router.get("/trending", response_model=List[schemas.BlogStr])
def get_trending_blogs(
  page: int = 1,
  limit: int = 10,
  db: Session = Depends(get_db),
):
  return BlogController.trending_blog(db=db, page=page, limit=limit)


# search blog
@blog_router.get("/search", response_model=List[schemas.BlogStr])
def search_blogs_route(
  queryString: str,
  page: int = 1,
  limit: int = 10,
  db: Session = Depends(get_db),
):
  results = BlogController.search_blogs(
    db=db, query_string=queryString, page=page, limit=limit
  )
  return results


# get blog
@blog_router.get("/{blog_id}", response_model=schemas.BlogGet)
def get_requested_blog(
  blog_id: int, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
):
  return BlogController.get_blog(db=db, blog_id=blog_id, token=token)


# create blog
@blog_router.post("", response_model=schemas.BlogCreate)
def post_blog(
  background_tasks: BackgroundTasks,
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
  return BlogController.create_blog(
    db=db, 
    blog=blog_data, 
    token=token, 
    image=image, 
    background_tasks=background_tasks
  )


# update blog
@blog_router.patch("/{blog_id}", response_model=schemas.Blog)
def patch_blog(blog: schemas.BlogUpdate, db: Session = Depends(get_db)):
  return BlogController.update_blog(db=db, blog_id=blog.id, blog=blog)


# delete blog
@blog_router.delete("/{blog_id}")
def del_blog(blog_id: int, db: Session = Depends(get_db)):
  return BlogController.delete_blog(db=db, blog_id=blog_id)


export = blog_router
