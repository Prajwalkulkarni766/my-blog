import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "../helper/Toast";
import axiosInstance from "../axios/axiosInstance";
import React from "react";

export default function PushNotificationForm() {
  const notificationSchema = Yup.object({
    notification_title: Yup.string().required(),
    notification_body: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      notification_title: "",
      notification_body: "",
    },
    validationSchema: notificationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post(
          "/v1/reports/trigger_notification_for_all",
          values,
        );

        if (response.status === 200) {
          Toast.success("Notification pushed successfully");
        } else {
          throw new Error("Unexpected status code received");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An error occurred.";
        Toast.error(errorMessage);
      }
    },
  });

  return (
    <>
      <div>
        <h3>Push Notification</h3>
        <form onSubmit={formik.handleSubmit} className="mt-5">
          <div className="mb-3">
            <label htmlFor="notification_title" className="form-label">
              Notification Title
            </label>
            <input
              type="text"
              className="form-control"
              id="notification_title"
              name="notification_title"
              value={formik.values.notification_title}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.notification_title &&
            formik.errors.notification_title ? (
              <div className="text-danger">
                {formik.errors.notification_title}
              </div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="notification_body" className="form-label">
              Notification Body
            </label>
            <textarea
              rows={3}
              className="form-control"
              id="notification_body"
              name="notification_body"
              value={formik.values.notification_body}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.notification_body &&
            formik.errors.notification_body ? (
              <div className="text-danger">
                {formik.errors.notification_body}
              </div>
            ) : null}
          </div>
          <button type="submit" className="btn my-btn">
            Push Notification
          </button>
        </form>
      </div>
    </>
  );
}
