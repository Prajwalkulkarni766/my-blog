from ..schemas import readlater as schemas
from ..models import readlater as models
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from ..utilities.token import get_current_user
from sqlalchemy import and_


def get_read_later_from_db(db: Session, token: str, page: int, limit: int):
    decoded_token = get_current_user(token)
    offset = (page - 1) * limit
    return (
        db.query(models.ReadLater)
        .filter(models.ReadLater.user_id == decoded_token["id"])
        .offset(offset)
        .limit(limit)
        .all()
    )


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


def remove_read_later(db: Session, token: str, id: int = None):
    # decoded_token = get_current_user(token)
    # if id is not None:
    #     # deleting specific history
    #     history_entry = (
    #         db.query(models.History)
    #         .filter(
    #             models.History.id == id,
    #             models.History.user_id == decoded_token["id"],
    #         )
    #         .first()
    #     )
    #     if history_entry:
    #         db.delete(history_entry)
    #         db.commit()
    #         return {"msg": "History entry deleted successfully"}
    #     else:
    #         raise HTTPException(
    #             status_code=status.HTTP_404_NOT_FOUND, detail="History entry not found"
    #         )
    # else:
    #     # delete all history entries for the user
    #     db.query(models.History).filter(
    #         models.History.user_id == decoded_token["id"]
    #     ).delete()
    #     db.commit()
    #     return {"msg": "All history entries deleted successfully"}
    pass
