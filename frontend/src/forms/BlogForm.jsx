import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "../helper/Toast";
import axiosInstance from "../axios/axiosInstance";
import React, { useState } from "react";
import CustomTextArea from "../components/CustomTextArea";

export default function BlogForm() {
  const [image, setImage] = useState(null);

  const setImageToState = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const blogSchema = Yup.object({
    title: Yup.string().required("Title for blog is required"),
    sub_title: Yup.string().required("Sub title for blog is required"),
    content: Yup.string().required("Content for blog is required"),
    tags: Yup.string().required("Tags are required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      sub_title: "",
      content: "",
      tags: "",
    },
    validationSchema: blogSchema,
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post("/v1/blogs", values);

        if (response.status === 200) {
          console.log(response.data);
          Toast.success("Blog posted successfully");
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
          {/* <div className="mb-3">
            {formik.touched.name && formik.errors.name ? (
              <div className="text-danger">{formik.errors.name}</div>
            ) : null}
          </div>*/}

          {/* primary-heading */}
          <CustomTextArea
            contentType={"h1"}
            placeholder={"Title"}
            value={formik.values.title}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange("title")}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-danger">{formik.errors.title}</div>
          ) : null}

          {/* secondary-heading  */}
          <CustomTextArea
            contentType={"h4"}
            placeholder={"Sub title"}
            className={"text-secondary"}
            value={formik.values.sub_title}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange("sub_title")}
          />
          {formik.touched.sub_title && formik.errors.sub_title ? (
            <div className="text-danger">{formik.errors.sub_title}</div>
          ) : null}

          {/* content */}
          <CustomTextArea
            contentType={"p"}
            placeholder={"Content"}
            value={formik.values.content}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange("content")}
          />
          {formik.touched.content && formik.errors.content ? (
            <div className="text-danger">{formik.errors.content}</div>
          ) : null}

          <CustomTextArea
            contentType={"p"}
            placeholder={"Tags"}
            value={formik.values.tags}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange("tags")}
          />
          {formik.touched.tags && formik.errors.tags ? (
            <div className="text-danger">{formik.errors.tags}</div>
          ) : null}

          {image != null && (
            <img src={image} alt="Blog" className="img-fluid" />
          )}

          <div className="mb-3">
            <label htmlFor="blog_image" className="form-label">
              Select the blog image
            </label>
            <input
              className="form-control"
              type="file"
              id="blog_image"
              accept="image/*"
              onChange={setImageToState}
            />
          </div>

          <button type="submit" className="btn my-btn mt-3">
            Publish
          </button>
        </form>
      </div>
    </>
  );
}
