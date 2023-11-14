import React, { useState, useEffect, useMemo, useContext, useRef } from "react";
import SideNavbar from "../SideNavbar";
import editpen from "../../assests/edit-pen.png";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import "../../style/phase3.css";
import pdfimg from "../../assests/pdf-img.png";
import Editimgapp from "../../assests/Edit-file-img.svg";
import Approvedimgapp from "../../assests/Approved-img.svg";
import Rejectimgapp from "../../assests/Delete-File-img.svg";
import {
  useApprovePhase3Mutation,
  useGetApplicationDataByIdQuery,
  usePostPhase3Mutation,
} from "../../services/api/applicationApi";
import { toastError, toastSuccess } from "../Toast";
import Loader from "../Loader";
import MainContext from "../Context/MainContext";

const AddPhase3 = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const {
    data,
    refetch,
    isLoading: isLoadingApplication,
  } = useGetApplicationDataByIdQuery(applicationId, {
    refetchOnMountOrArgChange: true,
  });
  const app = data?.application;
  console.log("Application data", app?.phase3);
  const [postPhase3, result] = usePostPhase3Mutation();
  const { isLoading, isSuccess, error } = result;
  useMemo(() => {
    if (error) {
      toastError(error?.data?.message);
    }
  }, [error]);

  useMemo(() => {
    if (isSuccess) {
      toastSuccess("Chalan Submitted Successfully.");
      setTimeout(() => {
        navigate(`/add/phase4/${applicationId}`);
      }, 1000);
    }
  }, [isSuccess]);

  const links = [
    { to: "/phase1", label: "Phase 1" },
    { to: "/prephase2", label: "Pre-Phase 2" },
    { to: "/phase2", label: "Phase 2" },
    { to: "/prephase3", label: "Pre-Phase 3" },
    { to: "/phase3", label: "Phase 3" },
    { to: "/phase4", label: "Phase 4" },

    // Add more links as needed
  ];

  const [activeLink, setActiveLink] = useState("/phase3");

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

  const handleChalanUpload = async () => {
    if(!chalan || chalan === ""){
      toastError("Please Upload Payment Evidence");
      return;
    }
    let formData = new FormData();
    formData.append("applicationId", applicationId);
    formData.append("chalan", chalan);
    await postPhase3({ formData: formData, applicationId: applicationId });
  };

      const chalanRef = useRef(null);
    const [chalan, setChalan] = useState("");
    const [fileName, setFileName] = useState("");
    console.log(chalan);

      const openFile = (e) => {
        if (e.target.files && e.target.files[0]) {
          let pdf = e.target.files[0];
          setFileName(pdf.name);
          setChalan(pdf);
        }
      };

  return (
    <div className="Phase-2-main-container">
      <SideNavbar />
      <h2 className="Pre-screening-text">Pre-Screening</h2>
      <div className="Buttons-preescreening">
        {/* <button className="Edit-appliction-btn">
            Edit <img src={Editimgapp} alt="" />
          </button> */}
      </div>
      <img src={editpen} alt="" className="edit-pen" />
      <button
        onClick={() => navigate(`/add/phase2/filled/${applicationId}`)}
        className="back-btn"
      >
        Back
      </button>

      <div className="phase-4-all-phase">
        {app?.phaseSubmittedByClient >= 1 && (
          <NavLink
            to={`/add/phase1/filled/${applicationId}`}
            className={`link-hover-effect ${
              activeLink === "/phase1" ? "link-active" : ""
            }`}
            onClick={() => handleLinkClick("/phase1")}
            style={{ width: "2.9rem" }}
          >
            <span className="routes-all">Phase 1</span>
          </NavLink>
        )}

        {app?.phaseSubmittedByClient >= 1 && (
          <NavLink
            to={`/add/phase2/${applicationId}`}
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
        {app?.phaseSubmittedByClient >= 2 && (
          <NavLink
            to={`/add/phase3/${applicationId}`}
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
        {app?.phaseSubmittedByClient > 2 && (
          <NavLink
            to={`/add/phase4/${applicationId}`}
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

      <div className="phase-3" style={{ paddingLeft: "1rem" }}>
        <input
          ref={chalanRef}
          type="file"
          id="passport"
          name="passport"
          accept=".pdf"
          onChange={(event) => openFile(event)}
          style={{ display: "none" }}
        />
        <p className="evidence-payement-text">Evidence of Payment*</p>
        <div>
          {app?.phase3?.isOnlinePayment ? (
            <div
              className="pdf-17"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span onClick={() => chalanRef.current.click()}>
                {app?.phase3?.onlinePaymentEvidence
                  ? app?.phase3?.onlinePaymentEvidence
                  : "Click here to open PDF"}
              </span>
              <Link
                to={
                  app?.phase3?.onlinePaymentEvidence
                    ? app?.phase3?.onlinePaymentEvidence
                    : "#"
                }
              >
                <img src={pdfimg} alt="" className="pdf-icon" />
              </Link>
            </div>
          ) : (
            <div
              className="pdf-17"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                onClick={() => chalanRef.current.click()}
                style={{ cursor: "pointer" }}
              >
                {fileName
                  ? fileName
                  : app?.phase3?.paymentEvidence
                  ? app?.phase3?.paymentEvidence?.split("/Uploads/")
                  : "Click here to open PDF"}
              </span>
              <Link
                to={
                  app?.phase3?.paymentEvidence
                    ? `${import.meta.env.VITE_IMG_URI}${
                        app?.phase3?.paymentEvidence
                      }`
                    : "#"
                }
                style={{ marginRight: "10px", marginTop: "5px" }}
              >
                <img src={pdfimg} alt="" className="pdf-icon" />
              </Link>
            </div>
          )}
          {!app?.phase3?.paymentEvidence && (
            <button
              disabled={isLoading}
              type="button"
              className="submit-email-btn-2"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                left: "3%",
                top: "18%",
                width: "28rem",
              }}
              onClick={handleChalanUpload}
            >
              {isLoading ? <Loader /> : "Submit"}
            </button>
          )}
        </div>

        {/* <button className="Download-btn-2">Download</button> */}
      </div>
    </div>
  );
};

export default AddPhase3;
