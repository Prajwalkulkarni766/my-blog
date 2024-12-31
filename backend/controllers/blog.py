"""
controllers/blog.py

This module contains the business logic for managing blogs, including
functions for retrieving, creating, updating, and deleting blog posts.
It also includes functionality for recommending blogs and tracking user
activity related to blogs.

Dependencies:
- FastAPI
- SQLAlchemy
- NLTK
- scikit-learn
- pandas
- fuzzywuzzy
- transformers
"""


from fastapi import HTTPException, UploadFile, BackgroundTasks
from typing import Optional
from sqlalchemy.orm import Session
from ..utilities.token import get_current_user
from sqlalchemy import and_, select, or_
import os
import shutil
import uuid


# importing schema
from ..schemas import blog as BlogSchema


# import models
from ..models.user import User as UserModel
from ..models.follower import Follower as FollowerModel
from ..models.blog import Blog as BlogModel
from ..models.history import History as HistoryModel


from ..controllers.follower import get_follwers_list
from ..routes.notification import send_notification
from ..schemas import notification as NotificationSchema

# Third-party imports
import numpy as np
import pandas as pd
import re
# from fuzzywuzzy import process
# from transformers import pipeline


# nltk imports
# import nltk
from nltk.corpus import stopwords
# from nltk.tokenize import word_tokenize
# from nltk.stem import WordNetLemmatizer
# from nltk.stem.porter import PorterStemmer


# sklearn imports
# from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity


stop_words = set(stopwords.words("english"))
cv = CountVectorizer(max_features=5000, stop_words="english")


def clean_text(text):
  text = re.sub(r"[^a-zA-Z\s]", "", text)
  text = text.lower()
  return text


def remove_stopwords(text):
  words = text.split()
  filtered_text = [word for word in words if word not in stop_words]
  return " ".join(filtered_text)


def get_blog(db: Session, blog_id: int, token: str):
  decoded_token = get_current_user(token)
  blog = db.query(BlogModel).filter(BlogModel.id == blog_id).first()
  user = db.query(UserModel).filter(UserModel.id == blog.user_id).first()
  following_status = (
    db.query(FollowerModel)
    .filter(
      and_(
        FollowerModel.follower_id == decoded_token["id"],
        FollowerModel.followed_id == blog.user_id,
      )
    )
    .first()
  )

  if following_status:
    following_status = True
  else:
    following_status = False

  if blog is None:
    raise HTTPException(status_code=404, detail="Blog not found")

  try:
    db_add_history = HistoryModel(
      blog_id=blog_id,
      user_id=decoded_token["id"],
    )
    db.add(db_add_history)
    db.commit()
    db.refresh(db_add_history)
  except Exception as e:
    print("Error adding history: ", e)
    db.rollback()
    raise HTTPException(status_code=500, detail="Error adding history") from e

  return {
    "id": blog.id,
    "title": blog.title,
    "sub_title": blog.sub_title,
    "content": blog.content,
    "image": blog.image,
    "clap_count": blog.clap_count,
    "comment_count": blog.comment_count,
    "created_at": blog.created_at,
    "user_id": user.id,
    "user_name": user.name,
    "user_about": user.about,
    "user_follower": 0,
    "is_following": following_status,
    "tags": blog.tags
  }


def get_blogs(db: Session):
  return db.query(BlogModel).all()


def recommend_blog(db: Session, page: int, limit: int, tags: str):
  if not tags:
        # If no tags, return newest blogs
    blogs = get_blogs(db=db)
    return [
        {
            "id": blog.id,
            "title": blog.title,
            "sub_title": blog.sub_title,
            "image": blog.image,
            "clap_count": blog.clap_count,
            "comment_count": blog.comment_count,
            "created_at": blog.created_at,
        }
        for blog in blogs[((page-1)*limit):((page-1)*limit + limit)]
    ]
  
  blogs = get_blogs(db=db)
  blog_df = pd.DataFrame(
    [
      {
        "id": blog.id,
        "title": blog.title,
        "sub_title": blog.sub_title,
        "image": blog.image,
        "tags": blog.tags if blog.tags else "",
        "clap_count": blog.clap_count,
        "comment_count": blog.comment_count,
        "created_at": blog.created_at,
      }
      for blog in blogs
    ]
  )

  # Initialize TF-IDF vectorizer
  tfidf = TfidfVectorizer(stop_words='english')
    
  # Create tag matrix
  tag_matrix = tfidf.fit_transform(blog_df['tags'].fillna(''))
  
  # Transform user tags
  user_tags_vector = tfidf.transform([tags])
  
  # Calculate similarity
  similarities = cosine_similarity(user_tags_vector, tag_matrix)[0]
  
  # Get indices of blogs sorted by similarity
  similar_indices = np.argsort(similarities)[::-1]
  
  # Calculate pagination
  start_idx = (page - 1) * limit
  end_idx = start_idx + limit
  
  # Get recommended blogs
  recommended_blogs = []
  for idx in similar_indices[start_idx:end_idx]:
      if similarities[idx] > 0:
          recommended_blogs.append({
              "id": blog_df.iloc[idx].id,
              "title": blog_df.iloc[idx].title,
              "sub_title": blog_df.iloc[idx].sub_title,
              "image": blog_df.iloc[idx].image,
              "clap_count": blog_df.iloc[idx].clap_count,
              "comment_count": blog_df.iloc[idx].comment_count,
              "created_at": blog_df.iloc[idx].created_at,
          })
  
  return recommended_blogs


