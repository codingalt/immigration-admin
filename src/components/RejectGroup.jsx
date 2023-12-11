import React from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import the useNavigate hook
import "../style/Rejectpopup.css";
import crossicon from "../assests/cross -vector.png";
import Prescreening from "./Prescreening";
import {
  useGetApplicationDataByIdQuery,
  useRejectApplicationMutation,
} from "../services/api/applicationApi";
import { useState } from "react";
import Loader from "./Loader";
import { useEffect } from "react";
import { useMemo } from "react";
import { toastError, toastSuccess } from "./Toast";
import { useContext } from "react";
import MainContext from "./Context/MainContext";
import { useGetGroupClientAppByIdQuery, useRejectGroupApplicationMutation } from "../services/api/companyClient";
import GroupPrescreening from "./GroupPrescreening";

const RejectGroup = ({ show, setShow, applicationId }) => {
  const navigate = useNavigate();
  const [rejectPhaseReason, setRejectPhaseReason] = useState("");
  const [rejectApplication, res] = useRejectGroupApplicationMutation();
  const { isLoading, error, isSuccess } = res;
  const { socket } = useContext(MainContext);

  const {
    data,
    refetch,
    isLoading: isLoadingApplication,
  } = useGetGroupClientAppByIdQuery(applicationId);

  const app = data?.application;
  console.log("app", app);

  useMemo(() => {
    if (error) {
      toastError(error?.data?.message);
    }
  }, [error]);

  useMemo(() => {
    if (isSuccess) {
      toastSuccess("Application Rejected.");
      setTimeout(() => {
        setRejectPhaseReason("");
        setShow(false);
      }, 1000);
    }
  }, [isSuccess]);

  const handleConfirm = async () => {
    if (rejectPhaseReason == "") {
      toastError("Please enter a reason");
      return;
    }

    await rejectApplication({
      applicationId: applicationId,
      rejectPhaseReason: rejectPhaseReason,
    });

    socket.emit("phase notification", {
      userId: app?.userId,
      applicationId: applicationId,
      phase: app?.phase,
      phaseStatus: "rejected",
      phaseSubmittedByClient: app?.phaseSubmittedByClient,
    });
  };

  const buttonRef = React.createRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div>
      <div className="overlay" style={{ zIndex: "99",overflowX:"hidden" }}>
        <div className="Rejectpopoup-2" ref={buttonRef}>
          <img
            src={crossicon}
            onClick={() => setShow(false)}
            style={{ cursor: "pointer" }}
            alt=""
            className="cross-img"
          />
          <p className="Confermation-text-4">
            Are you sure you want to reject this application?
          </p>
          <input
            type="text"
            onChange={(e) => setRejectPhaseReason(e.target.value)}
            name=""
            placeholder="Type Reason"
            className="Reason-input-3"
          />

          <button
            disabled={isLoading}
            style={{
              minWidth: "7rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            className="cnfrm-btn-55"
            onClick={handleConfirm}
          >
            {isLoading ? <Loader /> : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectGroup;
