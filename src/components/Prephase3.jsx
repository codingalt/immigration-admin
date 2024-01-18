import React, { useState, useEffect, useRef, useMemo } from "react";
import "../style/Prephase3.css";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import SideNavbar from "./SideNavbar";
import editpen from "../assests/edit-pen.png";
import "../style/Phase1.css";
import Editimgapp from "../assests/Edit-file-img.svg";
import Approvedimgapp from "../assests/Approved-img.svg";
import Rejectimgapp from "../assests/Delete-File-img.svg";
import {
  useGetApplicationDataByIdQuery,
  useRequestAPhaseMutation,
} from "../services/api/applicationApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toastError, toastSuccess } from "./Toast";
import Loader from "./Loader";
import { useContext } from "react";
import MainContext from "./Context/MainContext";
import { applicationServiceTypes } from "../utils";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";

const Prephase3 = () => {
  const navigate = useNavigate();
  const { applicationId } = useParams();
  const [applicationType, setApplicationType] = useState();
  const {
    data,
    refetch,
    isLoading: isLoadingApplication,
  } = useGetApplicationDataByIdQuery(applicationId, {
    refetchOnMountOrArgChange: true,
  });
  const app = data?.application;
  console.log("Application data", app?.phase3);
  const { socket } = useContext(MainContext);
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

  const links = [
    { to: "/phase1", label: "Phase 1" },
    { to: "/prephase2", label: "Pre-Phase 2" },
    { to: "/phase2", label: "Phase 2" },
    { to: "/prephase3", label: "Pre-Phase 3" },
    { to: "/phase3", label: "Phase 3" },
    { to: "/phase4", label: "Phase 4" },
  ];

  const [activeLink, setActiveLink] = useState("/prephase3");
  const [isCompanyHelp, setIsCompanyHelp] = useState(
    app?.phase3?.doesCompanyHelp === true
      ? true
      : app?.phase3?.doesCompanyHelp === false
      ? false
      : true
  );

  useEffect(() => {
    // Get the current path from window.location.pathname
    const currentPath = window.location.pathname;

    // Find the matching label from the links array based on the current path
    const matchedLink = links.find((link) => link.to === currentPath);

    if (matchedLink) {
      setActiveLink(matchedLink.label);
    }
  }, [links]);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const handleClick = () => {};

  const initialValues = {
    phase3: {
      doesCompanyHelp: app && isCompanyHelp,
      companyHelpService: app?.phase3?.companyHelpService,
      applicationType: app?.phase3?.applicationType
        ? app.phase3?.applicationType
        : applicationType,
      cost: app?.phase3?.cost,
      reason: app?.phase3?.reason,
    },
  };

  const handleChangeSelect = (e, setFieldValue) => {
    console.log(e.target.value);
    setFieldValue(
      "phase3.applicationType",
      applicationServiceTypes[e.target.value]
    );
  };

  const [requestAPhase, res] = useRequestAPhaseMutation();
  const { isLoading, isSuccess, error, data: submitResponse } = res;

  useMemo(() => {
    if (error) {
      toastError(error?.data?.message);
    }
  }, [error]);

  useMemo(() => {
    if (isSuccess) {
      if(!submitResponse?.data?.phase3.doesCompanyHelp){
        socket.emit("phase notification", {
          userId: app?.userId,
          applicationId: applicationId,
          phase: 2,
          phaseStatus: "rejected",
          phaseSubmittedByClient: 2,
        });
      } else if (
        submitResponse?.data?.phase === 3 &&
        submitResponse?.data?.phaseStatus === "rejected" &&
        submitResponse?.data?.phase3.doesCompanyHelp
      ) {
        socket.emit("phase notification", {
          userId: app?.userId,
          applicationId: applicationId,
          phase: 2,
          phaseStatus: "pending",
          phaseSubmittedByClient: 2,
          reSubmit: 3,
        });
      } else {
        socket.emit("phase notification", {
          userId: app?.userId,
          applicationId: applicationId,
          phase: 2,
          phaseStatus: "approved",
          phaseSubmittedByClient: app?.phaseSubmittedByClient,
        });
      }
      

      toastSuccess("Phase 3 Requested");
      navigate(`/admin/prescreening/${applicationId}`);
    }
  }, [isSuccess]);

  const handleSubmit = async (values, { resetForm }) => {
    console.log("Submitted", values);
    await requestAPhase({ data: values, applicationId: applicationId });
    resetForm({
      values: initialValues,
    });
  };

  const buttonRef = useRef();

  return (
    <div className="Prephase3-container">
      <SideNavbar />
      <h2 className="Pre-screening-text">Pre-Screening</h2>
      <img src={editpen} alt="" className="edit-pen" />
      <button onClick={() => navigate(-1)} className="back-btn">
        Back
      </button>

      <div className="Buttons-preescreening">
        {app?.phase3?.status === "rejected" && (
          <button
            disabled={isLoading}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "0",
              paddingRight: "10px",
              alignItems: "center",
              cursor: "pointer",
              opacity: isLoading ? 0.55 : 1,
              width: "8.5rem",
              boxSizing: "border-box",
            }}
            onClick={() => buttonRef.current.click()}
            className="Reject-appliction-btn"
          >
            <span style={{ wordBreak: "normal" }}>Re Request</span>
            <VscGitPullRequestGoToChanges
              style={{ color: "#fff", fontSize: "1.3rem" }}
            />
          </button>
        )}
      </div>

      <div className="phase-4-all-phase">
        {app?.phase >= 1 && (
          <NavLink
            to={`/admin/phase1/${applicationId}`}
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
            to={`/admin/prephase2/${applicationId}`}
            className={`link-hover-effect ${
              activeLink === "/prephase2" ? "link-active" : ""
            }`}
            onClick={() => handleLinkClick("/prephase2")}
            style={{ width: "4.4rem" }}
          >
            <span className="routes-all">Pre-Phase 2</span>
          </NavLink>
        )}
        {app?.phase >= 2 && (
          <NavLink
            to={`/admin/phase2/${applicationId}`}
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
            to={`/admin/prephase3/${applicationId}`}
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
            to={`/admin/phase3/${applicationId}`}
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
            to={`/admin/phase4/${applicationId}`}
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

      <div className="prephase3-main">
        <p className="Confirmation-text">Confirmation</p>

        <div className="left-side-prephase3">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ setFieldValue, errors, resetForm }) => (
              <Form>
                <p className="prephase-3-text-left-check">
                  CONFIRMATION THAT THE COMPANY CAN HELP
                </p>

                <div className="checkbox-phase1">
                  <p className="yes-check-text">Yes</p>
                  <input
                    required
                    checked={isCompanyHelp}
                    name="phase3.doesCompanyHelp"
                    id="phase3.doesCompanyHelp"
                    onChange={(e) => {
                      setFieldValue("phase3.doesCompanyHelp", true);
                      setIsCompanyHelp(true);
                    }}
                    type="radio"
                    className="yes-check"
                  />
                  <p className="no-check-text">No</p>
                  <input
                    required
                    checked={!isCompanyHelp}
                    name="phase3.doesCompanyHelp"
                    id="phase3.doesCompanyHelp"
                    onChange={(e) => {
                      setFieldValue("phase3.doesCompanyHelp", false);
                      setIsCompanyHelp(false);
                    }}
                    type="radio"
                    className="no-check"
                  />
                </div>

                {isCompanyHelp && (
                  <>
                    <p className="prephase-3-text-left">
                      How CAN THE COMPANY HELP?
                    </p>
                    <Field
                      as="select"
                      placeholder="Select Type of Premission"
                      className="prephase-3-input"
                      name="phase3.companyHelpService"
                      id="phase3.companyHelpService"
                      required={isCompanyHelp}
                      onChange={(e) => {
                        setFieldValue(
                          "phase3.companyHelpService",
                          e.target.value
                        );
                        handleChangeSelect(e, setFieldValue);
                      }}
                    >
                      <option value="">Service</option>
                      <option value="Certificate of Sponsorship">
                        Certificate of Sponsorship
                      </option>
                      <option value="Certificate of Acceptance of Studies">
                        Certificate of Acceptance of Studies
                      </option>
                      <option value="Entry Clearance">Entry Clearance</option>
                      <option value="Leave to Remain">Leave to Remain</option>
                      <option value="Indefinite Leave to Remain">
                        Indefinite Leave to Remain
                      </option>
                      <option value="Naturalisation">Naturalisation</option>
                      <option value="EEUS Settlement">EEUS Settlement</option>
                      <option value="University Placement">
                        University Placement
                      </option>
                      <option value="Immigration Matter">
                        Immigration Matter
                      </option>
                      <option value="AN1 – Naturalisation">
                        AN1 – Naturalisation{" "}
                      </option>
                      <option value="MN1 – Registration">
                        MN1 – Registration{" "}
                      </option>
                      <option value="ILR – Indefinite Leave to Remain">
                        ILR – Indefinite Leave to Remain
                      </option>
                      <option value="FLR – Further Leave to Remain">
                        FLR – Further Leave to Remain{" "}
                      </option>
                      <option value="FLR(FP)">FLR(FP)</option>
                      <option value="FLR(M)">FLR(M) </option>
                      <option value="SW – Skilled Worker">
                        SW – Skilled Worker{" "}
                      </option>
                      <option value="SL- Sponsor Licence">
                        SL- Sponsor Licence{" "}
                      </option>
                      <option value="Student">Student </option>
                      <option value="Student Child">Student Child</option>
                      <option value="Graduate Visa">Graduate Visa</option>
                      <option value="ECS- Entry Clearance Spouse">
                        ECS- Entry Clearance Spouse{" "}
                      </option>
                      <option value="ECV – Entry Clearance Visitor">
                        ECV – Entry Clearance Visitor{" "}
                      </option>
                      <option value="ECD – Entry Clearance Dependant">
                        ECD – Entry Clearance Dependant{" "}
                      </option>
                      <option value="PS – Pre Settled Status">
                        PS – Pre Settled Status
                      </option>
                      <option value="SS – Settled Status">
                        SS – Settled Status{" "}
                      </option>
                      <option value="Others">Others </option>
                    </Field>
                    <p className="prephase-3-text-left">Application Type</p>
                    <Field
                      required={isCompanyHelp}
                      name="phase3.applicationType"
                      id="phase3.applicationType"
                      type="text"
                      className="prephase-3-input"
                      placeholder="APL1"
                    />
                    <p className="prephase-3-text-left">Cost</p>
                    <Field
                      required={isCompanyHelp}
                      name="phase3.cost"
                      id="phase3.cost"
                      type="number"
                      min={0}
                      className="prephase-3-input"
                      placeholder="Type cost"
                    />
                  </>
                )}

                {!isCompanyHelp && (
                  <>
                    <p className="prephase-3-text-left">Type Reason</p>
                    <Field
                       as="textarea"
                      required={!isCompanyHelp}
                      name="phase3.reason"
                      id="phase3.reason"
                      type="text"
                      style={{ height: "12rem", paddingTop: "13px" }}
                      className="prephase-3-input"
                      placeholder="Type Reason"
                    />
                  </>
                )}
                <button
                  ref={buttonRef}
                  disabled={isLoading}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  type="submit"
                  className="save-btn-pre"
                >
                  {isLoading ? <Loader /> : "Request"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Prephase3;
