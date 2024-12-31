"""
routes/report.py

This module defines the routes for generating various reports in the application. 
It includes endpoints for retrieving daily, weekly, and monthly registration statistics 
as well as clap and comment counts for the last five days.
"""


from fastapi import APIRouter, Depends, BackgroundTasks
from ..configs.db import get_db

from sqlalchemy.orm import Session
from typing import List


# importing schema
from ..schemas import report as ReportSchema
from ..schemas import blog as BlogSchema
from ..schemas import notification as NotificationSchema


# importing controller
from ..controllers import report as ReportController
from ..controllers import user as UserController
from .notification import send_notification


report_router = APIRouter(prefix="/reports", tags=["Reports"])


# users reports
# get info according to daily registrations
@report_router.get(
  "/daily-registrations", response_model=List[ReportSchema.DailyRegistration]
)
def get_daily_registration_info(
  db: Session = Depends(get_db),
):
  return ReportController.daily_registrations(db=db)


# get info according to weekly registrations
@report_router.get(
  "/weekly-registrations", response_model=List[ReportSchema.WeeklyRegistration]
)
def get_weekly_registration_info(db: Session = Depends(get_db)):
  return ReportController.weekly_registrations(db=db)


# get info according to monthly registrations
@report_router.get(
  "/monthly-registrations", response_model=List[ReportSchema.MonthlyRegistration]
)
def get_monthly_registration_info(
  db: Session = Depends(get_db),
):
  return ReportController.monthly_registrations(db=db)


# clap comment reports
@report_router.get("/clap-comment", response_model=List[ReportSchema.ClapCommentCount])
def get_info(
  db: Session = Depends(get_db),
):
  return ReportController.get_clap_comment_count_last_5_days(db=db)


# get_top_blogs
@report_router.get("/top-blogs", response_model=List[BlogSchema.BlogStr])
def get_info(
  db: Session = Depends(get_db),
):
  return ReportController.get_top_blogs(db=db)


# send notification to all
@report_router.post("/trigger_notification_for_all")
def trigger_notification_for_all(
  notification: NotificationSchema.NotificationCreateMultiple,
  background_tasks: BackgroundTasks, 
  db: Session = Depends(get_db)
):

  result = UserController.get_all_users(db=db)

  for i in result:
    notification_data = NotificationSchema.NotificationCreate(
      notification_title=notification.notification_title, 
      notification_body=notification.notification_body, 
      user_id=i.id, 
    )
    background_tasks.add_task(send_notification, notification=notification_data)

  return {"msg": "ok"}

export = report_router
