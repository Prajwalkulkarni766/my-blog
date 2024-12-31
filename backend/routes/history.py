"""
routes/history.py

This module defines the routes for managing user history in the application. 
It includes endpoints for retrieving and deleting history entries associated 
with user actions.
"""


from fastapi import APIRouter, Depends
from ..configs.db import get_db
from sqlalchemy.orm import Session
from ..utilities.token import oauth2_scheme
from typing import List

# importing schema
from ..schemas import history as HistorySchema


# importing controller
from ..controllers import history as HistoryController


# setting up route
history_router = APIRouter(prefix="/history", tags=["History"])


@history_router.get("", response_model=List[HistorySchema.HistoryGet])
def get_history(
  page: int = 1,
  limit: int = 10,
  db: Session = Depends(get_db),
  token: str = Depends(oauth2_scheme),
):
  return HistoryController.get_history_from_db(db=db, token=token, page=page, limit=limit)


@history_router.delete("")
def delete_history(
  id: int = None,
  db: Session = Depends(get_db),
  token: str = Depends(oauth2_scheme),
):
  return HistoryController.remove_history(db=db, id=id, token=token)


export = history_router
