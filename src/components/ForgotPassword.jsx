import React, { useMemo, useState } from "react";
import "../style/forgetpassword.css";
import Logo from "../assests/Ukimmigration-logo.png";
import Sideimg from "../assests/side-img-forget.png";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../services/api/userApi";
import { toastError, toastSuccess } from "./Toast";
import Loader from "./Loader";

const ForgotPassword = () => {
  const [forgotPassword, result] = useForgotPasswordMutation();
  const { isLoading, error, isError, isSuccess } = result;
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useMemo(() => {
    if (error) {
      toastError(error?.data?.message);
      setEmail("");
    }
  }, [error]);

  useMemo(() => {
    if (isSuccess) {
      setTimeout(() => {
        toastSuccess(
          "Reset Password link has been sent to your mail.Please check your Email or Spam folder."
        );
        setEmail("");
      }, 1000);
    }
  }, [isSuccess]);

  const handleSendEmail = async () => {
    if (email === "") {
      toastError("Please enter a valid email");
      return;
    }

    await forgotPassword({ email: email });
  };

  return (
    <div className="Container-forgetpassword">
      <div className="Forgetpassword-sub">
        <div className="left-side-forget-password">
          <img src={Logo} alt="" className="Logo-img" />
          <p className="Verfication-text">Verification</p>
          <p className="Enter-text">
            Enter<span className="Email-address-text">Email Address</span>
          </p>
          <p className="Email-heading">Email</p>
          <input
            className="email-input-forgert-password"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div
            className="button-container"
            style={{ display: "flex", alignItems: "center" }}
          >
            <button onClick={() => navigate(-1)} className="cancel-email-btn">
              Cancel
            </button>
            <button
              disabled={isLoading}
              onClick={handleSendEmail}
              className="submit-email-btn"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isLoading ? <Loader /> : "Send Email"}
            </button>
          </div>
        </div>

        <div className="right-side-forget-password">
          <img src={Sideimg} alt="" className="side-img-forget" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
