from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from ..configs.db import Base


class Blog(Base):
    __tablename__ = "blog"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    sub_title = Column(String(255))
    content = Column(String(255))
    clap_count = Column(Integer, default=0)
    comment_count = Column(Integer, default=0)
    image = Column(String(255), default="")
    user_id = Column(Integer, ForeignKey("user.id"))
