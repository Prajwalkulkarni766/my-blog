from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, func
from ..configs.db import Base
from sqlalchemy.orm import relationship


class Blog(Base):
    __tablename__ = "blog"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    sub_title = Column(String(255), nullable=False)
    content = Column(String(255), nullable=False)
    clap_count = Column(Integer, default=0)
    comment_count = Column(Integer, default=0)
    image = Column(String(255), default="")
    tags = Column(String(2000), default="")
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

    user = relationship("User")
