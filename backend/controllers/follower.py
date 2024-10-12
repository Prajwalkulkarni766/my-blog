from ..schemas import follower as schemas
from ..models import follower as models
from sqlalchemy.orm import Session
from ..utilities.token import get_current_user
from sqlalchemy import and_


def get_follwers_list(db: Session, user_id: int):
    return (
        db.query(models.Follower).filter(models.Follower.followed_id == user_id).all()
    )


def get_followed_list(db: Session, user_id: int):
    return (
        db.query(models.Follower).filter(models.Follower.followed_id == user_id).all()
    )


def follow_someone(db: Session, follow: schemas.Follower, token: str):
    decoded_token = get_current_user(token)
    db_follwer = models.Follower(
        follower_id=decoded_token["id"], followed_id=follow.followed_id
    )
    db.add(db_follwer)
    db.commit()
    db.refresh(db_follwer)
    return db_follwer


def unfollow(db: Session, followed_id: int, token: str):
    decoded_token = get_current_user(token)
    db_follwer = (
        db.query(models.Follower)
        .filter(
            and_(
                models.Follower.followed_id == followed_id,
                models.Follower.follower_id == decoded_token["id"],
            )
        )
        .first()
    )
    db.delete(db_follwer)
    db.commit()
    return {"msg": "Unfollowing writer"}
