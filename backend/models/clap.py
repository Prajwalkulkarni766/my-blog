from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from ..configs.db import Base


class Clap(Base):
    __tablename__ = "clap"
    id = Column(Integer, primary_key=True, index=True)
    blog_id = Column(Integer, ForeignKey("blog.id"))
    user_id = Column(Integer, ForeignKey("user.id"))
