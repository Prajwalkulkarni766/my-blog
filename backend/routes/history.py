from fastapi import APIRouter, Depends, HTTPException
from ..schemas import history as schemas
from ..models import history as models
from ..configs.db import get_db
from ..controllers.history import get_history_from_db, remove_history
from sqlalchemy.orm import Session
from ..utilities.token import oauth2_scheme
from typing import List


history_router = APIRouter(prefix=f"/history", tags=["History"])


@history_router.get("", response_model=List[schemas.HistoryGet])
def get_history(
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme),
):
    return get_history_from_db(db=db, token=token, page=page, limit=limit)


@history_router.delete("")
def delete_history(
    id: int = None,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme),
):
    return remove_history(db=db, id=id, token=token)


export = history_router
