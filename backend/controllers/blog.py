from fastapi import Depends, HTTPException
from ..models.user import User
from ..models.follower import Follower
from ..schemas import blog as schemas
from ..models import blog as models
from ..models.history import History
from sqlalchemy.orm import Session
from ..utilities.token import get_current_user
from sqlalchemy import and_, select

import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import CountVectorizer
from nltk.stem.porter import PorterStemmer
from sklearn.metrics.pairwise import cosine_similarity
from fuzzywuzzy import process
from transformers import pipeline

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
    blog = db.query(models.Blog).filter(models.Blog.id == blog_id).first()
    user = db.query(User).filter(User.id == blog.user_id).first()
    following_status = (
        db.query(Follower)
        .filter(
            and_(
                Follower.follower_id == decoded_token["id"],
                Follower.followed_id == blog.user_id,
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
        db_add_history = History(
            blog_id=blog_id,
            user_id=decoded_token["id"],
        )
        db.add(db_add_history)
        db.commit()
        db.refresh(db_add_history)
    except Exception as e:
        print("Error adding history: ", e)
        db.rollback()
        raise HTTPException(status_code=500, detail="Error adding history")

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
    }


def get_blogs(db: Session):
    return db.query(models.Blog).all()


def recommend_blog(db: Session, page: int, limit: int, tags="programming"):
    # todo: remove tags from parameter and retrive tags based on user history
    blogs = get_blogs(db=db)
    blog_df = pd.DataFrame(
        [
            {
                "id": blog.id,
                "title": blog.title,
                "sub_title": blog.sub_title,
                "tags": blog.tags,
                "clap_count": blog.clap_count,
                "comment_count": blog.comment_count,
                "created_at": blog.created_at,
            }
            for blog in blogs
        ]
    )

    # Check if there are any blogs with the specified tags
    matching_blogs = blog_df[blog_df["tags"] == tags]

    if matching_blogs.empty:
        return []  # Return an empty list if no matching blogs are found

    vectors = cv.fit_transform(blog_df["tags"]).toarray()
    similarity = cosine_similarity(vectors)

    blog_index = matching_blogs.index[0]
    distances = similarity[blog_index]
    blog_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])

    start_idx = (page - 1) * limit
    end_idx = start_idx + limit

    recommended_blogs = []

    for i in blog_list[start_idx:end_idx]:
        blog_idx = i[0]
        recommended_blogs.append(
            {
                "id": blog_df.iloc[blog_idx].id,
                "title": blog_df.iloc[blog_idx].title,
                "sub_title": blog_df.iloc[blog_idx].sub_title,
                "clap_count": blog_df.iloc[blog_idx].clap_count,
                "comment_count": blog_df.iloc[blog_idx].comment_count,
                "created_at": blog_df.iloc[blog_idx].created_at,
            }
        )

    return recommended_blogs


def follwing_blog(db: Session, token: str, page: int, limit: int):
    decoded_token = get_current_user(token)
    offset = (page - 1) * limit

    followed_user_ids = (
    db.execute(
        select(Follower.followed_id)
        .where(Follower.follower_id == decoded_token["id"])
    )
    ).scalars().all()
    
    if not followed_user_ids:
        return []
    
    blogs = (
        db.execute(
            select(models.Blog)
            .where(models.Blog.user_id.in_(followed_user_ids))
            .order_by(models.Blog.created_at.desc())
            .offset(offset)
            .limit(limit)
        )
    ).scalars().all()
    
    return blogs
    


def create_blog(db: Session, blog: schemas.BlogBase, token: str):
    decoded_token = get_current_user(token)
    # cleaning the data and creating tags
    cleaned_blog_title = clean_text(blog.title)
    cleaned_blog_sub_title = clean_text(blog.sub_title)
    cleaned_blog_title = remove_stopwords(cleaned_blog_title)
    cleaned_blog_sub_title = remove_stopwords(cleaned_blog_sub_title)

    db_blog = models.Blog(
        title=blog.title,
        sub_title=blog.sub_title,
        content=blog.content,
        user_id=decoded_token["id"],
        tags=cleaned_blog_title + " " + cleaned_blog_sub_title + " " + blog.tags,
    )
    db.add(db_blog)
    db.commit()
    db.refresh(db_blog)
    return blog


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
