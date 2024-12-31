"""
routes/clap.py

This module defines the routes for handling claps in the application. 
It includes endpoints for adding and removing claps associated with 
blog posts or other content.
"""


from fastapi import APIRouter, Depends
from ..configs.db import get_db
from sqlalchemy.orm import Session
from ..utilities.token import oauth2_scheme


# importing schema
from ..schemas import clap as schemas


# importing controller
from ..controllers import clap as ClapController


# setting up route
clap_router = APIRouter(prefix="/claps", tags=["Claps"])


# add clap
@clap_router.post("", response_model=schemas.ClapBase)
def add_clap(
  clap: schemas.ClapCreate,
  token: str = Depends(oauth2_scheme),
  db: Session = Depends(get_db),
):
  return ClapController.create_clap(db=db, clap=clap, token=token)


# remove comment
@clap_router.delete("/{clap_id}")
def delete_clap(
  clap_id: int, db: Session = Depends(get_db)
):
  return ClapController.remove_clap(db=db, clap_id=clap_id)


export = clap_router
