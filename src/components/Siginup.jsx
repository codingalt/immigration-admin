import React, { useState } from 'react';
import '../style/forgetpassword.css';
import Logo from "../assests/Ukimmigration-logo.png";
import Sideimg from "../assests/side-img-forget.png";
import { Link } from 'react-router-dom';
import "../style/signup.css"
import googlepic from "../assests/google-pic.svg";
import { useNavigate } from 'react-router-dom'; 
import { Formik, Form, Field, ErrorMessage } from "formik";
import signupSchema from '../utils/ValidationSchema';
import { useSignupUserMutation, useVerifyCaptchaMutation } from '../services/api/userApi';
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getNotificationPermission, onCaptchaVerify, onSendOTP } from '../utils';
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import * as cg from "react-icons"
import { toastError, toastSuccess } from "./Toast";
import { useMemo } from 'react';
import { useEffect } from 'react';
import Loader from './Loader';
import { useDispatch } from 'react-redux';
import { setUserData } from '../services/redux/userSlice';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import ReCAPTCHA from "react-google-recaptcha";

const Signup = () => {
  const [signupUser, result] = useSignupUserMutation();
  const { isLoading, isSuccess, error, isError } = result;
  const [phone, setPhone] = useState("");
  const [fcmToken, setFcmToken] = useState("");
  const [isContactErr,setIsContactErr] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [captchaValue, setCaptchaValue] = useState();
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [verifyCaptcha, res] = useVerifyCaptchaMutation();
  const {isLoading: isLoadingCaptcha} = res;
  const initialValues = {
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    referringAgent: "",
  };

  useMemo(() => {
    if (error) {
      console.log(error?.data?.message);
      toastError(error?.data?.message);
    }
  }, [error]);

  useEffect(() => {
    onCaptchaVerify();
        
  }, []);

  const handleSubmit = async (values) => {

    if (values.contact.length < 5) {
      setIsContactErr(true);
      return;
    }
    setPhone(values.contact);

    // Only send OTP if the captcha is verified
    const result = await onSendOTP(values.contact);
    console.log("result",result);
    window.confirmationResult = result;
    if (!result) {
      toastError("Error Sending OTP. Try again in few seconds");
      return;
    }

    // Signup User
    const { data } = await signupUser({
      name: values.name,
      email: values.email,
      contact: values.contact,
      password: values.password,
      confirmPassword: values.confirmPassword,
      referringAgent: values.referringAgent,
      fcmToken: fcmToken,
    });
    
    console.log(data?.user);
    if (data?.success) {
      localStorage.setItem("ukimmigration_token", data?.token);
      dispatch(setUserData({data: data?.user}));
      navigate("/otp");
    }
  };

  const handleSigninWithGoogle = useGoogleLogin({
    onSuccess: async (res) => {
      const { data } = await signupUser({
        googleAccessToken: res.access_token,
        fcmToken: fcmToken,
      });
      console.log(data);
      if (data.success) {
        localStorage.setItem("ukimmigration_token", data?.token);
        setTimeout(() => {  
          navigate("/otpmail");
        }, 1000);
      }
    },
    onError: (error) => toastError("Login Failed", error),
  });

  useEffect(() => {
    const getTokenValue = async () => {
      const fcmToken = await getNotificationPermission();
      if (fcmToken) {
        setFcmToken(fcmToken);
      }
    };

    getTokenValue();
  }, []);


  return (
    <div className="Container-forgetpassword">
      <div className="Forgetpassword-sub">
        <div className="left-side-signup">
          <img src={Logo} alt="" className="Logo-img-singup" />
          <p className="Verfication-text-signup">Sign Up</p>

          <div className="login-form-2">
            <Formik
              initialValues={initialValues}
              validationSchema={signupSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, setFieldValue, touched }) => (
                <Form>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    className={errors.name && touched.name && "redborder"}
                  />
                  {/* <ErrorMessage name="name" component="div" className="error" /> */}

                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    className={errors.email && touched.email && "redborder"}
                  />
                  {/* <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  /> */}
                  <div className="mobileNumber">
                    <PhoneInput
                      country={"us"}
                      inputClass={
                        errors.contact ? "mobileInput redborder" : "mobileInput"
                      }
                      placeholder="(485)-845-8542658"
                      containerClass="inputContainer"
                      name="contact"
                      value=""
                      containerStyle={{
                        height: "3.4rem",
                        marginLeft: "3.2rem",
                        marginTop: "27px",
                      }}
                      inputStyle={{
                        height: "3.4rem",
                        width: "28.4rem",
                        borderRadius: "10px",
                      }}
                      buttonStyle={{
                        borderRadius: "10px",
                        borderTopRightRadius: "0",
                        borderBottomRightRadius: "0",
                      }}
                      onChange={(contact) => {
                        setFieldValue("contact", contact);
                        setIsContactErr(false);
                      }}
                    />
                  </div>
                  {errors.contact && touched.contact && (
                    <span className="error">Contact is Required</span>
                  )}

                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    style={{ marginTop: "0" }}
                    className={
                      errors.password && touched.password && "redborder"
                    }
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />

                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className={
                      errors.confirmPassword &&
                      touched.confirmPassword &&
                      "redborder"
                    }
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error"
                  />

                  <Field
                    placeholder="Referring Agent ID"
                    type="text"
                    id="referringAgent"
                    name="referringAgent"
                    className={
                      errors.referringAgent &&
                      touched.referringAgent &&
                      "redborder"
                    }
                  />
                  <ErrorMessage
                    name="referringAgent"
                    component="div"
                    className="error"
                  />

                  <div
                    id="recaptcha-container"
                    style={{
                      marginLeft: "3.3rem",
                      marginTop: "1.4rem",
                      marginBottom: "10px",
                      borderRadius: "10px",
                    }}
                  ></div>

                  <button
                    style={
                      isLoading
                        ? {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "2.6rem",
                            opacity: 0.5,
                            pointerEvents: "none",
                            userSelect: "none",
                          }
                        : {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "2.6rem",
                          }
                    }
                    disabled={isLoading}
                    type="submit"
                  >
                    {isLoading ? (
                      <Loader width={25} color={"#fff"} />
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </Form>
              )}
            </Formik>

            <p className="Or-gap-2">Or</p>
            <div
              className="sign-in-with-google-2"
              style={{ cursor: "pointer" }}
              onClick={handleSigninWithGoogle}
            >
              <img
                src={googlepic}
                style={{ position: "relative", left: "26px" }}
              />
              <p className="sign-in-with-goolge-text-2">SIGN UP WITH GOOGLE</p>
            </div>
          </div>
        </div>

        <div className="right-side-forget-password">
          <img src={Sideimg} alt="" className="side-img-forget" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
