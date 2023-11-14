import React, { useContext, useEffect, useMemo, useState } from "react";
import "../style/Notification.css"
import SideNavbar from './SideNavbar';
import request1 from "../assests/Request-3.png"
import Greendot from "../assests/green-request.png"
import { useGetPhaseNotificationQuery } from "../services/api/userApi";
import defaultImg from "../assests/user-default.png";
import moment from "moment";
import { useSelector } from "react-redux";
import { useAcceptInitialRequestMutation, useGetAllApplicationsQuery, useReadNotificationAdminMutation } from "../services/api/applicationApi";
import { toastError, toastSuccess } from "./Toast";
import Loader from "./Loader";
import MainContext from "./Context/MainContext";
import { useNavigate } from "react-router-dom";

const Notification = ({ setGetData,getData }) => {
  const navigate = useNavigate();
  const {
    data,
    refetch,
    isLoading: isLoadingPhaseNoti,
  } = useGetPhaseNotificationQuery(null, { refetchOnMountOrArgChange: true });

  const [readNotificationAdmin,res] = useReadNotificationAdminMutation();

  const { user } = useSelector((state) => state.user);
  const { name, profilePic } = user ? user : "";

  useEffect(()=>{
    setTimeout(() => {
      readNotificationAdmin();
    }, 1000);
  },[]);

  // const {
  //   data,
  //   refetch,
  //   isLoading: isLoadingPhaseNoti,
  // } = useGetAllApplicationsQuery();
  const { socket } = useContext(MainContext);

  console.log(data);

  const [acceptInitialRequest, result] = useAcceptInitialRequestMutation();
  const { isLoading, error, isSuccess } = result;

  const [notification, setNotification] = useState([]);

  console.log("Notification", notification);

  useEffect(() => {
    setNotification(data?.phases);
  }, [data]);

  useMemo(() => {
    if (error) {
      toastError("Error Accepting Application");
    }
  }, [error]);

  useMemo(() => {
    if (isSuccess) {
      toastSuccess("Request Accepted.");
    }
  }, [isSuccess]);

  const handleAcceptRequest = async (applicationId, item) => {
    if (item.isInitialRequestAccepted) {
      navigate(
        item.phase === 1
          ? `/admin/prescreening/${item.applicationId}`
          : item.phase === 2
          ? `/admin/phase2/${item.applicationId}`
          : item.phase === 3
          ? `/admin/phase3/${item.applicationId}`
          : `/admin/phase4/${item.applicationId}`
      );
      return;
    }
    const { data } = await acceptInitialRequest({
      applicationId: applicationId,
    });

    if(data.success){
      refetch();
    }

  };

  // useEffect(() => {
  //   if (!isLoadingPhaseNoti) {
  //     socket.on("phase data received", (phaseData) => {
  //       if (phaseData) {
  //         refetch();
  //         console.log("phase data received", phaseData);
  //       }
  //     });
  //   }
  // }, [isLoadingPhaseNoti, refetch, socket]);

  useEffect(() => {
    socket?.on("phase data received", async (request) => {
      if (request) {
        console.log("Request Result", request);
        setGetData(request?.result);
      }
    });
  }, [getData]);

  useEffect(() => {
    if (getData) {
      refetch();
    }
  }, [getData]);

  return (
    <div className="Notification-main-container">
      <SideNavbar />
      <h1 className="Notification-heading">Notification</h1>
      <div className="Notification">
        <div className="Client-Request-1">
          <img
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            src={
              profilePic
                ? `${import.meta.env.VITE_IMG_URI}${profilePic}`
                : request1
            }
            alt=""
            className="Request-1"
          />
          <img src={Greendot} alt="" className="Green-request-dot" />
          <h4 className="Request-1-text">Request</h4>
          <p className="Request-1-text-2">Approve or ignore requests</p>
          <p className="Request-1-text-3">
            {notification && moment(
              notification[notification?.length - 1]?.createdAt
            ).format("dddd, MMMM Do")}
          </p>
        </div>
        <h2 className="Requests-heading"> New Application Request </h2>

        <div className="New-Application-Request">
          {notification &&
            !isLoadingPhaseNoti &&
            notification
              .filter(
                (item) =>
                  !item.isInitialRequestAccepted &&
                  item.notificationType === "admin"
                // item.phaseStatus != "approved"
              )
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((item) => (
                <div
                  className="Client-Request-1"
                  key={item?._id}
                  style={{ height: "4rem" }}
                >
                  <img
                    style={{
                      width: "2.5rem",
                      borderRadius: "50%",
                      height: "2.5rem",
                    }}
                    src={
                      item?.profilePic
                        ? `${import.meta.env.VITE_IMG_URI}${item?.profilePic}`
                        : defaultImg
                    }
                    alt=""
                    className="Request-2"
                  />
                  <h4 className="Request-2-text">{item.name}</h4>
                  <p className="Request-2-text-2">
                    Request for visa approval phase{" "}
                    {item.phaseSubmittedByClient}
                  </p>
                  <p className="Request-2-text-3">
                    {moment(item.createdAt).format("dddd, MMMM Do")}
                  </p>
                  <button
                    onClick={() =>
                      handleAcceptRequest(item.applicationId, item)
                    }
                    className="Request-2-btn-1"
                  >
                    {item.isInitialRequestAccepted ? "View" : "Accept"}
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/admin/reject/${item.applicationId}`)
                    }
                    className="Request-2-btn-2"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() =>
                      navigate(
                        item.phase === 1
                          ? `/admin/prescreening/${item.applicationId}`
                          : item.phase === 2
                          ? `/admin/phase2/${item.applicationId}`
                          : item.phase === 3
                          ? `/admin/phase3/${item.applicationId}`
                          : `/admin/phase4/${item.applicationId}`
                      )
                    }
                    className="Request-2-btn-3"
                  >
                    Review
                  </button>
                </div>
              ))}
          {isLoadingPhaseNoti && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "500",
                color: "red",
                marginTop: "4.5rem",
                marginLeft: "-5rem",
              }}
            >
              <Loader color={"#5D982E"} width={35} />
            </div>
          )}
          {!isLoadingPhaseNoti &&
            notification?.filter((item) => !item.isInitialRequestAccepted)
              .length === 0 && (
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "500",
                  color: "red",
                  marginTop: "5rem",
                }}
              >
                No New Notifications yet
              </p>
            )}
        </div>

        <h2 className="Requests-heading"> Ongoing Application Request </h2>
        <div className="Ongoing-Application-Request">
          {notification &&
            !isLoadingPhaseNoti &&
            notification
              .filter(
                (item) =>
                  item.isInitialRequestAccepted &&
                  item.notificationType === "admin" &&
                  item.phaseStatus != "approved"
              )
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((item) => (
                <div
                  className="Client-Request-1"
                  key={item?._id}
                  style={{ height: "4rem" }}
                >
                  <img
                    style={{
                      width: "2.5rem",
                      borderRadius: "50%",
                      height: "2.5rem",
                    }}
                    src={
                      item?.profilePic
                        ? `${import.meta.env.VITE_IMG_URI}${item?.profilePic}`
                        : defaultImg
                    }
                    alt=""
                    className="Request-2"
                  />
                  <h4 className="Request-2-text">{item.name}</h4>
                  <p className="Request-2-text-2">
                    Request for visa approval phase {item.phase}
                  </p>
                  <p className="Request-2-text-3">
                    {moment(item.createdAt).format("MMMM D, YYYY, h:mm A")}
                  </p>
                  <button
                    onClick={() =>
                      handleAcceptRequest(item.applicationId, item)
                    }
                    className="Request-2-btn-1"
                  >
                    {item.isInitialRequestAccepted ? "View" : "Accept"}
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/admin/reject/${item.applicationId}`)
                    }
                    className="Request-2-btn-2"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() =>
                      navigate(
                        item.phase === 1
                          ? `/admin/prescreening/${item.applicationId}`
                          : item.phase === 2
                          ? `/admin/phase2/${item.applicationId}`
                          : item.phase === 3
                          ? `/admin/phase3/${item.applicationId}`
                          : `/admin/phase4/${item.applicationId}`
                      )
                    }
                    className="Request-2-btn-3"
                  >
                    Review
                  </button>
                </div>
              ))}
          {isLoadingPhaseNoti && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "500",
                color: "red",
                marginTop: "4.5rem",
                marginLeft: "-5rem",
              }}
            >
              <Loader color={"#5D982E"} width={35} />
            </div>
          )}
          {!isLoadingPhaseNoti &&
            notification?.filter((item) => item.isInitialRequestAccepted)
              .length === 0 && (
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "500",
                  color: "red",
                  marginTop: "5rem",
                }}
              >
                No Notifications yet
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
