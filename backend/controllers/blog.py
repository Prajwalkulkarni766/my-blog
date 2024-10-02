from ..schemas import blog as schemas
from ..models import blog as models
from sqlalchemy.orm import Session

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

# summarizer = pipeline("summarization")


def clean_text(text):
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    text = text.lower()
    return text


def remove_stopwords(text):
    words = text.split()
    filtered_text = [word for word in words if word not in stop_words]
    return " ".join(filtered_text)


def create_blog(db: Session, blog: schemas.Blog):
    # summarizing data
    # summary = summarizer(blog.content, max_length=50, min_length=25, do_sample=False)
    # print("summary", summary[0]['summary_text'], "\n\n\n\n\n")

    # cleaning the data and creating tags
    cleaned_blog_title = clean_text(blog.title)
    cleaned_blog_sub_title = clean_text(blog.sub_title)
    cleaned_blog_title = remove_stopwords(cleaned_blog_title)
    cleaned_blog_sub_title = remove_stopwords(cleaned_blog_sub_title)
    # print(cleaned_blog_sub_title , " and ", cleaned_blog_title)

    db_blog = models.Blog(
        title=blog.title,
        sub_title=blog.sub_title,
        content=blog.content,
        user_id=blog.user_id,
        tags=cleaned_blog_title + " " + cleaned_blog_sub_title,
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
