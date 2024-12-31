import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "../helper/Toast";
import axiosInstance from "../axios/axiosInstance";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignupForm({ buttonTxt }) {
  const navigate = useNavigate();

  const signupSchema = Yup.object({
    name: Yup.string().required("User name requried"),
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email Address Required"),
    password: Yup.string()
      .min(8, "Too Short Password!")
      .max(16, "Too Long Password!")
      .required("Password Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      about: "",
      confirm_password: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        values.confirm_password = values.confirmPassword;
        const response = await axiosInstance.post("/v1/auth/signup", values);

        // Successful signup
        if (response.status === 200) {
          Toast.success("Signup successfully");
          navigate("/login");
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
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirm_password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-danger">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="about" className="form-label">
              About
            </label>
            <textarea
              rows={3}
              type="text"
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
          <button
            type="submit"
            className="btn my-btn"
            onClick={formik.handleSubmit}
          >
            {buttonTxt}
          </button>
        </form>
      </div>
    </>
  );
}
