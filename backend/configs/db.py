"""
database.py

This module handles database connections and session management
using SQLAlchemy. It defines the engine, session local, and base
class for declarative models. It also provides a dependency
to retrieve the database session in FastAPI routes.

Dependencies:
- SQLAlchemy
- python-dotenv for environment variable management
"""


from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()
DB_URL = DB_URL = os.getenv("DB_URL")
engine = create_engine(DB_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()
