from fastapi import APIRouter, Depends
from ..schemas import clap as schemas
from ..configs.db import get_db
from ..controllers.clap import create_clap, remove_clap
from sqlalchemy.orm import Session
from ..utilities.token import oauth2_scheme


clap_router = APIRouter(prefix="/claps", tags=["Claps"])


# add clap
@clap_router.post("", response_model=schemas.Clap)
def add_clap(
    clap: schemas.ClapCreate,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    return create_clap(db=db, clap=clap, token=token)


# remove comment
@clap_router.delete("/{clap_id}")
def delete_clap(
    clap_id: int, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    return remove_clap(db=db, clap_id=clap_id)


export = clap_router
