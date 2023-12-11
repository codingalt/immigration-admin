import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import SideNavbar from "./SideNavbar";
import editpen from "../assests/edit-pen.png";
import "../style/Phase1.css";
import "../style/prephase2.css";
import Editimgapp from "../assests/Edit-file-img.svg";
import Approvedimgapp from "../assests/Approved-img.svg";
import Rejectimgapp from "../assests/Delete-File-img.svg";
import { useGetApplicationDataByIdQuery, useReRequestPhase1Mutation, useRequestAPhaseMutation } from "../services/api/applicationApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toastError, toastSuccess } from "./Toast";
import Loader from "./Loader";
import MainContext from "./Context/MainContext";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";

const Prephase2 = () => {
  const navigate = useNavigate();
  const { applicationId } = useParams();
  const {
    data,
    refetch,
    isLoading: isLoadingApplication,
  } = useGetApplicationDataByIdQuery(applicationId, {
    refetchOnMountOrArgChange: true,
  });
  const app = data?.application;
  // console.log("Application data", app?.phase2);
  const [activeLink, setActiveLink] = useState("/prephase2");
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

  // Re Request Phase 1
  const [reRequestPhase1, resp] = useReRequestPhase1Mutation();
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

  const [requestAPhase, res] = useRequestAPhaseMutation();
  const { isLoading, isSuccess, error } = res;

  useMemo(() => {
    if (error) {
      toastError(error?.data?.message);
    }
  }, [error]);

  useMemo(() => {
    if (isSuccess) {
      if(app?.phase === 2 && app?.phaseStatus === "rejected"){
        socket.emit("phase notification", {
          userId: app?.userId,
          applicationId: applicationId,
          phase: 2,
          phaseStatus: "pending",
          phaseSubmittedByClient: 2,
          reSubmit: 2,
        });
      }else{
        socket.emit("phase notification", {
          userId: app?.userId,
          applicationId: applicationId,
          phase: 1,
          phaseStatus: "approved",
          phaseSubmittedByClient: app?.phaseSubmittedByClient,
        });
      }
      
      toastSuccess("Phase 2 Requested");
      navigate(`/admin/prescreening/${applicationId}`);
    }
  }, [isSuccess]);

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

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const initialValues = {
    phase2: {
      passport: "",
      dependantPassport:
         "",
      utilityBill:
         "",
      brp: "",
      previousVisaVignettes:
        "",
      refusalLetter:
         "",
      educationCertificates:
        "",
      englishLanguageCertificate:
         "",
      marriageCertificate:
        "",
      bankStatements:
      "",
      other: [" "],
      otherDocumentNotes:
        "",
    },
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log("submitted ---", values);
    const { otherDocumentNotes, ...phase2Values } = values.phase2;

    if (Object.values(phase2Values).some((value) => value !== "notreq")) {
      await requestAPhase({ data: values, applicationId: applicationId });
      resetForm({
        values: initialValues,
      });
    } else {
      toastError("Please Select atleast one of the following.");
    }
  };

  const [isPhase2Rejected, setIsPhase2Rejected] = useState(false);

  useEffect(()=>{
    if(app?.phase === 1 && app?.phaseStatus === "rejected") {
      setIsPhase2Rejected(true);
    }
  },[app]);


  const handleReRequest = async () => {
    const { data: resp } = await reRequestPhase1(applicationId);
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
    <div className="Pre-phase-2-container">
      <SideNavbar />
      <h2 className="Pre-screening-text">Pre-Screening</h2>
      <img src={editpen} alt="" className="edit-pen" />
      {/* <div className="Buttons-preescreening">
        <button className="Edit-appliction-btn">
          Edit <img src={Editimgapp} alt="" />
        </button>
        <button className="Approved-appliction-btn">
          Approved <img src={Approvedimgapp} alt="" />
        </button>
        <button className="Reject-appliction-btn">
          {" "}
          Reject <img src={Rejectimgapp} alt="" />
        </button>
      </div> */}
      <button onClick={() => navigate(-1)} className="back-btn">
        Back
      </button>

      <div className="Buttons-preescreening">
        {app?.phase2?.status === "rejected" && (
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
        {app?.phaseSubmittedByClient >= 2 && (
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

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, errors, resetForm }) => (
          <Form style={{ display: "flex", justifyContent: "center" }}>
            <div className="pre-phase-2-div">
              <p className="Required-document-text">
                Required Documents (PDF ONLY)*
              </p>

              <div className="checkboxes-all">
                <p className="prephase-2-text"> Passport </p>
                <input
                  value="notreq"
                  name="phase2.passport"
                  id="phase2.passport"
                  type="checkbox"
                  className="checks-prephase-2"
                  defaultChecked={
                    initialValues.phase2.passport === "" ||
                    initialValues.phase2.passport.includes("/Uploads")
                  }
                  onChange={(e) => {
                    const value = e.target.checked ? "" : "notreq";
                    setFieldValue("phase2.passport", value);
                  }}
                />
                <p className="prephase-2-text"> DEPENDANT PASSPORT </p>
                <input
                  value="notreq"
                  name="phase2.dependantPassport"
                  id="phase2.dependantPassport"
                  type="checkbox"
                  className="checks-prephase-2"
                  defaultChecked={
                    initialValues.phase2.dependantPassport === "" ||
                    initialValues.phase2.dependantPassport.includes("/Uploads")
                  }
                  onChange={(e) => {
                    const value = e.target.checked ? "" : "notreq";
                    setFieldValue("phase2.dependantPassport", value);
                  }}
                />

                <p className="prephase-2-text"> UTILITY BILL </p>
                <input
                  value="notreq"
                  name="phase2.utilityBill"
                  id="phase2.utilityBill"
                  type="checkbox"
                  className="checks-prephase-2"
                  defaultChecked={
                    initialValues.phase2.utilityBill === "" ||
                    initialValues.phase2.utilityBill.includes("/Uploads")
                  }
                  onChange={(e) => {
                    const value = e.target.checked ? "" : "notreq";
                    setFieldValue("phase2.utilityBill", value);
                  }}
                />
                <p className="prephase-2-text"> BRP </p>
                <input
                  value="notreq"
                  name="phase2.brp"
                  id="phase2.brp"
                  type="checkbox"
                  className="checks-prephase-2"
                  defaultChecked={
                    initialValues.phase2.brp === "" ||
                    initialValues.phase2.brp.includes("/Uploads")
                  }
                  onChange={(e) => {
                    const value = e.target.checked ? "" : "notreq";
                    setFieldValue("phase2.brp", value);
                  }}
                />

                <p className="prephase-2-text"> PREVIOUS VISA VIGNETTES </p>
                <input
                  value="notreq"
                  name="phase2.previousVisaVignettes"
                  id="phase2.previousVisaVignettes"
                  type="checkbox"
                  className="checks-prephase-2"
                  defaultChecked={
                    initialValues.phase2.previousVisaVignettes === "" ||
                    initialValues.phase2.previousVisaVignettes.includes(
                      "/Uploads"
                    )
                  }
                  onChange={(e) => {
                    const value = e.target.checked ? "" : "notreq";
                    setFieldValue("phase2.previousVisaVignettes", value);
                  }}
                />
                <p className="prephase-2-text"> REFUSAL LETTER </p>
                <input
                  value="notreq"
                  name="phase2.refusalLetter"
                  id="phase2.refusalLetter"
                  type="checkbox"
                  className="checks-prephase-2"
                  defaultChecked={
                    initialValues.phase2.refusalLetter === "" ||
                    initialValues.phase2.refusalLetter.includes("/Uploads")
                  }
                  onChange={(e) => {
                    const value = e.target.checked ? "" : "notreq";
                    setFieldValue("phase2.refusalLetter", value);
                  }}
                />
                <p className="prephase-2-text"> EDUCATION CERTIFICATES </p>
                <input
                  value="notreq"
                  name="phase2.educationCertificates"
                  id="phase2.educationCertificates"
                  type="checkbox"
                  className="checks-prephase-2"
                  defaultChecked={
                    initialValues.phase2.educationCertificates === "" ||
                    initialValues.phase2.educationCertificates.includes(
                      "/Uploads"
                    )
                  }
                  onChange={(e) => {
                    const value = e.target.checked ? "" : "notreq";
                    setFieldValue("phase2.educationCertificates", value);
                  }}
                />
                <p className="prephase-2-text">
                  {" "}
                  ENGLISH LANGUAGE CERTIFICATE{" "}
                </p>
                <input
                  value="notreq"
                  name="phase2.englishLanguageCertificate"
                  id="phase2.englishLanguageCertificate"
                  type="checkbox"
                  className="checks-prephase-2"
                  defaultChecked={
                    initialValues.phase2.englishLanguageCertificate === "" ||
                    initialValues.phase2.englishLanguageCertificate.includes(
                      "/Uploads"
                    )
                  }
                  onChange={(e) => {
                    const value = e.target.checked ? "" : "notreq";
                    setFieldValue("phase2.englishLanguageCertificate", value);
                  }}
                />
                <p className="prephase-2-text"> MARRIAGE CERTIFICATE </p>
                <input
                  value="notreq"
                  name="phase2.marriageCertificate"
                  id="phase2.marriageCertificate"
                  type="checkbox"
                  className="checks-prephase-2"
                  defaultChecked={
                    initialValues.phase2.marriageCertificate === "" ||
                    initialValues.phase2.marriageCertificate.includes(
                      "/Uploads"
                    )
                  }
                  onChange={(e) => {
                    const value = e.target.checked ? "" : "notreq";
                    setFieldValue("phase2.marriageCertificate", value);
                  }}
                />
                <p className="prephase-2-text"> BANK STATEMENTS </p>
                <input
                  value="notreq"
                  name="phase2.bankStatements"
                  id="phase2.bankStatements"
                  type="checkbox"
                  className="checks-prephase-2"
                  defaultChecked={
                    initialValues.phase2.bankStatements === "" ||
                    initialValues.phase2.bankStatements.includes("/Uploads")
                  }
                  onChange={(e) => {
                    const value = e.target.checked ? "" : "notreq";
                    setFieldValue("phase2.bankStatements", value);
                  }}
                />
              </div>

              <div className="right side">
                <p className="Other">
                  {" "}
                  <input
                    value={["notreq"]}
                    name="phase2.other"
                    id="phase2.other"
                    type="checkbox"
                    defaultChecked={true}
                    onChange={(e) => {
                      setFieldValue("phase2.other", ["notreq"]);
                    }}
                  />{" "}
                  OTHER{" "}
                </p>

                <Field
                  className="pre-phase-input"
                  type="text"
                  name="phase2.otherDocumentNotes"
                  id="phase2.otherDocumentNotes"
                  placeholder="Document"
                />
                <button
                  ref={buttonRef}
                  disabled={isLoading}
                  type="submit"
                  className="req-btn"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isLoading ? <Loader /> : "Request"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Prephase2;
