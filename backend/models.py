from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from .db import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    email = Column(String(255), unique=True, index=True)
    password = Column(String(255))
    about = Column(String(255))
    is_active = Column(Boolean, default=False)


class Blog(Base):
    __tablename__ = "blogs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    sub_title = Column(String(255))
    content = Column(String(255))
    like_count = Column(Integer, default=0)
    comment_count = Column(Integer, default=0)
    image = Column(String(255), default="")
    user_id = Column(Integer, ForeignKey("users.id"))


class Comment(Base):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(String(255))
    user_id = Column(Integer, ForeignKey("users.id"))
    blog_id = Column(Integer, ForeignKey("blogs.id"))


class Like(Base):
    __tablename__ = "likes"
    id = Column(Integer, primary_key=True, index=True)
    blog_id = Column(Integer, ForeignKey("blogs.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
