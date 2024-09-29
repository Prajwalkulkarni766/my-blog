from ..schemas import history as schemas
from ..models import history as models
from sqlalchemy.orm import Session
from fastapi import HTTPException, status


def get_history_from_db(db: Session, user_id: int):
    return db.query(models.History).filter(models.History.user_id == user_id).all()


def remove_history(db: Session, user_id: int, history_id: int = None):
    if history_id is not None:
        # deleting specific history
        history_entry = (
            db.query(models.History)
            .filter(models.History.id == history_id, models.History.user_id == user_id)
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
        db.query(models.History).filter(models.History.user_id == user_id).delete()
        db.commit()
        return {"msg": "All history entries deleted successfully"}
