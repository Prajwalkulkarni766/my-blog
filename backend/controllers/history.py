from ..schemas import history as schemas
from ..models import history as models
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from ..utilities.token import get_current_user


def get_history_from_db(db: Session, token: str, page: int, limit: int):
    decoded_token = get_current_user(token)
    offset = (page - 1) * limit
    return (
        db.query(models.History)
        .filter(models.History.user_id == decoded_token["id"])
        .offset(offset)
        .limit(limit)
        .all()
    )


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
