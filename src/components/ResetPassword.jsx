import React, { useEffect, useMemo, useState } from "react";
import "../style/forgetpassword.css";
import Logo from "../assests/Ukimmigration-logo.png";
import Sideimg from "../assests/side-img-forget.png";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { resetPasswordSchema } from "../utils/ValidationSchema";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateNewPasswordMutation,
  useResetPasswordMutation,
} from "../services/api/userApi";
import { toastError, toastSuccess } from "./Toast";
import Loader from "./Loader";

const Resetpassword = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const [resetPassword, result] = useResetPasswordMutation();
  const { isLoading, error, isSuccess, isError } = result;

  const [createNewPassword, newPassResult] = useCreateNewPasswordMutation();
  const {
    isLoading: isLoadingNewPass,
    error: errorNewPass,
    isSuccess: isSuccessNewPass,
  } = newPassResult;

  useMemo(() => {
    if (error) {
      toastError(error?.data?.message);
    }
  }, [error]);

  useMemo(() => {
    if (errorNewPass) {
      toastError(errorNewPass?.data?.message);
    }
  }, [errorNewPass]);

  useMemo(() => {
    if (isSuccessNewPass) {
      toastSuccess("Password updated successfully");
      setTimeout(() => {
        navigate("/");
      }, 1700);
    }
  }, [isSuccessNewPass]);

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async () => {
    await resetPassword({ userId: userId, token: token });
  };

  const handleNewPassword = async (values) => {
    await createNewPassword({
      password: values.password,
      confirmPassword: values.confirmPassword,
      token: token,
    });
  };

  useEffect(() => {
    if (userId && token) {
      handleSubmit();
    }
  }, []);

  return (
    <>
      {!isLoading && isSuccess && (
        <div className="Container-forgetpassword">
          <div className="Forgetpassword-sub">
            <div className="left-side-forget-password">
              <img src={Logo} alt="" className="Logo-img" />
              <p className="Verfication-text">Confirmation</p>
              <p className="Enter-text">
                Enter<span className="Email-address-text">Password</span>
              </p>
              <Formik
                initialValues={initialValues}
                validationSchema={resetPasswordSchema}
                onSubmit={handleNewPassword}
              >
                <Form>
                  <p className="Email-heading">Password</p>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="**********************"
                    className="email-input-forgert-password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                  <p className="Email-heading">Confirm Password</p>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="email-input-forgert-password"
                    placeholder="**********************"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error"
                  />
                  <div className="button-container">
                    <button
                      disabled={isLoadingNewPass}
                      type="submit"
                      className="submit-email-btn"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {!isLoadingNewPass ? <Loader /> : "Change Password"}
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>

            <div className="right-side-forget-password">
              <img src={Sideimg} alt="" className="side-img-forget" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Resetpassword;
