import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "../helper/Toast";
import axiosInstance from "../axios/axiosInstance";
import React, { useState, useEffect } from "react";

export default function ProfileForm({ buttonTxt }) {
  const [data, setData] = useState({});

  const getProfile = async () => {
    try {
      const response = await axiosInstance.get("/v1/users");

      if (response.status === 200) {
        setData(response.data);
      } else {
        throw new Error("Unexpected status code received");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      Toast.error(errorMessage);
    }
  };

  const profileSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email("Invalid Email Address").required(),
    about: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: data.name || "",
      email: data.email || "",
      about: data.about || "",
    },
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.patch("/v1/users", values);

        if (response.status === 200) {
          setData(response.data);
          Toast.success("Profile updated successfully");
        } else {
          throw new Error("Unexpected status code received");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An error occurred.";
        Toast.error(errorMessage);
      }
    },
    enableReinitialize: true, // Ensure Formik reinitializes with new data
  });

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="user_name" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="user_name"
              name="name"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              aria-describedby="userHelp"
            />
            <div id="userHelp" className="form-text">
              User name must be unique.
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div className="text-danger">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="email_address" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email_address"
              aria-describedby="emailHelp"
              name="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="about" className="form-label">
              About
            </label>
            <textarea
              rows={3}
              className="form-control"
              id="about"
              name="about"
              value={formik.values.about}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.about && formik.errors.about ? (
              <div className="text-danger">{formik.errors.about}</div>
            ) : null}
          </div>
          <button type="submit" className="btn my-btn">
            {buttonTxt}
          </button>
        </form>
      </div>
    </>
  );
}
