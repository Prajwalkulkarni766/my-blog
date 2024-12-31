"""
controllers/readlater.py

This module handles the logic for managing 'read later' functionality 
within the application. It provides functions to retrieve, add, and 
remove blog posts that users wish to read later.

Functions:
- get_read_later_from_db: Retrieves a paginated list of blogs 
  saved for later reading by the user.
- add_to_read_later: Adds a blog post to the user's 'read later' list 
  if it isn't already present.
- remove_read_later: Placeholder for a function to remove a blog post 
  from the 'read later' list (implementation pending).

Dependencies:
- SQLAlchemy for database interactions.
- Utilities for token validation.
"""


from ..schemas import readlater as schemas
from ..models import readlater as models
from sqlalchemy.orm import Session
from ..utilities.token import get_current_user
from sqlalchemy import and_


def get_read_later_from_db(db: Session, token: str, page: int, limit: int):
  decoded_token = get_current_user(token)
  offset = (page - 1) * limit

  read_laters = (
    db.query(models.ReadLater)
    .join(models.Blog)  # Join with Blog to fetch required fields
    .filter(models.ReadLater.user_id == decoded_token["id"])
    .offset(offset)
    .limit(limit)
    .with_entities(
      models.ReadLater.id.label("read_later_id"),
      models.Blog.id.label("blog_id"),
      models.Blog.title,
      models.Blog.sub_title,
      models.Blog.clap_count,
      models.Blog.comment_count,
      models.Blog.created_at,
    )
    .all()
  )

  # Convert the result to a list of dictionaries
  result = [
    {
      "id": read_later.blog_id,
      "read_later_id": read_later.read_later_id,
      "title": read_later.title,
      "sub_title": read_later.sub_title,
      "clap_count": read_later.clap_count,
      "comment_count": read_later.comment_count,
      "created_at": read_later.created_at,
    }
    for read_later in read_laters
  ]

  return result


def add_to_read_later(db: Session, read_later: schemas.ReadLaterCreate, token: str):
  decoded_token = get_current_user(token)
  existing_read_later = (
    db.query(models.ReadLater)
    .filter(
      and_(
        models.ReadLater.blog_id == read_later.blog_id,
        models.ReadLater.user_id == decoded_token["id"],
      )
    )
    .first()
  )

  if existing_read_later:
    return existing_read_later

  db_read_later = models.ReadLater(
    user_id=decoded_token["id"], blog_id=read_later.blog_id
  )
  db.add(db_read_later)
  db.commit()
  db.refresh(db_read_later)
  return db_read_later


def remove_read_later():
  # decoded_token = get_current_user(token)
  # if id is not None:
  #   # deleting specific history
  #   history_entry = (
  #     db.query(models.History)
  #     .filter(
  #       models.History.id == id,
  #       models.History.user_id == decoded_token["id"],
  #     )
  #     .first()
  #   )
  #   if history_entry:
  #     db.delete(history_entry)
  #     db.commit()
  #     return {"msg": "History entry deleted successfully"}
  #   else:
  #     raise HTTPException(
  #       status_code=status.HTTP_404_NOT_FOUND, detail="History entry not found"
  #     )
  # else:
  #   # delete all history entries for the user
  #   db.query(models.History).filter(
  #     models.History.user_id == decoded_token["id"]
  #   ).delete()
  #   db.commit()
  #   return {"msg": "All history entries deleted successfully"}
  pass
