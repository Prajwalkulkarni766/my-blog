from fastapi import APIRouter, Depends, HTTPException
from ..schemas import history as schemas
from ..models import history as models
from ..configs.db import get_db
from sqlalchemy.orm import Session


history_router = APIRouter(prefix=f"/history", tags=["History"])


@history_router.get("/{user_id}")
def get_history(user_id: int, db: Session = Depends(get_db)):
    return get_history_from_db(db=db, user_id=user_id)


# @history_router.delete("/")
# def delete_history(history_id: int = None, db: Session = Depends(get_db)):
#     return remove_blog_from_history(db=db, history_id=history_id)

"""
when user fetch the blog then add this code in get route
db_history = models.History(
        blog_id=blog.id,
        user_id=blog.user_id,
        blog_title=blog.title,
        blog_subtitle=blog.sub_title,
    )
"""


def get_history_from_db(db: Session, user_id: int):
    return db.query(models.History).filter(models.History.user_id == user_id).all()



# # def remove_blog_from_history(db: Session, history_id: int):

# #     return {"msg": "Clap deleted successfully"}

# def remove_blog_from_history(db: Session, user_id: int, history_id: int = None):
#     if history_id is not None:
#         # Delete a specific history entry
#         history_entry = db.query(models.History).filter(models.History.id == history_id, models.History.user_id == user_id).first()
#         if history_entry:
#             db.delete(history_entry)
#             db.commit()
#             return {"msg": "History entry deleted successfully"}
#         else:
#             return {"error": "History entry not found"}, 404
#     else:
#         # Delete all history entries for the user
#         db.query(models.History).filter(models.History.user_id == user_id).delete()
#         db.commit()
#         return {"msg": "All history entries deleted successfully"}


export = history_router
