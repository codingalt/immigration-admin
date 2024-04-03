import React, { useContext, useEffect, useMemo, useState } from "react";
import "../style/Notification.css"
import SideNavbar from './SideNavbar';
import request1 from "../assests/Request-3.png"
import Greendot from "../assests/green-request.png"
import { useGetPhaseNotificationQuery } from "../services/api/userApi";
import defaultImg from "../assests/user-default.png";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useAcceptInitialRequestMutation, useGetAllApplicationsQuery, useReadNotificationAdminMutation, useReadNotificationCaseWorkerMutation } from "../services/api/applicationApi";
import { toastError, toastSuccess } from "./Toast";
import Loader from "./Loader";
import MainContext from "./Context/MainContext";
import { useNavigate } from "react-router-dom";
import { setNotificationId } from "../services/redux/userSlice";
import { useAcceptGroupClientRequestMutation } from "../services/api/companyClient";
import Messageprofileimg from "../assests/billing-table-img.png";
import RejectGroup from "./RejectGroup";
import Rejectpopup from "./Rejectpopup";

const Notification = ({ setGetData, getData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isReject,setIsReject] = useState();
  const [companyId, setCompanyId] = useState();
  const [applicationId, setApplicationId] = useState();
  const {
    data,
    refetch,
    isLoading: isLoadingPhaseNoti,
  } = useGetPhaseNotificationQuery(null, { refetchOnMountOrArgChange: true });

  const [readNotificationAdmin, res] = useReadNotificationAdminMutation();

  const [readNotificationCaseWorker, res2] =
    useReadNotificationCaseWorkerMutation();

  const { user } = useSelector((state) => state.user);

  const { name, profilePic } = user ? user : "";

  useEffect(() => {
    setTimeout(() => {
      readNotificationAdmin();
    }, 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      user?.isCaseWorker && readNotificationCaseWorker();
    }, 1000);
  }, []);

  // const {
  //   data,
  //   refetch,
  //   isLoading: isLoadingPhaseNoti,
  // } = useGetAllApplicationsQuery();
  const { socket } = useContext(MainContext);


  const [acceptInitialRequest, result] = useAcceptInitialRequestMutation();
  const { isLoading, error, isSuccess } = result;

  const [acceptGroupClientRequest, resp] =
    useAcceptGroupClientRequestMutation();
  const { error: errorGroupClient, isSuccess: successGroupClient } = resp;

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

  useMemo(() => {
    if (errorGroupClient) {
      toastError("Error Accepting Application");
    }
  }, [errorGroupClient]);

  useMemo(() => {
    if (successGroupClient) {
      toastSuccess("Request Accepted.");
    }
  }, [successGroupClient]);

  const handleAcceptRequest = async (applicationId, item) => {
    if (item.isInitialRequestAccepted) {
      dispatch(setNotificationId(item._id));
      if (item.companyId) {
        navigate(
          item.phase === 1
            ? `/admin/group/prescreening/${item.applicationId}`
            : item.phase === 2
            ? `/admin/group/phase2/${item.applicationId}`
            : item.phase === 3
            ? `/admin/group/phase3/${item.applicationId}`
            : `/admin/group/phase4/${item.applicationId}`
        );
        return;
      } else {
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
    }

    if (item.companyId) {
      const { data } = await acceptGroupClientRequest({
        applicationId: applicationId,
      });

      if (data.success) {
        refetch();
      }
    } else {
      const { data } = await acceptInitialRequest({
        applicationId: applicationId,
      });

      if (data.success) {
        refetch();
      }
    }
  };

  const handleDeclineRequest = (applicationId, item) => {
    if (item.companyId) {
      setCompanyId(true);
    }else{
      setCompanyId(false);
    }
    setIsReject(true);
    setApplicationId(applicationId);
  };

  useEffect(() => {
    socket?.on("phase data received", async (request) => {

        console.log("Request Result", request);
        !isLoadingPhaseNoti && refetch();
      
    });
  });

  useEffect(() => {
    socket?.on("caseworker noti received", async (request) => {
      if (request) {
        !isLoadingPhaseNoti && refetch();
        console.log("Request Result case worker", request);
      }
    });
  });

  useEffect(()=>{
    if(getData){
      refetch();
    }
  },[getData]);

   const latestNotificationsMap = {};

   // Iterate through the notifications to find the latest for each user
   notification?.filter((item) => item.isInitialRequestAccepted)
     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
     .forEach((item) => {
       if (
         !latestNotificationsMap[item.userId] ||
         new Date(item.createdAt) >
           new Date(latestNotificationsMap[item.userId].createdAt)
       ) {
         latestNotificationsMap[item.userId] = item;
       }
     });

  return (
    <div className="Notification-main-container">
      {companyId
        ? isReject && (
            <RejectGroup
              applicationId={applicationId}
              show={isReject}
              setShow={setIsReject}
            />
          )
        : isReject && (
            <Rejectpopup
              applicationId={applicationId}
              show={isReject}
              setShow={setIsReject}
              refreshList={refetch}
            />
          )}
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
          <h4 className="Request-1-text">Request</h4>
          <p className="Request-1-text-2">Approve or ignore requests</p>
          <p className="Request-1-text-3">
            {notification &&
              moment(notification[notification?.length - 1]?.createdAt).format(
                "dddd, MMMM Do"
              )}
          </p>
        </div>
        <h2 className="Requests-heading" style={{ marginBottom: "13px" }}>
          {" "}
          New Application Request{" "}
        </h2>

        <div className="New-Application-Request">
          {notification && !isLoadingPhaseNoti && user?.isCaseWorker
            ? notification
                .filter(
                  (item) =>
                    item.caseWorkerId === user._id &&
                    !item.isInitialRequestAccepted &&
                    item.phaseStatus != "rejected"
                )
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((item) => (
                  <div
                    className="Client-Request-1"
                    key={item?._id}
                    style={{
                      height: "4rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "95%",
                    }}
                  >
                    <div
                      className="ongoing-item"
                      style={{ alignItems: "center", marginLeft: "25px" }}
                    >
                      <div className="ongoing-left">
                        {item?.googleId ? (
                          <img
                            style={{
                              width: "2.5rem",
                              borderRadius: "50%",
                              height: "2.5rem",
                            }}
                            src={
                              item?.profilePic
                                ? item?.profilePic
                                : Messageprofileimg
                            }
                            alt=""
                            className=""
                          />
                        ) : (
                          <img
                            style={{
                              width: "2.5rem",
                              borderRadius: "50%",
                              height: "2.5rem",
                            }}
                            src={
                              item?.profilePic
                                ? `${import.meta.env.VITE_IMG_URI}${
                                    item?.profilePic
                                  }`
                                : Messageprofileimg
                            }
                            alt=""
                            className=""
                          />
                        )}
                      </div>

                      <div className="ongoing-right">
                        <div className="r-name">
                          <span>{item.name}</span>
                          <span>
                            {moment(item.createdAt).format("MM D, YY, h:mm A")}
                          </span>
                        </div>
                        <span
                          style={
                            item.phaseStatus === "rejected"
                              ? { color: "red" }
                              : {}
                          }
                        >
                          {item.phaseStatus === "rejected"
                            ? "Application Rejected"
                            : `Request for visa approval phase ${item.phase}`}
                        </span>
                      </div>
                    </div>
                    <div className="ongoing-buttons">
                      <button
                        onClick={() =>
                          handleAcceptRequest(item.applicationId, item)
                        }
                        className="Request-2-btn-1"
                      >
                        {isLoading
                          ? "Accept.."
                          : item.isInitialRequestAccepted
                          ? "View"
                          : "Accept"}
                      </button>
                      <button
                        onClick={() =>
                          handleDeclineRequest(item.applicationId, item)
                        }
                        className="Request-2-btn-2"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() =>
                          item.companyId
                            ? navigate(
                                `/admin/clientprofiles`
                              )
                            : navigate(
                                `/admin/clientprofiles`
                              )
                        }
                        className="Request-2-btn-3"
                      >
                        Review
                      </button>
                    </div>
                  </div>
                ))
            : notification
                ?.filter(
                  (item) =>
                    !item.isInitialRequestAccepted &&
                    item.phaseStatus != "rejected"
                )
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((item) => (
                  <div
                    className="Client-Request-1"
                    key={item?._id}
                    style={{
                      height: "4rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "95%",
                    }}
                  >
                    <div
                      className="ongoing-item"
                      style={{ alignItems: "center", marginLeft: "25px" }}
                    >
                      <div className="ongoing-left">
                        {item?.googleId ? (
                          <img
                            style={{
                              width: "2.5rem",
                              borderRadius: "50%",
                              height: "2.5rem",
                            }}
                            src={
                              item?.profilePic
                                ? item?.profilePic
                                : Messageprofileimg
                            }
                            alt=""
                            className=""
                          />
                        ) : (
                          <img
                            style={{
                              width: "2.5rem",
                              borderRadius: "50%",
                              height: "2.5rem",
                            }}
                            src={
                              item?.profilePic
                                ? `${import.meta.env.VITE_IMG_URI}${
                                    item?.profilePic
                                  }`
                                : Messageprofileimg
                            }
                            alt=""
                            className=""
                          />
                        )}
                      </div>

                      <div className="ongoing-right">
                        <div className="r-name">
                          <span>{item.name}</span>
                          <span>
                            {moment(item.createdAt).format("MM D, YY, h:mm A")}
                          </span>
                        </div>
                        <span
                          style={
                            item.phaseStatus === "rejected"
                              ? { color: "red" }
                              : {}
                          }
                        >
                          {item.phaseStatus === "rejected"
                            ? "Application Rejected"
                            : `Request for visa approval phase ${item.phase}`}
                        </span>
                      </div>
                    </div>
                    <div className="ongoing-buttons">
                      <button
                        onClick={() =>
                          handleAcceptRequest(item.applicationId, item)
                        }
                        className="Request-2-btn-1"
                      >
                        {isLoading
                          ? "Accept.."
                          : item.isInitialRequestAccepted
                          ? "View"
                          : "Accept"}
                      </button>
                      <button
                        onClick={() =>
                          handleDeclineRequest(item.applicationId, item)
                        }
                        className="Request-2-btn-2"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() =>
                          item.companyId
                            ? navigate(
                                `/admin/group/clientprofiles`
                              )
                            : navigate(
                                `/admin/clientprofiles`
                              )
                        }
                        className="Request-2-btn-3"
                      >
                        Review
                      </button>
                    </div>
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
            notification?.filter(
              (item) =>
                !item.isInitialRequestAccepted && item.phaseStatus != "rejected"
            ).length === 0 && (
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
          {!isLoadingPhaseNoti &&
            Object.values(latestNotificationsMap).map((latestNotification) => (
              <div
                className="Client-Request-1"
                key={latestNotification?._id}
                style={{
                  height: "4rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="ongoing-item">
                  <div className="ongoing-left">
                    {latestNotification?.googleId ? (
                      <img
                        style={{
                          width: "2.5rem",
                          borderRadius: "50%",
                          height: "2.5rem",
                        }}
                        src={
                          latestNotification?.profilePic
                            ? latestNotification?.profilePic
                            : Messageprofileimg
                        }
                        alt=""
                      />
                    ) : (
                      <img
                        style={{
                          width: "2.5rem",
                          borderRadius: "50%",
                          height: "2.5rem",
                        }}
                        src={
                          latestNotification?.profilePic
                            ? `${import.meta.env.VITE_IMG_URI}${
                                latestNotification?.profilePic
                              }`
                            : Messageprofileimg
                        }
                        alt=""
                      />
                    )}
                  </div>
                  <div className="ongoing-right">
                    <div className="r-name">
                      <span>{latestNotification.name}</span>
                      <span>
                        {moment(latestNotification.createdAt).format(
                          "MM D, YY, h:mm A"
                        )}
                      </span>
                    </div>
                    <span
                      style={
                        latestNotification.phaseStatus === "rejected"
                          ? { color: "red" }
                          : {}
                      }
                    >
                      {latestNotification.phaseStatus === "rejected"
                        ? "Application Rejected"
                        : `Request for visa approval phase ${latestNotification.phase}`}
                    </span>
                  </div>
                </div>

                <div className="ongoing-buttons">
                  <button
                    onClick={() =>
                      handleAcceptRequest(
                        latestNotification.applicationId,
                        latestNotification
                      )
                    }
                    className="Request-2-btn-1"
                  >
                    {latestNotification.isInitialRequestAccepted
                      ? "View"
                      : "Accept"}
                  </button>
                  <button
                    onClick={() =>
                      handleDeclineRequest(
                        latestNotification.applicationId,
                        latestNotification
                      )
                    }
                    className="Request-2-btn-2"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() =>
                      navigate(
                        `/admin/clientprofiles`
                      )
                    }
                    className="Request-2-btn-3"
                  >
                    Review
                  </button>
                </div>
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
