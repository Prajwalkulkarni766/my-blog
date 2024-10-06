from fastapi import Depends, HTTPException

from ..schemas import blog as schemas
from ..models import blog as models
from ..models.history import History
from sqlalchemy.orm import Session
from ..utilities.token import get_current_user

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

    if blog is None:
        raise HTTPException(status_code=404, detail="Blog not found")

    try:
        db_add_history = History(
            blog_id=blog_id,
            user_id=decoded_token["id"],
            blog_title=blog.title,
            blog_sub_title=blog.sub_title,
            blog_tags=blog.tags,
        )
        db.add(db_add_history)
        db.commit()
        db.refresh(db_add_history)  # Refresh to get updated data
    except Exception as e:
        print("Error adding history: ", e)
        db.rollback()  # Rollback the transaction in case of error
        raise HTTPException(status_code=500, detail="Error adding history")

    return blog


def get_blogs(db: Session):
    return db.query(models.Blog).all()


def recommend_blog(db: Session, page: int, limit: int, tags="python"):
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
    vectors = cv.fit_transform(blog_df["tags"]).toarray()
    similarity = cosine_similarity(vectors)

    blog_index = blog_df[blog_df["tags"] == tags].index[0]
    distances = similarity[blog_index]
    blog_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:]

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
