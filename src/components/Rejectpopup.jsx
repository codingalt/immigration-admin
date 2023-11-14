import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import the useNavigate hook
import "../style/Rejectpopup.css";
import crossicon from "../assests/cross -vector.png";
import Prescreening from './Prescreening';
import { useGetApplicationDataByIdQuery, useRejectApplicationMutation } from '../services/api/applicationApi';
import { useState } from 'react';
import Loader from './Loader';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { toastError, toastSuccess } from './Toast';
import { useContext } from 'react';
import MainContext from './Context/MainContext';

const Rejectpopup = () => {
    const navigate = useNavigate(); 
    const [rejectPhaseReason, setRejectPhaseReason] = useState("");
    const {applicationId} = useParams();
    const [rejectApplication, res] = useRejectApplicationMutation();
    const {isLoading, error,isSuccess} = res;
    const { socket } = useContext(MainContext);

    const {
      data,
      refetch,
      isLoading: isLoadingApplication,
    } = useGetApplicationDataByIdQuery(applicationId);

    const app = data?.application;
    console.log("app", app);

    useMemo(()=>{
        if(error){
            toastError(error?.data?.message);
        }
    },[error]);

    useMemo(() => {
      if (isSuccess) {
        toastSuccess("Application Rejected.");
        setTimeout(() => {
            setRejectPhaseReason("");
            navigate(-1);
        }, 1000);
      }
    }, [isSuccess]);

    const handleConfirm = async() => {
      if(rejectPhaseReason == ""){
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
        });
    };

    const buttonRef = React.createRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        navigate(-1)
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
    return (
      <div>
        <Prescreening />

        <div className="overlay" style={{zIndex:"99"}}>
          <div className="Rejectpopoup-2" ref={buttonRef}>
            <img src={crossicon} alt="" className="cross-img" />
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
}

export default Rejectpopup;
