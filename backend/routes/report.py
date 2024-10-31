"""
routes/report.py

This module defines the routes for generating various reports in the application. 
It includes endpoints for retrieving daily, weekly, and monthly registration statistics 
as well as clap and comment counts for the last five days.
"""


from fastapi import APIRouter, Depends
from ..schemas import report as ReportSchema
from ..schemas import blog as BlogSchema
from ..configs.db import get_db
from ..controllers.report import (
  daily_registrations,
  weekly_registrations,
  monthly_registrations,
  get_clap_comment_count_last_5_days,
  get_top_blogs
)
from sqlalchemy.orm import Session
from typing import List


report_router = APIRouter(prefix="/reports", tags=["Reports"])


# users reports
# get info according to daily registrations
@report_router.get(
  "/daily-registrations", response_model=List[ReportSchema.DailyRegistration]
)
def get_daily_registration_info(
  db: Session = Depends(get_db),
):
  return daily_registrations(db=db)


# get info according to weekly registrations
@report_router.get(
  "/weekly-registrations", response_model=List[ReportSchema.WeeklyRegistration]
)
def get_weekly_registration_info(db: Session = Depends(get_db)):
  return weekly_registrations(db=db)


# get info according to monthly registrations
@report_router.get(
  "/monthly-registrations", response_model=List[ReportSchema.MonthlyRegistration]
)
def get_monthly_registration_info(
  db: Session = Depends(get_db),
):
  return monthly_registrations(db=db)


# clap comment reports
@report_router.get("/clap-comment", response_model=List[ReportSchema.ClapCommentCount])
def get_info(
  db: Session = Depends(get_db),
):
  return get_clap_comment_count_last_5_days(db=db)


# get_top_blogs
@report_router.get("/top-blogs", response_model=List[BlogSchema.BlogStr])
def get_info(
  db: Session = Depends(get_db),
):
  return get_top_blogs(db=db)

export = report_router