def suggest_blog(db: Session, tags: str, page: int, limit: int):
  tag_list = [tag.strip() for tag in tags.split() if tag.strip()]
  if not tag_list:
    return db.query(BlogModel).offset((page - 1) * limit).limit(limit)

  offset = (page - 1) * limit
  filters = [BlogModel.tags.like(f"%{tag}%") for tag in tag_list]
  return db.query(BlogModel).filter(or_(*filters)).offset(offset).limit(limit)


def follwing_blog(db: Session, token: str, page: int, limit: int):
  decoded_token = get_current_user(token)
  offset = (page - 1) * limit

  followed_user_ids = (
    (
      db.execute(
        select(FollowerModel.followed_id).where(
          FollowerModel.follower_id == decoded_token["id"]
        )
      )
    )
    .scalars()
    .all()
  )

  if not followed_user_ids:
    return []

  blogs = (
    (
      db.execute(
        select(BlogModel)
        .where(BlogModel.user_id.in_(followed_user_ids))
        .order_by(BlogModel.created_at.desc())
        .offset(offset)
        .limit(limit)
      )
    )
    .scalars()
    .all()
  )

  return blogs


def trending_blog(db: Session, page: int, limit: int):
  offset = (page - 1) * limit
  return (
    db.query(BlogModel)
    .order_by(BlogModel.clap_count.desc(), BlogModel.created_at.desc())
    .offset(offset)
    .limit(limit)
    .all()
  )


def search_blogs(db: Session, query_string: str, page: int, limit: int):
  offset = (page - 1) * limit
  query = db.query(BlogModel)

  # Apply filters for title and tags
  query = query.filter(
    or_(
      BlogModel.title.ilike(f"%{query_string}%"),
      BlogModel.tags.ilike(f"%{query_string}%"),
    )
  )

  # Apply pagination
  query = query.offset(offset).limit(limit)

  return query.all()


def notify_followers(
    db: Session,
    writer_id: int,
    blog_title: str,
):
    followers = get_follwers_list(db=db, user_id=writer_id)
    
    for follower in followers:
        notification_data = NotificationSchema.NotificationCreate(
            notification_title=f"New Blog Post",
            notification_body=f"New blog '{blog_title}' has been published",
            user_id=follower.follower_id,
        )
        send_notification(notification=notification_data)


def create_blog(
  db: Session, 
  blog: BlogSchema.BlogBase, 
  token: str, 
  image: Optional[UploadFile],
  background_tasks: BackgroundTasks
):
  decoded_token = get_current_user(token)
  writer_id=decoded_token["id"]
  # cleaning the data and creating tags
  cleaned_blog_title = clean_text(blog.title)
  cleaned_blog_sub_title = clean_text(blog.sub_title)
  cleaned_blog_title = remove_stopwords(cleaned_blog_title)
  cleaned_blog_sub_title = remove_stopwords(cleaned_blog_sub_title)

  if image:
    upload_folder = "static/"
    os.makedirs(upload_folder, exist_ok=True)
    random_filename = f"{uuid.uuid4()}_{image.filename}"
    image_path = os.path.join(upload_folder, random_filename)
    with open(image_path, "wb") as buffer:
      shutil.copyfileobj(image.file, buffer)
  else:
    image_path = ""

  db_blog = BlogModel(
    title=blog.title,
    sub_title=blog.sub_title,
    content=blog.content,
    user_id=decoded_token["id"],
    tags=f"{cleaned_blog_title} {cleaned_blog_sub_title} {blog.tags}",
    image=image_path,
  )
  db.add(db_blog)
  db.commit()
  db.refresh(db_blog)

  background_tasks.add_task(
    notify_followers(writer_id=writer_id, db=db, blog_title=blog.title),
    db=db,
    blog_title=blog.title,
  )
  
  return blog


def update_blog(db: Session, blog_id: int, blog: BlogSchema.Blog):
  db_blog = db.query(BlogModel).filter(BlogModel.id == blog_id).first()
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
  db_blog = db.query(BlogModel).filter(BlogModel.id == blog_id).first()
  if db_blog is None:
    return None
  db.delete(db_blog)
  db.commit()
  return {"msg": "Blog deleted successfully"}
