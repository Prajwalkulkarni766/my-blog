import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "../helper/Toast";
import axiosInstance from "../axios/axiosInstance";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignupForm({ buttonTxt }) {
  const navigate = useNavigate();

  const signupSchema = Yup.object({
    userName: Yup.string().required("User name requried"),
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email Address Required"),
    password: Yup.string()
      .min(8, "Too Short Password!")
      .max(16, "Too Long Password!")
      .required("Password Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post("/v1/auth/signup", values);

        // Successful signup
        if (response.status === 200) {
          Toast.success("Signup successfully");
          navigate("/home");
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
      {/* <Box
                component="form"
                noValidate
                sx={{ mt: 1, width: "100%" }}
                onSubmit={formik.handleSubmit}
                autoComplete="off"
            >
                <Input
                    labelName="Email address"
                    inputType="email"
                    inputId="email"
                    onChange={formik.handleChange}
                    onBlur={() => {
                        if (formik.touched.email || formik.errors.email) {
                            Toast.error(formik.errors.email);
                        }
                    }}
                    value={formik.values.email}
                    errors={formik.errors.email}
                    isTouched={formik.touched.email}
                />
                <Input
                    labelName="Password"
                    inputType="password"
                    inputId="password"
                    onChange={formik.handleChange}
                    onBlur={() => {
                        if (formik.touched.password || formik.errors.password) {
                            Toast.error(formik.errors.password);
                        }
                    }}
                    value={formik.values.password}
                    errors={formik.errors.password}
                    isTouched={formik.touched.password}
                />
                <Grid
                    container
                    spacing={2}
                    sx={{ alignItems: "center", mt: 2 }}
                >
                    <Grid item xs={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="remember"
                                    color="primary"
                                    onChange={changeCheckboxState}
                                />
                            }
                            label="Remember me"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            sx={{ padding: "13px 15px" }}
                            variant="contained"
                            type="submit"
                            fullWidth
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Box> */}

      <div>
        <form>
          <div className="mb-3">
            <label htmlFor="user_name" className="form-label">
              User Name
            </label>
            <input
              type="email"
              className="form-control"
              id="user_name"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              User name must be unique.
            </div>
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
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirm_password"
            />
          </div>
          <button type="submit" className="btn my-btn">
            {buttonTxt}
          </button>
        </form>
      </div>
    </>
  );
}
