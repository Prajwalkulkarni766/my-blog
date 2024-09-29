from fastapi import APIRouter, Depends, HTTPException
from ..schemas import history as schemas
from ..models import history as models
from ..configs.db import get_db
from ..controllers.history import get_history_from_db, remove_history
from sqlalchemy.orm import Session


history_router = APIRouter(prefix=f"/history", tags=["History"])


@history_router.get("/{user_id}")
def get_history(user_id: int, db: Session = Depends(get_db)):
    return get_history_from_db(db=db, user_id=user_id)


@history_router.delete("/{user_id}")
def delete_history(user_id: int, history_id: int = None, db: Session = Depends(get_db)):
    return remove_history(db=db, history_id=history_id, user_id=user_id)


export = history_router
