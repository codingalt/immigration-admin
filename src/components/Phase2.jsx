import React, { useState, useEffect, useMemo, useContext } from "react";
import editpen from "../assests/edit-pen.png";
import SideNavbar from "./SideNavbar";
import "../style/Phase2.css";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import "../style/Phase1.css";
import pdfimg from "../assests/pdf-img.png";
import Editimgapp from "../assests/Edit-file-img.svg";
import Approvedimgapp from "../assests/Approved-img.svg";
import Rejectimgapp from "../assests/Delete-File-img.svg";
import { useApprovePhase2Mutation, useGetApplicationDataByIdQuery } from "../services/api/applicationApi";
import { toastError, toastSuccess } from "./Toast";
import Loader from "./Loader";
import MainContext from "./Context/MainContext";
import RejectGroup from "./RejectGroup";
import Rejectpopup from "./Rejectpopup";

const Phase2 = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [isReject, setIsReject] = useState();
  const [companyId, setCompanyId] = useState();
  const {
    data,
    refetch,
    isLoading: isLoadingApplication,
  } = useGetApplicationDataByIdQuery(applicationId, {
    refetchOnMountOrArgChange: true,
  });
  const app = data?.application;
  console.log("Application data", app?.phase2);
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
  const [activeLink, setActiveLink] = useState("/phase2");
  const links = [
    { to: "/phase1", label: "Phase 1" },
    { to: "/prephase2", label: "Pre-Phase 2" },
    { to: "/phase2", label: "Phase 2" },
    { to: "/prephase3", label: "Pre-Phase 3" },
    { to: "/phase3", label: "Phase 3" },
    { to: "/phase4", label: "Phase 4" },

    // Add more links as needed
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

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  
  const [approvePhase2, result] = useApprovePhase2Mutation();
    const {
      isLoading: approveLoading,
      isSuccess: approveSuccess,
      error: approveErr,
    } = result;

    const handleApprove = async () => {
      await approvePhase2({ applicationId: applicationId });
    };


  useMemo(() => {
    if (approveErr) {
      toastError(approveErr?.data?.message);
    }
  }, [approveErr]);

  useMemo(() => {
    if (approveSuccess) {
      toastSuccess("Phase 2 Approved");
      handleLinkClick("/prephase3");
      navigate(`/admin/prephase3/${applicationId}`);
    }
  }, [approveSuccess]);

  const handleDeclineRequest = () => {
    if (app?.companyId) {
      setCompanyId(true);
    } else {
      setCompanyId(false);
    }
    setIsReject(true);
  };

  const [isPhase2Rejected, setIsPhase2Rejected] = useState(false);

  useEffect(() => {
    if (app?.phase === 1 && app?.phaseStatus === "rejected") {
      setIsPhase2Rejected(true);
    }
  }, [app]);

  console.log("isPhase2Rejected", isPhase2Rejected);

  return (
    <div className="Phase-2-main-container">
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
      <h2 className="Pre-screening-text">Pre-Screening</h2>
      <div className="Buttons-preescreening">
        {app?.requestedPhase < 3 &&
          app?.applicationStatus != "rejected" &&
          app?.phase2?.status != "approved" && (
            <>
              <button
                disabled={approveLoading}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
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
                style={{ cursor: "pointer" }}
                onClick={handleDeclineRequest}
                className="Reject-appliction-btn"
              >
                {" "}
                Reject <img src={Rejectimgapp} alt="" />
              </button>
            </>
          )}
      </div>
      <img src={editpen} alt="" className="edit-pen" />
      {/* 
      <button
        disabled={approveLoading}
        onClick={() => navigate(`/admin/prescreening/${applicationId}`)}
        className="back-btn"
      >
        Back
      </button> */}

      <div className="back-btn-container">
        <button
          className="back-btn1"
          disabled={approveLoading}
          onClick={() => navigate(`/admin/prescreening/${applicationId}`)}
        >
          Back
        </button>
        <p style={{ marginLeft: 20 }}>
          Note: Please check the application submitted data before taking any
          action
        </p>
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
        {app?.phaseSubmittedByClient >= 2 && app?.phaseStatus != "rejected" && (
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
      <div className="Phase-2">
        <div className="Phase-2-left">
          {app?.phase2?.passport && (
            <>
              <p className="password-text">PASSPORT*</p>
              <Link
                to={`${import.meta.env.VITE_IMG_URI}${app?.phase2?.passport}`}
                target="_blank"
              >
                <div className="pdf-input">
                  Click here to open PDF
                  <img src={pdfimg} alt="" className="pdf-icon" />
                </div>
              </Link>
            </>
          )}

          {app?.phase2?.dependantPassport && (
            <>
              <p className="password-text">National ID Card*</p>
              <Link
                to={`${import.meta.env.VITE_IMG_URI}${
                  app?.phase2?.dependantPassport
                }`}
                target="_blank"
              >
                <div className="pdf-input">
                  Click here to open PDF
                  <img src={pdfimg} alt="" className="pdf-icon" />
                </div>
              </Link>
            </>
          )}

          {app?.phase2?.utilityBill && (
            <>
              <p className="password-text">UTILITY BILL*</p>
              <Link
                to={`${import.meta.env.VITE_IMG_URI}${
                  app?.phase2?.utilityBill
                }`}
                target="_blank"
              >
                <div className="pdf-input">
                  Click here to open PDF
                  <img src={pdfimg} alt="" className="pdf-icon" />
                </div>
              </Link>
            </>
          )}

          {app?.phase2?.brp && (
            <>
              <p className="password-text">BRP*</p>
              <Link
                to={`${import.meta.env.VITE_IMG_URI}${app?.phase2?.brp}`}
                target="_blank"
              >
                <div className="pdf-input">
                  Click here to open PDF
                  <img src={pdfimg} alt="" className="pdf-icon" />
                </div>
              </Link>
            </>
          )}

          {app?.phase2?.previousVisaVignettes && (
            <>
              <p className="password-text">PREVIOUS VISA VIGNETTES</p>
              <Link
                to={`${import.meta.env.VITE_IMG_URI}${
                  app?.phase2?.previousVisaVignettes
                }`}
                target="_blank"
              >
                <div className="pdf-input">
                  Click here to open PDF
                  <img src={pdfimg} alt="" className="pdf-icon" />
                </div>
              </Link>
            </>
          )}

          {app?.phase2?.refusalLetter && (
            <>
              <p className="password-text">REFUSAL LETTER</p>
              <Link
                to={`${import.meta.env.VITE_IMG_URI}${
                  app?.phase2?.refusalLetter
                }`}
                target="_blank"
              >
                <div className="pdf-input">
                  Click here to open PDF
                  <img src={pdfimg} alt="" className="pdf-icon" />
                </div>
              </Link>
            </>
          )}
        </div>
        <div className="Phase-2-right" style={{ marginLeft: "0" }}>
          {app?.phase2?.educationCertificates && (
            <>
              <p className="password-text">EDUCATION CERTIFICATES*</p>
              <Link
                to={`${import.meta.env.VITE_IMG_URI}${
                  app?.phase2?.educationCertificates
                }`}
                target="_blank"
              >
                <div className="pdf-input">
                  Click here to open PDF
                  <img src={pdfimg} alt="" className="pdf-icon" />
                </div>
              </Link>
            </>
          )}

          {app?.phase2?.englishLanguageCertificate && (
            <>
              <p className="password-text">ENGLISH LANGUAGE CERTIFICATE*</p>
              <Link
                to={`${import.meta.env.VITE_IMG_URI}${
                  app?.phase2?.englishLanguageCertificate
                }`}
                target="_blank"
              >
                <div className="pdf-input">
                  Click here to open PDF
                  <img src={pdfimg} alt="" className="pdf-icon" />
                </div>
              </Link>
            </>
          )}

          {app?.phase2?.marriageCertificate && (
            <>
              <p className="password-text">MARRIAGE CERTIFICATE*</p>
              <Link
                to={`${import.meta.env.VITE_IMG_URI}${
                  app?.phase2?.marriageCertificate
                }`}
                target="_blank"
              >
                <div className="pdf-input">
                  Click here to open PDF
                  <img src={pdfimg} alt="" className="pdf-icon" />
                </div>
              </Link>
            </>
          )}

          {app?.phase2?.bankStatements && (
            <>
              <p className="password-text">BANK STATEMENTS*</p>
              <Link
                to={`${import.meta.env.VITE_IMG_URI}${
                  app?.phase2?.bankStatements
                }`}
                target="_blank"
              >
                <div className="pdf-input">
                  Click here to open PDF
                  <img src={pdfimg} alt="" className="pdf-icon" />
                </div>
              </Link>
            </>
          )}

          {app?.phase2?.other && app?.phase2?.other?.length > 0 && (
            <>
              <p className="password-text">
                {app?.phase2?.otherDocumentNotes}*
              </p>
              <Link
                to={`${import.meta.env.VITE_IMG_URI}${app?.phase2?.other}`}
                target="_blank"
              >
                <div className="pdf-input">
                  Click here to open PDF
                  <img src={pdfimg} alt="" className="pdf-icon" />
                </div>
              </Link>
            </>
          )}

          {/* <button className="Download-btn-phase-2">Download</button> */}
        </div>
      </div>
    </div>
  );
};

export default Phase2;
