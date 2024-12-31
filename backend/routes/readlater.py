"""
routes/read_later.py

This module defines the routes for managing 'Read Later' functionality in the application. 
It includes endpoints for retrieving, adding, and removing items from the 'Read Later' list.
"""


from fastapi import APIRouter, Depends
from ..configs.db import get_db
from sqlalchemy.orm import Session
from ..utilities.token import oauth2_scheme

# import schema
from ..schemas import readlater as ReadLaterSchemas
from ..controllers import readlater as ReadLaterController

# import controller

read_later_router = APIRouter(prefix="/read_later", tags=["Read Later"])


@read_later_router.get("")
def get_read_later(
  page: int = 1,
  limit: int = 10,
  db: Session = Depends(get_db),
  token: str = Depends(oauth2_scheme),
):
  return ReadLaterController.get_read_later_from_db(db=db, token=token, page=page, limit=limit)


@read_later_router.post("", response_model=ReadLaterSchemas.ReadLater)
def add_read_later(
  read_later: ReadLaterSchemas.ReadLaterCreate,
  token: str = Depends(oauth2_scheme),
  db: Session = Depends(get_db),
):
  return ReadLaterController.add_to_read_later(db=db, read_later=read_later, token=token)


@read_later_router.delete("")
def delete_read_later():
  return ReadLaterController.remove_read_later()


export = read_later_router
