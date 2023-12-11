import React, { useState, useEffect, useRef, useContext, useMemo } from "react";
import SideNavbar from "./SideNavbar";
import "../style/Phase1.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Editimgapp from "../assests/Edit-file-img.svg";
import Approvedimgapp from "../assests/Approved-img.svg";
import Rejectimgapp from "../assests/Delete-File-img.svg";
import {
  useApprovePhase1Mutation,
  useGetApplicationDataByIdQuery,
  usePostPhase1Mutation,
  useReRequestGroupPhase1Mutation,
  useUpdatePhaseByAdminMutation,
} from "../services/api/applicationApi";
import MainContext from "./Context/MainContext";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { phase1Schema } from "../utils/ValidationSchema";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Loader from "./Loader";
import SelectCountry from "./SelectCountry";
import LanguageList from "./LanguageList";
import { format } from "date-fns";
import { toastError, toastSuccess } from "./Toast";
import tick from "../assests/tick.png";
import cross from "../assests/cross.png";
import { useApproveGroupClientPhase1Mutation, useGetGroupClientAppByIdQuery, useUpdateGroupPhaseByAdminMutation } from "../services/api/companyClient";
import Rejectpopup from "./Rejectpopup";
import RejectGroup from "./RejectGroup";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";

const Phase1Group = () => {
  const { socket } = useContext(MainContext);
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [isReject, setIsReject] = useState();
  const [companyId, setCompanyId] = useState();
  const [isPhase1Approved, setIsPhase1Approved] = useState(false);

  const [approveGroupClientPhase1, result] =
    useApproveGroupClientPhase1Mutation();
  const { isLoading, error, isSuccess } = result;

  const {
    data,
    refetch,
    isLoading: isLoadingApplication,
  } = useGetGroupClientAppByIdQuery(applicationId, {
    refetchOnMountOrArgChange: true,
  });
  const app = data?.application;
  //   console.log("Application data", app);

  const [received, setReceived] = useState();

  useEffect(() => {
    socket.on("phase data received", (phaseData) => {
      if (phaseData) {
        setReceived(phaseData);
        console.log("phase data received", phaseData);
      }
    });
  }, [received]);

  useEffect(() => {
    if (received) {
      refetch();
    }
  }, [received]);

  // Re Request Phase 1
  const [reRequestGroupPhase1, resp] = useReRequestGroupPhase1Mutation();
  const {
    isLoading: isLoadingReRequest,
    isSuccess: isSuccessReRequest,
    error: reRequestErr,
  } = resp;

  useMemo(() => {
    if (isSuccessReRequest) {
      toastSuccess("Phase 1 Requested.");
    }
  }, [isSuccessReRequest]);

  useMemo(() => {
    if (reRequestErr) {
      toastSuccess(reRequestErr?.data?.message);
    }
  }, [reRequestErr]);

  const [contact, setContact] = useState(app?.phase1?.contact);
  const [activeLink, setActiveLink] = useState("/phase1");
  const [isEditting, setIsEditting] = useState(true);

  const { notificationId } = useSelector((state) => state.user);
  const [permissionInCountryErr, setPermissionInCountryErr] = useState(
    app?.phase1?.permissionInCountry
  );
  const [speakEnglishErr, setSpeakEnglishErr] = useState(
    app?.phase1?.speakEnglish
  );
  const [refusedVisaErr, setRefusedVisaErr] = useState(
    app?.phase1?.isRefusedVisaEntry
  );
  const [languagesArr, setLanguagesArr] = useState(
    app?.phase1?.otherLanguagesSpeak
  );
  const languageRef = useRef();
  const [updateGroupPhaseByAdmin, res] = useUpdateGroupPhaseByAdminMutation();
  const {
    isSuccess: updateSuccess,
    error: updateErr,
    isLoading: isLoadingUpdate,
  } = res;
  const {
    isLoading: approveLoading,
    isSuccess: approveSuccess,
    error: approveErr,
  } = result;

  useEffect(() => {
    setContact(app?.phase1?.contact);
    setPermissionInCountryErr(app?.phase1?.permissionInCountry);
    setSpeakEnglishErr(app?.phase1?.speakEnglish);
    setRefusedVisaErr(app?.phase1?.isRefusedVisaEntry);
    setLanguagesArr(app?.phase1?.otherLanguagesSpeak);
  }, [data]);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  useMemo(() => {
    if (updateErr) {
      toastError(updateErr?.data?.message);
    }
  }, [updateErr]);

  useMemo(() => {
    if (updateSuccess) {
      toastSuccess("Data Updatted.");
      setIsEditting(true);
    }
  }, [updateSuccess]);

  useMemo(() => {
    if (approveErr) {
      toastError(approveErr?.data?.message);
    }
  }, [approveErr]);

  useMemo(() => {
    if (approveSuccess) {
      toastSuccess("Phase 1 Approved");
      handleLinkClick("/prephase2");
      navigate(`/admin/group/prephase2/${applicationId}`);
    }
  }, [approveSuccess]);

  useEffect(() => {
    if (data) {
      if (
        data?.application?.phase === 1 &&
        data?.application?.phaseStatus === "approved"
      ) {
        setIsPhase1Approved(false);
      } else {
        setIsPhase1Approved(true);
      }
    }
  }, [data]);

  const initialValues = app && {
    phase1: {
      fullNameAsPassport: app && app?.phase1.fullNameAsPassport,
      postalAddress: app && app?.phase1?.postalAddress,
      birthDate: app && format(new Date(app?.phase1?.birthDate), "yyyy-MM-dd"),
      nationality: app && app?.phase1?.nationality,
      passportNumber: app && app?.phase1?.passportNumber,
    },
  };

  useMemo(() => {
    if (error) {
      toastError(error?.data?.message);
    }
  }, [error]);

  useMemo(() => {
    if (isSuccess) {
    }
  }, [isSuccess]);

  const handleSubmit = async (values) => {
    console.log("values", values);
    const { data } = await updateGroupPhaseByAdmin({
      data: values?.phase1,
      applicationId: applicationId,
      phase: 1,
    });
    console.log(data);
  };

  const handleRemove = (value) => {
    if (languagesArr.includes(value)) {
      const tempArr = [...languagesArr];
      const filteredArray = tempArr.filter((item) => item !== value);
      setLanguagesArr(filteredArray);
    }
  };

  const handleApprove = async () => {
    await approveGroupClientPhase1({
      applicationId: applicationId,
      notificationId: notificationId,
    });
  };

  const handleDeclineRequest = () => {
    if (app?.companyId) {
      setCompanyId(true);
    } else {
      setCompanyId(false);
    }
    setIsReject(true);
  };

  const links = [
    { to: "/phase1", label: "Phase 1" },
    { to: "/prephase2", label: "Pre-Phase 2" },
    { to: "/phase2", label: "Phase 2" },
    { to: "/prephase3", label: "Pre-Phase 3" },
    { to: "/phase3", label: "Phase 3" },
    { to: "/phase4", label: "Phase 4" },
  ];

  useEffect(() => {
    // Get the current path from window.location.pathname
    const currentPath = window.location.pathname;

    // Find the matching label from the links array based on the current path
    const matchedLink = links.find((link) => link.to === currentPath);

    if (matchedLink) {
      setActiveLink(matchedLink.label);
    }
  }, [links]);

  const handleReRequest = async () => {
    const { data: resp } = await reRequestGroupPhase1(applicationId);
    if (resp.success) {
      socket.emit("phase notification", {
        userId: app?.userId,
        applicationId: applicationId,
        phase: 1,
        phaseStatus: "pending",
        phaseSubmittedByClient: 1,
        reSubmit: 1,
      });
    }
  };

  const buttonRef = useRef();

  return (
    <div className="Phase-1-main-container">
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
            />
          )}
      <SideNavbar />
      <h2 className="Pre-screening-text-2">Pre-Screening</h2>
      <div className="Buttons-preescreening">
        {isEditting && (
          <button
            style={{ cursor: "pointer" }}
            className="Edit-appliction-btn"
            onClick={() => setIsEditting(false)}
          >
            Edit <img src={Editimgapp} alt="" />
          </button>
        )}

        {!isEditting && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <button
              style={{
                cursor: "pointer",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "0",
                fontSize: ".5rem",
                gap: "4px",
              }}
              disabled={isLoadingUpdate}
              className="Approved-appliction-btn"
              onClick={() => setIsEditting(true)}
            >
              {" "}
              <img style={{ width: ".9rem" }} src={cross} alt="" /> Cancel
            </button>
            <button
              disabled={isLoadingUpdate}
              style={{
                cursor: "pointer",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "0",
                fontSize: ".5rem",
                gap: "4px",
              }}
              className="Approved-appliction-btn"
              onClick={() => buttonRef.current.click()}
            >
              {" "}
              {isLoadingUpdate ? (
                <Loader />
              ) : (
                <img style={{ width: ".9rem" }} src={tick} alt="" />
              )}
              {!isLoadingUpdate && "Update"}
            </button>
          </div>
        )}

        {isPhase1Approved &&
          app?.requestedPhase < 2 &&
          app?.applicationStatus != "rejected" && (
            <>
              <button
                disabled={approveLoading}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: approveLoading ? "no-drop" : "pointer",
                  opacity: approveLoading ? 0.55 : 1,
                }}
                onClick={handleApprove}
                className="Approved-appliction-btn"
              >
                {approveLoading ? <Loader /> : "Approve"}{" "}
                <img src={Approvedimgapp} alt="" />
              </button>
              <button
                disabled={approveLoading}
                style={{
                  cursor: "pointer",
                  opacity: approveLoading ? 0.55 : 1,
                }}
                onClick={handleDeclineRequest}
                className="Reject-appliction-btn"
              >
                {" "}
                Reject <img src={Rejectimgapp} alt="" />
              </button>
            </>
          )}

        {app?.phase === 1 &&
          app?.phaseStatus === "rejected" &&
          app?.requestedPhase < 2 && (
            <button
              disabled={isLoadingReRequest}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "0",
                paddingRight: "10px",
                alignItems: "center",
                cursor: "pointer",
                opacity: isLoadingReRequest ? 0.55 : 1,
                width: "8.5rem",
                boxSizing: "border-box",
              }}
              onClick={handleReRequest}
              className="Reject-appliction-btn"
            >
              <span style={{ wordBreak: "normal" }}>Re Request</span>
              <VscGitPullRequestGoToChanges
                style={{ color: "#fff", fontSize: "1.3rem" }}
              />
            </button>
          )}
      </div>
      <button
        onClick={() => navigate(`/admin/group/prescreening/${applicationId}`)}
        className="back-btn"
        disabled={approveLoading}
      >
        Back
      </button>

      <div className="phase-4-all-phase">
        {app?.phase >= 1 >= 1 && (
          <NavLink
            to={`/admin/group/phase1/${applicationId}`}
            className={`link-hover-effect ${
              activeLink === "/phase1" ? "link-active" : ""
            }`}
            onClick={() => handleLinkClick("/phase1")}
            style={{ width: "2.9rem" }}
          >
            <span className="routes-all">Phase 1</span>
          </NavLink>
        )}
        {app?.phase1?.status === "approved" && (
          <NavLink
            to={`/admin/group/prephase2/${applicationId}`}
            className={`link-hover-effect ${
              activeLink === "/prephase2" ? "link-active" : ""
            }`}
            onClick={() => handleLinkClick("/prephase2")}
            style={{ width: "4.4rem" }}
          >
            <span className="routes-all">Pre-Phase 2</span>
          </NavLink>
        )}
        {app?.phaseSubmittedByClient >= 2 && (
          <NavLink
            to={`/admin/group/phase2/${applicationId}`}
            className={`link-hover-effect ${
              activeLink === "/phase2" ? "link-active" : ""
            }`}
            onClick={() => {
              handleLinkClick("/phase2");
            }}
            style={{ width: "2.9rem" }}
          >
            <span className="routes-all">Phase 2</span>
          </NavLink>
        )}
        {app?.phase2?.status === "approved" && (
          <NavLink
            to={`/admin/group/prephase3/${applicationId}`}
            className={`link-hover-effect ${
              activeLink === "/prephase3" ? "link-active" : ""
            }`}
            onClick={() => {
              handleLinkClick("/prephase3");
            }}
            style={{ width: "4.4rem" }}
          >
            <span className="routes-all">Pre-Phase 3</span>
          </NavLink>
        )}
        {app?.phase >= 3 && (
          <NavLink
            to={`/admin/group/phase3/${applicationId}`}
            className={`link-hover-effect ${
              activeLink === "/phase3" ? "link-active" : ""
            }`}
            onClick={() => {
              handleLinkClick("/phase3");
            }}
            style={{ width: "2.9rem" }}
          >
            <span className="routes-all">Phase 3</span>
          </NavLink>
        )}
        {app?.phaseSubmittedByClient > 3 && (
          <NavLink
            to={`/admin/group/phase4/${applicationId}`}
            className={`link-hover-effect ${
              activeLink === "/phase4" ? "link-active" : ""
            }`}
            onClick={() => {
              handleLinkClick("/phase4");
            }}
            style={{ width: "2.9rem" }}
          >
            <span className="routes-all">Phase 4</span>
          </NavLink>
        )}
      </div>

      {app && (
        <div className="phase-1">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ setFieldValue, errors, resetForm }) => (
              <Form style={{ display: "flex", justifyContent: "center" }}>
                <div className="left-side-forget-password-2">
                  <p className="Required-data-text">Required Data*</p>

                  <div className="phase-1-form">
                    <p className="phase-1-text-left-side">Full Name</p>
                    <Field
                      disabled={isEditting}
                      type="text"
                      id="phase1.fullNameAsPassport"
                      name="phase1.fullNameAsPassport"
                      className="phase-1-input-left-side"
                      placeholder="John Leo"
                    />
                    <ErrorMessage
                      name="phase1.fullNameAsPassport"
                      component="div"
                      style={{
                        color: "red",
                        fontSize: ".8rem",
                        marginLeft: "7px",
                      }}
                    />
                    <div className="email-input">
                      <p className="phase-1-text-left-side">Postal Address</p>
                      <Field
                        disabled={isEditting}
                        type="text"
                        id="phase1.postalAddress"
                        name="phase1.postalAddress"
                        className="phase-1-input-left-side"
                      />
                      <ErrorMessage
                        name="phase1.postalAddress"
                        component="div"
                        style={{
                          color: "red",
                          fontSize: ".8rem",
                          marginLeft: "7px",
                        }}
                      />
                    </div>

                    <div className="Date-input">
                      <p className="phase-1-text-left-side">Date of Birth</p>
                      <Field
                        disabled={isEditting}
                        type="date"
                        id="phase1.birthDate"
                        name="phase1.birthDate"
                        className="phase-1-input-left-side"
                      />
                      <ErrorMessage
                        name="phase1.birthDate"
                        component="div"
                        style={{
                          color: "red",
                          fontSize: ".8rem",
                          marginLeft: "7px",
                        }}
                      />
                    </div>
                    <div className="nationalty-input">
                      <p className="phase-1-text-left-side">Nationality</p>
                      <SelectCountry
                        disabled={isEditting}
                        name="phase1.nationality"
                        id="phase1.nationality"
                        className="phase-1-input-left-side-selector"
                      ></SelectCountry>
                    </div>
                    {/* Nationality Input div ends  */}
                    <p className="phase-1-text-left-side">Passport</p>
                    <Field
                      disabled={isEditting}
                      type="text"
                      id="phase1.passportNumber"
                      name="phase1.passportNumber"
                      className="phase-1-input-left-side"
                      placeholder="John Leo"
                    />
                    <ErrorMessage
                      name="phase1.passportNumber"
                      component="div"
                      style={{
                        color: "red",
                        fontSize: ".8rem",
                        marginLeft: "7px",
                      }}
                    />

                    <button
                      ref={buttonRef}
                      type="submit"
                      style={{ opacity: 0 }}
                      className="submit-email-btn-2"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default Phase1Group;
