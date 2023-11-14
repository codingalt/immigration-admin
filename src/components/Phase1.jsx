import React, { useState, useEffect, useRef, useContext, useMemo } from 'react';
import SideNavbar from './SideNavbar'
import "../style/Phase1.css"
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Editimgapp from "../assests/Edit-file-img.svg"
import Approvedimgapp from "../assests/Approved-img.svg"
import Rejectimgapp from "../assests/Delete-File-img.svg"
import { useApprovePhase1Mutation, useGetApplicationDataByIdQuery, usePostPhase1Mutation, useUpdatePhaseByAdminMutation } from '../services/api/applicationApi';
import MainContext from './Context/MainContext';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { phase1Schema } from "../utils/ValidationSchema";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Loader from "./Loader";
import SelectCountry from "./SelectCountry";
import LanguageList from "./LanguageList";
import { format } from 'date-fns';
import { toastError, toastSuccess } from './Toast';
import tick from "../assests/tick.png"
import cross from "../assests/cross.png";

const Phase1 = () => {
    const { socket } = useContext(MainContext);
    const {applicationId} = useParams();
    const navigate = useNavigate();

    const [approvePhase1, result] = useApprovePhase1Mutation();
    const {isLoading, error, isSuccess} = result

    const {
      data,
      refetch,
      isLoading: isLoadingApplication,
    } = useGetApplicationDataByIdQuery(applicationId, {
      refetchOnMountOrArgChange: true,
    });
    const app = data?.application;
    console.log("Application data", app);

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

    const [contact,setContact] = useState(app?.phase1?.contact)
    const [activeLink, setActiveLink] = useState("/phase1");
    const [isEditting, setIsEditting] = useState(true);

    const { user, applicationType } = useSelector((state) => state.user);
    const [permissionInCountryErr, setPermissionInCountryErr] = useState(
      app?.phase1?.permissionInCountry
    );
    const [speakEnglishErr, setSpeakEnglishErr] = useState(
      app?.phase1?.speakEnglish
    );
    const [refusedVisaErr, setRefusedVisaErr] = useState(
      app?.phase1?.isRefusedVisaEntry
    );
    const [languagesArr, setLanguagesArr] = useState(app?.phase1?.otherLanguagesSpeak);
    const languageRef = useRef();
    const [updatePhaseByAdmin, res] = useUpdatePhaseByAdminMutation();
    const {isSuccess: updateSuccess, error: updateErr,isLoading: isLoadingUpdate} = res;
    const { isLoading: approveLoading, isSuccess: approveSuccess, error: approveErr } = result;

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
        navigate(`/admin/prephase2/${applicationId}`);
      }
    }, [approveSuccess]);

    const initialValues = app && {
      userId: app && app?.userId,
      phase1: {
        applicationType: app && app?.phase1.applicationType,
        name: app && app?.phase1?.name,
        email: app && app?.phase1?.email,
        contact: app?.phase1?.contact,
        birthDate:
          app && format(new Date(app?.phase1?.birthDate), "yyyy-MM-dd"),
        country: app && app?.phase1?.country,
        sameResidence: app && app?.phase1?.sameResidence,
        permissionInCountry: app && app?.phase1?.permissionInCountry,
        speakEnglish: app && app?.phase1?.speakEnglish,
        proficiency: app && app?.phase1?.proficiency,
        otherLanguagesSpeak: app && languagesArr,
        isRefusedVisaEntry: app && app?.phase1?.isRefusedVisaEntry,
        refusedVisaType: app && app?.phase1?.refusedVisaType,
        refusedVisaDate:
          app && format(new Date(app?.phase1?.refusedVisaDate), "yyyy-MM-dd"),
        refusedVisaReason: app && app?.phase1?.refusedVisaReason,
        message: app && app?.phase1?.message,
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

    const handleSubmit = async (values, { resetForm }) => {
      console.log(values);
      const { data } = await updatePhaseByAdmin({data: values?.phase1, applicationId: applicationId, phase: 1});
      console.log(data);
    };

    const handleRemove = (value) => {
      if (languagesArr.includes(value)) {
        const tempArr = [...languagesArr];
        const filteredArray = tempArr.filter((item) => item !== value);
        setLanguagesArr(filteredArray);
      }
    };

    const handleApprove = async()=>{
        await approvePhase1({ applicationId: applicationId });
    }

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
        console.log(currentPath);

        // Find the matching label from the links array based on the current path
        const matchedLink = links.find((link) => link.to === currentPath);

        if (matchedLink) {
            setActiveLink(matchedLink.label);
        }
    }, [links]);

    const buttonRef = useRef();

    
    return (
      <div className="Phase-1-main-container">
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

          {app?.requestedPhase < 2 && app?.applicationStatus != "rejected" && (
            <>
              <button
                disabled={approveLoading}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
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
                onClick={() => navigate(`/admin/reject/${applicationId}`)}
                className="Reject-appliction-btn"
              >
                {" "}
                Reject <img src={Rejectimgapp} alt="" />
              </button>
            </>
          )}
        </div>
        <button
          onClick={() => navigate(`/admin/prescreening/${applicationId}`)}
          className="back-btn"
          disabled={approveLoading}
        >
          Back
        </button>

        <div className="phase-4-all-phase">
          {app?.phaseSubmittedByClient >= 1 && (
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
          {app?.phase >= 1 && app?.phaseStatus === "approved" && (
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
          {app?.phase >= 2 && app?.phaseStatus === "approved" && (
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
          {app?.phaseSubmittedByClient >= 3 && (
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

        {app && (
          <div className="phase-1">
            <Formik
              validationSchema={phase1Schema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, errors, resetForm }) => (
                <Form style={{ display: "flex", justifyContent: "center" }}>
                  <div className="left-side-forget-password-2">
                    <p className="Required-data-text">Required Data*</p>

                    <div className="phase-1-form">
                      <p className="phase-1-text-left-side">Name</p>
                      <Field
                        disabled={isEditting}
                        type="text"
                        id="phase1.name"
                        name="phase1.name"
                        className="phase-1-input-left-side"
                        placeholder="John Leo"
                      />
                      <ErrorMessage
                        name="phase1.name"
                        component="div"
                        style={{
                          color: "red",
                          fontSize: ".8rem",
                          marginLeft: "7px",
                        }}
                      />
                      <div className="email-input">
                        <p className="phase-1-text-left-side">Email</p>
                        <Field
                          disabled={isEditting}
                          type="email"
                          id="phase1.email"
                          name="phase1.email"
                          placeholder="email@email.com"
                          className="phase-1-input-left-side"
                        />
                        <ErrorMessage
                          name="phase1.email"
                          component="div"
                          style={{
                            color: "red",
                            fontSize: ".8rem",
                            marginLeft: "7px",
                          }}
                        />
                      </div>
                      <div className="Phone-number">
                        <p className="phase-1-text-left-side">Contact</p>
                        <div className="mobileNumber">
                          <PhoneInput
                            disabled={isEditting}
                            country={"us"}
                            inputClass="mobileInput"
                            placeholder="(485)-845-8542658"
                            containerClass={"inputContainer"}
                            value={contact}
                            containerStyle={{
                              height: "2.7rem",
                              marginLeft: "0rem",
                            }}
                            inputStyle={{
                              height: "2.7rem",
                              width: "24.5rem",
                              background: "#f7f7f7",
                            }}
                            onChange={(contact) =>
                              setFieldValue("phase1.contact", contact)
                            }
                          />
                        </div>

                        <ErrorMessage
                          name="phase1.contact"
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
                        <p className="phase-1-text-left-side">Country</p>
                        <SelectCountry
                          disabled={isEditting}
                          name="phase1.country"
                          id="phase1.country"
                          className="phase-1-input-left-side-selector"
                        ></SelectCountry>

                        <p className="country-cnfrm-text">
                          Do you have residence in this country
                        </p>

                        <div className="checkbox-phase1">
                          <p className="yes-check-text">Yes</p>
                          <input
                            disabled={isEditting}
                            defaultChecked={app?.phase1?.sameResidence}
                            required
                            type="radio"
                            id="phase1.sameResidence-yes"
                            name="phase1.sameResidence"
                            onChange={(e) => {
                              setFieldValue("phase1.sameResidence", true);
                              setPermissionInCountryErr(true);
                            }}
                          />
                          <p className="no-check-text">No</p>
                          <input
                            disabled={isEditting}
                            defaultChecked={!app?.phase1?.sameResidence}
                            required
                            type="radio"
                            id="phase1.sameResidence-no"
                            name="phase1.sameResidence"
                            onChange={(e) => {
                              setFieldValue("phase1.sameResidence", false);
                              setFieldValue("phase1.permissionInCountry", "");
                              setPermissionInCountryErr(false);
                            }}
                          />
                        </div>
                        {permissionInCountryErr && (
                          <>
                            <p className="phase-1-text-left-side">
                              If Yes, what type of permission do you have to be
                              in the country?*
                            </p>
                            <Field
                              disabled={isEditting}
                              required={permissionInCountryErr}
                              as="select"
                              id="phase1.permissionInCountry"
                              name="phase1.permissionInCountry"
                              className="phase-1-input-left-side"
                            >
                              <option value="">
                                Select Type of permission
                              </option>
                              <option value="National">National</option>
                              <option value="Settlement">Settlement</option>
                              <option value="TemporaryVisa">
                                Temporary Visa
                              </option>
                            </Field>
                          </>
                        )}
                      </div>
                      {/* Nationality Input div ends  */}
                    </div>
                  </div>

                  <div className="right-side-forget-password-2">
                    <p className="phase-1-text-right-side">
                      Do you speak English?*
                    </p>

                    <div className="checkbox-phase1">
                      <p className="yes-check-text">Yes</p>
                      <input
                        disabled={isEditting}
                        defaultChecked={app?.phase1?.speakEnglish}
                        required
                        type="radio"
                        id="phase1.speakEnglish-yes"
                        name="phase1.speakEnglish"
                        onChange={(e) => {
                          setFieldValue("phase1.speakEnglish", true);
                          setSpeakEnglishErr(true);
                        }}
                        className="yes-check"
                      />
                      <p className="no-check-text">No</p>
                      <input
                        disabled={isEditting}
                        defaultChecked={!app?.phase1?.speakEnglish}
                        required
                        type="radio"
                        id="phase1.speakEnglish-no"
                        name="phase1.speakEnglish"
                        onChange={(e) => {
                          setFieldValue("phase1.speakEnglish", false);
                          setFieldValue("phase1.proficiency", "");
                          setSpeakEnglishErr(false);
                        }}
                        className="no-check"
                      />
                    </div>

                    {speakEnglishErr && (
                      <>
                        <p className="phase-1-text-right-side">
                          If Yes, what level of proficiency?*
                        </p>

                        <div className="phase-1-all-checkboxes">
                          <p className="phase-1-text-right-side">Beginner</p>
                          <input
                            disabled={isEditting}
                            defaultChecked={
                              app?.phase1?.proficiency === "Beginner"
                            }
                            required={speakEnglishErr}
                            type="radio"
                            id="phase1.proficiency-beginner"
                            name="phase1.proficiency"
                            onChange={(e) => {
                              setFieldValue("phase1.proficiency", "Beginner");
                            }}
                            className="checks"
                          />
                          <p className="phase-1-text-right-side">Moderate</p>
                          <input
                            disabled={isEditting}
                            defaultChecked={
                              app?.phase1?.proficiency === "Moderate"
                            }
                            required={speakEnglishErr}
                            type="radio"
                            id="phase1.proficiency-moderate"
                            name="phase1.proficiency"
                            onChange={(e) => {
                              setFieldValue("phase1.proficiency", "Moderate");
                            }}
                            className="checks"
                          />
                          <p className="phase-1-text-right-side">Fluent</p>
                          <input
                            disabled={isEditting}
                            defaultChecked={
                              app?.phase1?.proficiency === "Fluent"
                            }
                            required={speakEnglishErr}
                            type="radio"
                            id="phase1.proficiency-fluent"
                            name="phase1.proficiency"
                            onChange={(e) => {
                              setFieldValue("phase1.proficiency", "Fluent");
                            }}
                            className="checks"
                          />
                          <p className="phase-1-text-right-side">Native</p>
                          <input
                            disabled={isEditting}
                            defaultChecked={
                              app?.phase1?.proficiency === "Native"
                            }
                            required={speakEnglishErr}
                            type="radio"
                            id="phase1.proficiency-native"
                            name="phase1.proficiency"
                            onChange={(e) => {
                              setFieldValue("phase1.proficiency", "Native");
                            }}
                            className="checks"
                          />
                        </div>
                      </>
                    )}

                    <p className="phase-1-text-right-side">
                      What other languages do you speak?*
                    </p>

                    <LanguageList
                      defaultValue={
                        languagesArr && languagesArr[languagesArr?.length - 1]
                      }
                      disabled={isEditting}
                      name="phase1.otherLanguagesSpeak"
                      className="phase-1-input-right-side-selector"
                      onChange={setLanguagesArr}
                      prevValue={languagesArr}
                      setFieldValue={setFieldValue}
                    ></LanguageList>

                    <div
                      className="languages-display"
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        width: "100%",
                        flexWrap: "wrap",
                        marginTop: "10px",
                        marginLeft: "4px",
                      }}
                    >
                      {languagesArr?.map((item) => (
                        <div
                          key={item}
                          style={{
                            background: "#F7F7F7",
                            padding: "2px 10px",
                            borderRadius: "3px",
                            fontSize: ".82rem",
                            border: "1px solid #E2E2E4",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "15px",
                          }}
                          className="language-item"
                        >
                          {item}
                          <span
                            onClick={() => handleRemove(item)}
                            style={{
                              cursor: "pointer",
                              color: "red",
                              fontSize: "1.04rem",
                            }}
                          >
                            x
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="phase-1-text-right-side">
                      Have you ever been refused a visa/entry to any country in
                      the world?*
                    </p>

                    <div className="checkbox-phase1">
                      <p className="yes-check-text">Yes</p>
                      <input
                        disabled={isEditting}
                        defaultChecked={app?.phase1?.isRefusedVisaEntry}
                        required
                        type="radio"
                        id="phase1.isRefusedVisaEntry-yes"
                        name="phase1.isRefusedVisaEntry"
                        onChange={(e) => {
                          setFieldValue("phase1.isRefusedVisaEntry", true);
                          setRefusedVisaErr(true);
                        }}
                        className="yes-check"
                      />
                      <p className="no-check-text">No</p>
                      <input
                        disabled={isEditting}
                        defaultChecked={!app?.phase1?.isRefusedVisaEntry}
                        required
                        type="radio"
                        id="phase1.isRefusedVisaEntry-no"
                        name="phase1.isRefusedVisaEntry"
                        onChange={(e) => {
                          setFieldValue("phase1.isRefusedVisaEntry", false);
                          setFieldValue("phase1.refusedVisaDate", "");
                          setFieldValue("phase1.refusedVisaReason", "");
                          setFieldValue("phase1.refusedVisaType", "");
                          setRefusedVisaErr(false);
                        }}
                        className="no-check"
                      />
                    </div>

                    {refusedVisaErr && (
                      <>
                        <p className="phase-1-text-right-side">
                          If yes, please provide type of visa refused*
                        </p>
                        <Field
                          disabled={isEditting}
                          as="select"
                          id="phase1.refusedVisaType"
                          name="phase1.refusedVisaType"
                          className="phase-1-input-right-side-selector"
                          required={refusedVisaErr}
                        >
                          <option value="">Type of visa refused</option>
                          <option value="Visit">Visit</option>
                          <option value="Study">Study</option>
                          <option value="Work">Work</option>
                          <option value="Settlement">Settlement </option>
                          <option value="Other">Other</option>
                        </Field>

                        <p className="phase-1-text-right-side">Date*</p>
                        <Field
                          disabled={isEditting}
                          className="phase-1-input-right-side"
                          type="date"
                          placeholder="Select Date"
                          name="phase1.refusedVisaDate"
                          id="phase1.refusedVisaDate"
                          required={refusedVisaErr}
                        />

                        <p className="phase-1-text-right-side">
                          If yes, please provide type of visa refused reason*
                        </p>
                        <Field
                          disabled={isEditting}
                          type="text"
                          placeholder="Type here"
                          className="phase-1-input-right-side"
                          name="phase1.refusedVisaReason"
                          id="phase1.refusedVisaReason"
                          required={refusedVisaErr}
                        />
                      </>
                    )}

                    <p className="phase-1-text-right-side">
                      Please provide in your own words how we can help you?*
                    </p>
                    <Field
                      disabled={isEditting}
                      type="text"
                      placeholder="Type here"
                      className="phase-1-input-right-side"
                      name="phase1.message"
                      id="phase1.message"
                    />

                    <ErrorMessage
                      name="phase1.message"
                      component="div"
                      style={{
                        color: "red",
                        fontSize: ".8rem",
                        marginLeft: "7px",
                      }}
                    />

                    <button
                      ref={buttonRef}
                      style={{ opacity: 0 }}
                      disabled={isLoading}
                      type="submit"
                      className="submit-email-btn-2"
                    >
                      {isLoading ? (
                        <Loader width={25} color={"#fff"} />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    );
}

export default Phase1