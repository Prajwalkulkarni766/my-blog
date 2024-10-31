"""
controllers/history.py

This module contains the business logic for managing user history within
the application. It provides functions to retrieve and delete history entries,
allowing users to manage their interactions with blog posts.

Functions:
- get_history_from_db: Retrieves paginated history entries for a user,
  including the titles and subtitles of the associated blog posts.
- remove_history: Deletes a specific history entry or all history entries
  for a user.

Dependencies:
- SQLAlchemy for database interactions
- FastAPI for HTTP exceptions
- Utilities for token validation
"""

from ..models import history as models
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from ..utilities.token import get_current_user


def get_history_from_db(db: Session, token: str, page: int, limit: int):
  decoded_token = get_current_user(token)
  offset = (page - 1) * limit

  histories = (
    db.query(models.History)
    .join(models.Blog)  # Join with Blog to fetch titles and subtitles
    .filter(models.History.user_id == decoded_token["id"])
    .offset(offset)
    .limit(limit)
    .with_entities(
      models.History.id,
      models.Blog.title.label("blog_title"),
      models.Blog.sub_title.label("blog_subtitle"),
      models.History.user_id,
      models.History.created_at,
    )
    .all()
  )

  result = [
    {
      "id": history.id,
      "blog_title": history.blog_title,
      "blog_subtitle": history.blog_subtitle,
      "user_id": history.user_id,
      "created_at": history.created_at,
    }
    for history in histories
  ]

  return result


def remove_history(db: Session, token: str, id: int = None):
  decoded_token = get_current_user(token)
  if id is not None:
    # deleting specific history
    history_entry = (
      db.query(models.History)
      .filter(
        models.History.id == id,
        models.History.user_id == decoded_token["id"],
      )
      .first()
    )
    if history_entry:
      db.delete(history_entry)
      db.commit()
      return {"msg": "History entry deleted successfully"}
    else:
      raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail="History entry not found"
      )
  else:
    # delete all history entries for the user
    db.query(models.History).filter(
      models.History.user_id == decoded_token["id"]
    ).delete()
    db.commit()
    return {"msg": "All history entries deleted successfully"}
