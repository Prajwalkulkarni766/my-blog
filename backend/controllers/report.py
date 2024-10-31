"""
controllers/report.py

This module provides functions for generating user registration statistics 
and activity reports, including daily, weekly, and monthly metrics 
based on user claps, comments, and registrations.

Functions:
- get_last_5_days: Returns a list of the last 5 days.
- get_clap_comment_count_last_5_days: Retrieves the count of claps 
  and comments for the last 5 days.
- daily_registrations: Returns daily registration counts for the last 
  5 days.
- weekly_registrations: Returns weekly registration counts for the 
  last 5 weeks.
- monthly_registrations: Returns monthly registration counts for the 
  last 5 months.
"""


from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from sqlalchemy import func
from dateutil.relativedelta import relativedelta
from calendar import month_name
from ..models.clap import Clap as ClapModel
from ..models.comment import Comment as CommentModel
from ..models.user import User as UserModel
from ..models.blog import Blog as BlogModel


def get_last_5_days():
  today = datetime.today().date()
  return [(today - timedelta(days=i)) for i in range(4, -1, -1)]


def get_clap_comment_count_last_5_days(db: Session):
  last_5_days = get_last_5_days()  # Use list directly

  # Query for claps in the last 5 days
  clap_counts = (
    db.query(
      func.date(ClapModel.Clap.created_at).label("activity_date"),
      func.count(ClapModel.Clap.id).label("clap_count"),
    )
    .filter(func.date(ClapModel.Clap.created_at) >= last_5_days[-1])
    .group_by(func.date(ClapModel.Clap.created_at))
    .all()
  )

  # Query for comments in the last 5 days
  comment_counts = (
    db.query(
      func.date(CommentModel.Comment.created_at).label("activity_date"),
      func.count(CommentModel.Comment.id).label("comment_count"),
    )
    .filter(func.date(CommentModel.Comment.created_at) >= last_5_days[-1])
    .group_by(func.date(CommentModel.Comment.created_at))
    .all()
  )

  # Convert results to dictionaries keyed by date
  clap_dict = {record.activity_date: record.clap_count for record in clap_counts}
  comment_dict = {
    record.activity_date: record.comment_count for record in comment_counts
  }

  # Prepare the final result with default 0s for missing dates
  result = []
  for date in last_5_days:
    result.append(
      {
        "date": date,
        "clap_count": clap_dict.get(date, 0),
        "comment_count": comment_dict.get(date, 0),
      }
    )

  return result


def daily_registrations(db: Session):
  current_date = datetime.now().date()

  # Create list of last 5 days (including today)
  days_list = []
  for i in range(4, -1, -1):  # 4,3,2,1,0 to get last 5 days
    date = current_date - timedelta(days=i)
    days_list.append(
      {"date": date.strftime("%Y-%m-%d"), "new_users": 0}  # default value
    )

  # Get actual registration data
  result = (
    db.query(
      func.date(UserModel.User.created_at).label("date"),
      func.count(UserModel.User.id).label("new_users"),
    )
    .filter(
      func.date(UserModel.User.created_at) >= (current_date - timedelta(days=4))
    )
    .group_by(func.date(UserModel.User.created_at))
    .order_by("date")
    .all()
  )

  # Update days_list with actual data where available
  for row in result:
    for day_data in days_list:
      if day_data["date"] == row[0].strftime("%Y-%m-%d"):
        day_data["new_users"] = row[1]

  return days_list


def weekly_registrations(db: Session):
  current_date = datetime.now().date()

  # Create list of last 5 weeks (including current week)
  weeks_list = []
  for i in range(4, -1, -1):  # 4,3,2,1,0 to get last 5 weeks
    date = current_date - timedelta(weeks=i)
    iso_calendar = date.isocalendar()
    weeks_list.append(
      {
        "year": iso_calendar.year,
        "week": iso_calendar.week,
        "new_users": 0,  # default value
      }
    )

  # Get actual registration data grouped by year and week
  result = (
    db.query(
      func.extract("year", UserModel.User.created_at).label("year"),
      func.extract("week", UserModel.User.created_at).label("week"),
      func.count(UserModel.User.id).label("new_users"),
    )
    .filter(UserModel.User.created_at >= (current_date - timedelta(weeks=4)))
    .group_by(
      func.extract("year", UserModel.User.created_at),
      func.extract("week", UserModel.User.created_at),
    )
    .order_by("year", "week")
    .all()
  )

  # Update weeks_list with actual data where available
  for row in result:
    for week_data in weeks_list:
      if week_data["year"] == row[0] and week_data["week"] == row[1]:
        week_data["new_users"] = row[2]

  return weeks_list


def monthly_registrations(db: Session):
  current_date = datetime.now()

  # Create a list of last 5 months (including current)
  months_list = []
  for i in range(4, -1, -1):
    date = current_date - relativedelta(months=i)
    months_list.append(
      {
        "year": date.year,
        "month": date.month,
        "month_name": month_name[date.month],
        "new_users": 0,
      }
    )

  # Get actual registration data
  result = (
    db.query(
      func.year(UserModel.User.created_at).label("year"),
      func.month(UserModel.User.created_at).label("month"),
      func.count(UserModel.User.id).label("new_users"),
    )
    .filter(UserModel.User.created_at >= (current_date - relativedelta(months=4)))
    .group_by(
      func.year(UserModel.User.created_at), func.month(UserModel.User.created_at)
    )
    .order_by("year", "month")
    .all()
  )

  # Update months_list with actual data where available
  for row in result:
    for month_data in months_list:
      if month_data["year"] == row[0] and month_data["month"] == row[1]:
        month_data["new_users"] = row[2]

  return months_list


def get_top_blogs(db: Session):

  days_ago_30 = datetime.now() - timedelta(days=30)

  top_blogs = (
      db.query(
          BlogModel.id,
          BlogModel.title,
          BlogModel.image,
          BlogModel.sub_title,
          BlogModel.created_at,
          BlogModel.clap_count,
          BlogModel.comment_count,
      )
      .filter(BlogModel.created_at >= days_ago_30)
      .order_by(BlogModel.clap_count.desc(), BlogModel.comment_count.desc())
      .limit(10)
      .all()
  )

  engagement_data = [
      {
          "id": blog.id,
          "title": blog.title,
          "image": blog.image,
          "sub_title": blog.sub_title,
          "created_at": blog.created_at,
          "view_count": 0,
          "clap_count": blog.clap_count,
          "comment_count": blog.comment_count,
      }
      for blog in top_blogs
  ]

  return engagement_data