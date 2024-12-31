import React, { useState } from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "../helper/Toast";
import axiosInstance from "../axios/axiosInstance";
import CustomTextArea from "../components/user/CustomTextArea";

export default function BlogForm() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const setImageToState = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      setImageData(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const blogSchema = Yup.object({
    title: Yup.string().required("Title for blog is required"),
    sub_title: Yup.string().required("Sub title for blog is required"),
    content: Yup.string().required("Content for blog is required"),
    tags: Yup.string().required("Tags are required"),
  });

  const saveContentToFormik = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = JSON.stringify(convertToRaw(contentState));
    formik.setFieldValue("content", rawContent); // set the content value in formik
  };

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
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("sub_title", values.sub_title);
        formData.append("content", values.content);
        formData.append("tags", values.tags);
        if (imageData) {
          formData.append("image", imageData);
        }

        const response = await axiosInstance.post("/v1/blogs", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          Toast.success("Blog posted successfully");
          formik.resetForm();
          setEditorState(EditorState.createEmpty());
          setImage(null);
          setImageData(null);
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
          <div className="mb-3">
            <label>Content</label>
            {/* Draft.js Editor */}
            <div className="border p-2" style={{ minHeight: "200px" }}>
              <Editor
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                onChange={(newState) => {
                  setEditorState(newState);
                  saveContentToFormik();
                }}
              />
            </div>

            {/* Formatting buttons */}
            <div className="mt-2">
              <button
                type="button"
                className="btn btn-light"
                onMouseDown={(e) => {
                  e.preventDefault();
                  toggleInlineStyle("BOLD");
                }}
              >
                <strong>B</strong>
              </button>
              <button
                type="button"
                className="btn btn-light"
                onMouseDown={(e) => {
                  e.preventDefault();
                  toggleInlineStyle("ITALIC");
                }}
              >
                <em>I</em>
              </button>
              <button
                type="button"
                className="btn btn-light"
                onMouseDown={(e) => {
                  e.preventDefault();
                  toggleInlineStyle("UNDERLINE");
                }}
              >
                <u>U</u>
              </button>
            </div>
          </div>

          {/* image */}
          <div className="mb-3">
            {image != null && (
              <img src={image} alt="Blog" className="img-fluid" />
            )}
            {image == null && (
              <>
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
              </>
            )}
          </div>

          {/* tags */}
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

          <button type="submit" className="btn my-btn mt-3">
            Publish
          </button>
        </form>
      </div>
    </>
  );
}
