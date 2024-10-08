from fastapi import APIRouter, Depends
from ..schemas import readlater as schemas
from ..configs.db import get_db
from ..controllers.readlater import (
    get_read_later_from_db,
    remove_read_later,
    add_to_read_later,
)
from sqlalchemy.orm import Session
from ..utilities.token import oauth2_scheme
from typing import List


read_later_router = APIRouter(prefix=f"/read_later", tags=["Read Later"])


@read_later_router.get("", response_model=List[schemas.ReadLater])
def get_read_later(
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme),
):
    return get_read_later_from_db(db=db, token=token, page=page, limit=limit)


@read_later_router.post("", response_model=schemas.ReadLater)
def add_read_later(
    read_later: schemas.ReadLaterCreate,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    return add_to_read_later(db=db, read_later=read_later, token=token)


@read_later_router.delete("")
def delete_read_later(
    id: int = None,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme),
):
    return remove_read_later(db=db, id=id, token=token)


export = read_later_router
