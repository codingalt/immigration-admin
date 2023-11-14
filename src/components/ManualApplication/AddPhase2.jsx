import React, { useState, useEffect, useMemo, useContext, useRef } from "react";
import editpen from "../../assests/edit-pen.png";
import SideNavbar from "../SideNavbar";
import "../../style/Phase2.css";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import "../../style/Phase1.css";
import pdfimg from "../../assests/pdf-img.png";
import Approvedimgapp from "../../assests/Approved-img.svg";
import Rejectimgapp from "../../assests/Delete-File-img.svg";
import {
  useApprovePhase2Mutation,
  useGetApplicationDataByIdQuery,
  usePostPhase2Mutation,
} from "../../services/api/applicationApi";
import { toastError, toastSuccess } from "../Toast";
import Loader from "../Loader";
import MainContext from "../Context/MainContext";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Editimgapp from "../../assests/Edit-file-img.svg";
import tick from "../../assests/tick.png";
import cross from "../../assests/cross.png";

const AddPhase2 = () => {
  const { applicationId } = useParams();
  const [app, setApp] = useState();
  const [phase2,setPhase2] = useState();
  const navigate = useNavigate();
    const [isEditting, setIsEditting] = useState(true);
  const {
    data,
    refetch,
    isLoading: isLoadingApplication,
  } = useGetApplicationDataByIdQuery(applicationId);
  // const app = data?.application;
  // const phase2 = app?.phase2;

  useEffect(()=>{
    if(data){
      setApp(data?.application);
      setPhase2(data?.application?.phase2);
    }
  },[data])
  console.log("Application data", app?.phase2);

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

      const [postPhase2, result] = usePostPhase2Mutation();
      const { isLoading: isLoadingPostPhase, isSuccess, error } = result;

      useMemo(() => {
        if (error) {
          toastError(error?.data?.message);
        }
      }, [error]);

      useMemo(() => {
        if (isSuccess) {
          toastSuccess("Data Saved.")
        }
      }, [isSuccess]);

      const passportRef = useRef(null);
      const dependentPassportRef = useRef(null);
      const utilityBillRef = useRef(null);
      const brpRef = useRef(null);
      const previousVisaVignettesRef = useRef(null);
      const refusalLetterRef = useRef(null);
      const educationCertificatesRef = useRef(null);
      const englishLanguageCertificateRef = useRef(null);
      const marriageCertificateRef = useRef(null);
      const bankStatementsRef = useRef(null);
      const otherRef = useRef(null);

      console.log("phase 2",phase2);

      const initialValues = app && {
        passport: phase2?.passport ? phase2?.passport : "",
        dependantPassport: phase2?.dependantPassport
          ? phase2?.dependantPassport
          : "",
        utilityBill: phase2?.utilityBill ? phase2?.utilityBill : "",
        brp: phase2?.brp ? phase2?.brp : "",
        previousVisaVignettes: phase2?.previousVisaVignettes
          ? phase2?.previousVisaVignettes
          : "",
        refusalLetter: phase2?.refusalLetter ? phase2?.refusalLetter : "",
        educationCertificates: phase2?.educationCertificates
          ? phase2?.educationCertificates
          : "",
        englishLanguageCertificate: phase2?.englishLanguageCertificate
          ? phase2?.englishLanguageCertificate
          : "",
        marriageCertificate: phase2?.marriageCertificate
          ? phase2?.marriageCertificate
          : "",
        bankStatements: phase2?.bankStatements ? phase2?.bankStatements : "",
        other: phase2?.other ? phase2?.other : "",
      };

      const handleSubmit = async (values, { resetForm }) => {
        let formData = new FormData();
        formData.append("applicationId", app?._id);
        formData.append("passport", values.passport);
        formData.append("dependantPassport", values.dependantPassport);
        formData.append("utilityBill", values.utilityBill);
        formData.append("brp", values.brp);
        formData.append("previousVisaVignettes", values.previousVisaVignettes);
        formData.append("refusalLetter", values.refusalLetter);
        formData.append("educationCertificates", values.educationCertificates);
        formData.append(
          "englishLanguageCertificate",
          values.englishLanguageCertificate
        );
        formData.append("marriageCertificate", values.marriageCertificate);
        formData.append("bankStatements", values.bankStatements);
        formData.append("other", values.other);

        if (!app || !app._id) {
          console.error(
            "Invalid application object or application._id is missing"
          );
          return;
        }
        try {
          const {data} = await postPhase2(formData);
          console.log("res data",data);
          if (data.success) {
            navigate(`/add/phase3/${data?.application?._id}`);
          }
          resetForm({
            values: initialValues,
          });
        
        } catch (error) {
          console.error(error);
        }
      };

      const openFile = (e, setFieldValue) => {
        if (e.target.files && e.target.files[0]) {
          let pdf = e.target.files[0];
          console.log(pdf);
          setFieldValue(e.target.name, pdf);
        }
      };


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

    const buttonRef = useRef();

  return (
    <div className="Phase-2-main-container">
      <SideNavbar />
      <h2 className="Pre-screening-text">Pre-Screening</h2>
      <div className="Buttons-preescreening">
       
      </div>
      <img src={editpen} alt="" className="edit-pen" />

      <button
        onClick={() => navigate(`/add/phase1/filled/${applicationId}`)}
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

      <div className="Phase-2">
        {app && (
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ setFieldValue, errors, values, touched }) => (
              <Form
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "1rem",
                }}
              >
                <div className="left-side-forget-password-2">
                  <p className="Required-data-text">Required Data*</p>

                  {app?.phase2?.passport != "notreq" && (
                    <>
                      <input
                        ref={passportRef}
                        type="file"
                        id="passport"
                        name="passport"
                        accept=".pdf"
                        onChange={(event) => openFile(event, setFieldValue)}
                        style={{ display: "none" }}
                      />
                      <p className="password-text">PASSPORT*</p>

                      <div
                        className="pdf-input"
                        style={
                          errors.passport &&
                          touched.passport && { border: "1px solid red" }
                        }
                      >
                        <span onClick={() => passportRef.current.click()}>
                          {app?.phase2?.passport?.includes("/Uploads")
                            ? `${app?.phase2?.passport?.split("/Uploads/")}`
                            : values.passport
                            ? values.passport.name
                            : "Click here to open PDF"}
                        </span>
                        <NavLink
                          to={
                            app?.phase2?.passport?.includes("/Uploads")
                              ? `${import.meta.env.VITE_IMG_URI}${
                                  app?.phase2?.passport
                                }`
                              : "#"
                          }
                        >
                          <img src={pdfimg} alt="" className="pdf-icon" />
                        </NavLink>
                      </div>
                    </>
                  )}

                  {app?.phase2?.dependantPassport != "notreq" && (
                    <>
                      <p className="password-text">DEPENDANT PASSPORT*</p>
                      <input
                        ref={dependentPassportRef}
                        type="file"
                        id="dependantPassport"
                        name="dependantPassport"
                        accept=".pdf"
                        onChange={(event) => openFile(event, setFieldValue)}
                        style={{ display: "none" }}
                      />
                      <div
                        className="pdf-input"
                        style={
                          errors.dependantPassport &&
                          touched.dependantPassport && {
                            border: "1px solid red",
                          }
                        }
                      >
                        <span
                          onClick={() => dependentPassportRef.current.click()}
                        >
                          {app?.phase2?.dependantPassport?.includes("/Uploads")
                            ? `${app?.phase2?.dependantPassport?.split(
                                "/Uploads/"
                              )}`
                            : values.dependantPassport
                            ? values.dependantPassport.name
                            : "Click here to open PDF"}
                        </span>
                        <NavLink
                          to={
                            app?.phase2?.dependantPassport?.includes("/Uploads")
                              ? `${import.meta.env.VITE_IMG_URI}${
                                  app?.phase2?.dependantPassport
                                }`
                              : "#"
                          }
                        >
                          <img src={pdfimg} alt="" className="pdf-icon" />
                        </NavLink>
                      </div>
                    </>
                  )}

                  {app?.phase2?.utilityBill != "notreq" && (
                    <>
                      <p className="password-text">UTILITY BILL*</p>
                      <input
                        ref={utilityBillRef}
                        type="file"
                        id="utilityBill"
                        name="utilityBill"
                        accept=".pdf"
                        onChange={(event) => openFile(event, setFieldValue)}
                        style={{ display: "none" }}
                      />
                      <div
                        className="pdf-input"
                        style={
                          errors.utilityBill &&
                          touched.utilityBill && { border: "1px solid red" }
                        }
                      >
                        <span onClick={() => utilityBillRef.current.click()}>
                          {app?.phase2?.utilityBill?.includes("/Uploads")
                            ? `${app?.phase2?.utilityBill?.split(
                                "/Uploads/"
                              )}`
                            : values.utilityBill
                            ? values.utilityBill.name
                            : "Click here to open PDF"}
                        </span>
                        <NavLink
                          to={
                            app?.phase2?.utilityBill?.includes("/Uploads")
                              ? `${import.meta.env.VITE_IMG_URI}${
                                  app?.phase2?.utilityBill
                                }`
                              : "#"
                          }
                        >
                          <img src={pdfimg} alt="" className="pdf-icon" />
                        </NavLink>
                      </div>
                    </>
                  )}

                  {app?.phase2?.brp != "notreq" && (
                    <>
                      <p className="password-text">BRP*</p>
                      <input
                        ref={brpRef}
                        type="file"
                        id="brp"
                        name="brp"
                        accept=".pdf"
                        onChange={(event) => openFile(event, setFieldValue)}
                        style={{ display: "none" }}
                      />
                      <div
                        className="pdf-input"
                        style={
                          errors.brp &&
                          touched.brp && { border: "1px solid red" }
                        }
                      >
                        <span onClick={() => brpRef.current.click()}>
                          {app?.phase2?.brp?.includes("/Uploads")
                            ? `${app?.phase2?.brp?.split("/Uploads/")}`
                            : values.brp
                            ? values.brp.name
                            : "Click here to open PDF"}
                        </span>
                        <NavLink
                          to={
                            app?.phase2?.brp?.includes("/Uploads")
                              ? `${import.meta.env.VITE_IMG_URI}${
                                  app?.phase2?.brp
                                }`
                              : "#"
                          }
                        >
                          <img src={pdfimg} alt="" className="pdf-icon" />
                        </NavLink>
                      </div>
                    </>
                  )}

                  {app?.phase2?.previousVisaVignettes != "notreq" && (
                    <>
                      <p className="password-text">PREVIOUS VISA VIGNETTES</p>
                      <input
                        ref={previousVisaVignettesRef}
                        type="file"
                        id="previousVisaVignettes"
                        name="previousVisaVignettes"
                        accept=".pdf"
                        onChange={(event) => openFile(event, setFieldValue)}
                        style={{ display: "none" }}
                      />
                      <div
                        className="pdf-input"
                        style={
                          errors.previousVisaVignettes &&
                          touched.previousVisaVignettes && {
                            border: "1px solid red",
                          }
                        }
                      >
                        <span
                          onClick={() =>
                            previousVisaVignettesRef.current.click()
                          }
                        >
                          {app?.phase2?.previousVisaVignettes?.includes(
                            "/Uploads"
                          )
                            ? `${app?.phase2?.previousVisaVignettes?.split(
                                "/Uploads/"
                              )}`
                            : values.previousVisaVignettes
                            ? values.previousVisaVignettes.name
                            : "Click here to open PDF"}
                        </span>
                        <NavLink
                          to={
                            app?.phase2?.previousVisaVignettes?.includes(
                              "/Uploads"
                            )
                              ? `${import.meta.env.VITE_IMG_URI}${
                                  app?.phase2?.previousVisaVignettes
                                }`
                              : "#"
                          }
                        >
                          <img src={pdfimg} alt="" className="pdf-icon" />
                        </NavLink>
                      </div>
                    </>
                  )}

                  {app?.phase2?.refusalLetter != "notreq" && (
                    <>
                      <p className="password-text">REFUSAL LETTER</p>
                      <input
                        ref={refusalLetterRef}
                        type="file"
                        id="refusalLetter"
                        name="refusalLetter"
                        accept=".pdf"
                        onChange={(event) => openFile(event, setFieldValue)}
                        style={{ display: "none" }}
                      />
                      <div
                        className="pdf-input"
                        style={
                          errors.refusalLetter &&
                          touched.refusalLetter && {
                            border: "1px solid red",
                          }
                        }
                      >
                        <span onClick={() => refusalLetterRef.current.click()}>
                          {app?.phase2?.refusalLetter?.includes("/Uploads")
                            ? `${app?.phase2?.refusalLetter?.split(
                                "/Uploads/"
                              )}`
                            : values.refusalLetter
                            ? values.refusalLetter.name
                            : "Click here to open PDF"}
                        </span>
                        <NavLink
                          to={
                            app?.phase2?.refusalLetter?.includes("/Uploads")
                              ? `${import.meta.env.VITE_IMG_URI}${
                                  app?.phase2?.refusalLetter
                                }`
                              : "#"
                          }
                        >
                          <img src={pdfimg} alt="" className="pdf-icon" />
                        </NavLink>
                      </div>
                    </>
                  )}
                </div>

                <div className="right-side-phase2">
                  {app?.phase2?.educationCertificates != "notreq" && (
                    <>
                      <p className="password-text">EDUCATION CERTIFICATES*</p>
                      <input
                        ref={educationCertificatesRef}
                        type="file"
                        id="educationCertificates"
                        name="educationCertificates"
                        accept=".pdf"
                        onChange={(event) => openFile(event, setFieldValue)}
                        style={{ display: "none" }}
                      />
                      <div
                        className="pdf-input"
                        style={
                          errors.educationCertificates &&
                          touched.educationCertificates && {
                            border: "1px solid red",
                          }
                        }
                      >
                        <span
                          onClick={() =>
                            educationCertificatesRef.current.click()
                          }
                        >
                          {app?.phase2?.educationCertificates?.includes(
                            "/Uploads"
                          )
                            ? `${app?.phase2?.educationCertificates?.split(
                                "/Uploads/"
                              )}`
                            : values.educationCertificates
                            ? values.educationCertificates.name
                            : "Click here to open PDF"}
                        </span>
                        <NavLink
                          to={
                            app?.phase2?.educationCertificates?.includes(
                              "/Uploads"
                            )
                              ? `${import.meta.env.VITE_IMG_URI}${
                                  app?.phase2?.educationCertificates
                                }`
                              : "#"
                          }
                        >
                          <img src={pdfimg} alt="" className="pdf-icon" />
                        </NavLink>
                      </div>
                    </>
                  )}

                  {app?.phase2?.englishLanguageCertificate != "notreq" && (
                    <>
                      <p className="password-text">
                        ENGLISH LANGUAGE CERTIFICATE*
                      </p>
                      <input
                        ref={englishLanguageCertificateRef}
                        type="file"
                        id="englishLanguageCertificate"
                        name="englishLanguageCertificate"
                        accept=".pdf"
                        onChange={(event) => openFile(event, setFieldValue)}
                        style={{ display: "none" }}
                      />
                      <div
                        className="pdf-input"
                        style={
                          errors.englishLanguageCertificate &&
                          touched.englishLanguageCertificate && {
                            border: "1px solid red",
                          }
                        }
                      >
                        <span
                          onClick={() =>
                            englishLanguageCertificateRef.current.click()
                          }
                        >
                          {app?.phase2?.englishLanguageCertificate?.includes(
                            "/Uploads"
                          )
                            ? `${app?.phase2?.englishLanguageCertificate?.split(
                                "/Uploads/"
                              )}`
                            : values.englishLanguageCertificate
                            ? values.englishLanguageCertificate.name
                            : "Click here to open PDF"}
                        </span>
                        <NavLink
                          to={
                            app?.phase2?.educationCertificates?.includes(
                              "/Uploads"
                            )
                              ? `${import.meta.env.VITE_IMG_URI}${
                                  app?.phase2?.educationCertificates
                                }`
                              : "#"
                          }
                        >
                          <img src={pdfimg} alt="" className="pdf-icon" />
                        </NavLink>
                      </div>
                    </>
                  )}

                  {app?.phase2?.marriageCertificate != "notreq" && (
                    <>
                      <p className="password-text">MARRIAGE CERTIFICATE*</p>
                      <input
                        ref={marriageCertificateRef}
                        type="file"
                        id="marriageCertificate"
                        name="marriageCertificate"
                        accept=".pdf"
                        onChange={(event) => openFile(event, setFieldValue)}
                        style={{ display: "none" }}
                      />
                      <div
                        className="pdf-input"
                        style={
                          errors.marriageCertificate &&
                          touched.marriageCertificate && {
                            border: "1px solid red",
                          }
                        }
                      >
                        <span
                          onClick={() => marriageCertificateRef.current.click()}
                        >
                          {app?.phase2?.marriageCertificate?.includes(
                            "/Uploads"
                          )
                            ? `${app?.phase2?.marriageCertificate?.split(
                                "/Uploads/"
                              )}`
                            : values.marriageCertificate
                            ? values.marriageCertificate.name
                            : "Click here to open PDF"}
                        </span>
                        <NavLink
                          to={
                            app?.phase2?.marriageCertificate?.includes(
                              "/Uploads"
                            )
                              ? `${import.meta.env.VITE_IMG_URI}${
                                  app?.phase2?.marriageCertificate
                                }`
                              : "#"
                          }
                        >
                          <img src={pdfimg} alt="" className="pdf-icon" />
                        </NavLink>
                      </div>
                    </>
                  )}

                  {app?.phase2?.bankStatements != "notreq" && (
                    <>
                      <p className="password-text">BANK STATEMENTS*</p>
                      <input
                        ref={bankStatementsRef}
                        type="file"
                        id="bankStatements"
                        name="bankStatements"
                        accept=".pdf"
                        onChange={(event) => openFile(event, setFieldValue)}
                        style={{ display: "none" }}
                      />
                      <div
                        className="pdf-input"
                        style={
                          errors.bankStatements &&
                          touched.bankStatements && {
                            border: "1px solid red",
                          }
                        }
                      >
                        <span onClick={() => bankStatementsRef.current.click()}>
                          {app?.phase2?.bankStatements?.includes("/Uploads")
                            ? `${app?.phase2?.bankStatements?.split(
                                "/Uploads/"
                              )}`
                            : values.bankStatements
                            ? values.bankStatements.name
                            : "Click here to open PDF"}
                        </span>
                        <NavLink
                          to={
                            app?.phase2?.bankStatements?.includes("/Uploads")
                              ? `${import.meta.env.VITE_IMG_URI}${
                                  app?.phase2?.bankStatements
                                }`
                              : "#"
                          }
                        >
                          <img src={pdfimg} alt="" className="pdf-icon" />
                        </NavLink>
                      </div>
                    </>
                  )}

                  {app?.phase2?.other != "notreq" && (
                    <>
                      <p className="password-text">OTHER</p>
                      <input
                        ref={otherRef}
                        type="file"
                        id="other"
                        name="other"
                        accept=".pdf"
                        onChange={(event) => openFile(event, setFieldValue)}
                        style={{ display: "none" }}
                        multiple
                      />
                      <div
                        className="pdf-input"
                        style={
                          errors.other &&
                          touched.other && { border: "1px solid red" }
                        }
                      >
                        <span onClick={() => otherRef.current.click()}>
                          {app?.phase2?.other?.includes("/Uploads")
                            ? `${app?.phase2?.other?.split("/Uploads/")}`
                            : values.other.length > 0
                            ? values.other.name
                            : "Click here to open PDF"}
                        </span>
                        <NavLink
                          to={
                            app?.phase2?.other?.includes("/Uploads")
                              ? `${import.meta.env.VITE_IMG_URI}${
                                  app?.phase2?.other
                                }`
                              : "#"
                          }
                        >
                          <img src={pdfimg} alt="" className="pdf-icon" />
                        </NavLink>
                      </div>
                    </>
                  )}

                  <button
                    ref={buttonRef}
                    disabled={isLoadingPostPhase}
                    type="submit"
                    className="submit-email-btn-2"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {isLoadingPostPhase ? <Loader /> : "Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}

        {/* <div className="Phase-2-left">
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
          

       
              <p className="password-text">DEPENDANT PASSPORT*</p>
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
           
        </div>
        <div className="Phase-2-right">
  
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
        

              <p className="password-text">OTHER</p>
              <Link
                to={`${import.meta.env.VITE_IMG_URI}${app?.phase2?.other}`}
                target="_blank"
              >
                <div className="pdf-input">
                  Click here to open PDF
                  <img src={pdfimg} alt="" className="pdf-icon" />
                </div>
              </Link>
     

        </div> */}
      </div>
    </div>
  );
};

export default AddPhase2;
