from fastapi import APIRouter, Depends
from ..schemas import clap as schemas
from ..configs.db import get_db
from ..controllers.clap import create_clap, remove_clap
from sqlalchemy.orm import Session


clap_router = APIRouter(prefix="/claps", tags=["Claps"])


# add clap
@clap_router.post("")
def add_clap(clap: schemas.ClapCreate, db: Session = Depends(get_db)):
    return create_clap(db=db, clap=clap)


# remove comment
@clap_router.delete("/{clap_id}")
def delete_clap(clap_id: int, db: Session = Depends(get_db)):
    return remove_clap(db=db, clap_id=clap_id)


export = clap_router
