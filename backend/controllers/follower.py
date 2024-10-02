from ..schemas import follwer as schemas
from ..models import follwer as models
from sqlalchemy.orm import Session


def get_follwers_list(db: Session, user_id: int):
    return (
        db.query(models.Follower).filter(models.Follower.followed_id == user_id).all()
    )


def get_followed_list(db: Session, user_id: int):
    return (
        db.query(models.Follower).filter(models.Follower.followed_id == user_id).all()
    )


def follow_someone(db: Session, follow: schemas.Follwer):
    db_follwer = models.Follower(
        follower_id=follow.follower_id, followed_id=follow.followed_id
    )
    db.add(db_follwer)
    db.commit()
    db.refresh(db_follwer)
    return db_follwer


def unfollow(db: Session, follow_id: int):
    db_follwer = (
        db.query(models.Follower).filter(models.Follower.id == follow_id).first()
    )
    db.delete(db_follwer)
    db.commit()
    return {"msg": "Comment deleted successfully"}
