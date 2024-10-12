from sqlalchemy import Column, ForeignKey, Integer, DateTime, func
from ..configs.db import Base
from sqlalchemy.orm import relationship


class Clap(Base):
    __tablename__ = "clap"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    blog_id = Column(Integer, ForeignKey("blog.id"), nullable=False)
    created_at = Column(DateTime, default=func.now())

    user = relationship("User")
    blog = relationship("Blog")
