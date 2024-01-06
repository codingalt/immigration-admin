import React, { useState, useEffect, useRef, useContext, useMemo } from "react";
import SideNavbar from "../SideNavbar";
import "../../style/Phase1.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Editimgapp from "../../assests/Edit-file-img.svg";
import Approvedimgapp from "../../assests/Approved-img.svg";
import Rejectimgapp from "../../assests/Delete-File-img.svg";
import {
  useApprovePhase1Mutation,
  useGetApplicationDataByIdQuery,
  usePostPhase1Mutation,
  useUpdatePhaseByAdminMutation,
} from "../../services/api/applicationApi";
import MainContext from "../Context/MainContext";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { phase1Schema } from "../../utils/ValidationSchema";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Loader from "../Loader";
import SelectCountry from "../SelectCountry";
import LanguageList from "../LanguageList";
import { format } from "date-fns";
import { toastError, toastSuccess } from "../Toast";
import tick from "../../assests/tick.png";
import cross from "../../assests/cross.png";
import { usePhase1ManualMutation } from "../../services/api/adminApi";

const AddPhase1 = () => {
  const { socket } = useContext(MainContext);
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const {
    data,
    refetch,
    isLoading: isLoadingApplication,
  } = useGetApplicationDataByIdQuery(applicationId,{skip: applicationId === "view"});
  const app = data?.application;

  useEffect(() => {
    if (!isLoadingApplication) {
      socket.on("phase data received", (phaseData) => {
        if (phaseData) {
          refetch();
          console.log("phase data received", phaseData);
        }
      });
    }
  }, [isLoadingApplication, refetch, socket]);

  const [contact, setContact] = useState();
  const [activeLink, setActiveLink] = useState("/phase1");

  const { user, applicationType } = useSelector((state) => state.user);
  const [permissionInCountryErr, setPermissionInCountryErr] = useState(true);
  const [speakEnglishErr, setSpeakEnglishErr] = useState(true);
  const [refusedVisaErr, setRefusedVisaErr] = useState(true);
  const [languagesArr, setLanguagesArr] = useState([]);
  const languageRef = useRef();

  const [phase1Manual, res] = usePhase1ManualMutation();
  const {isLoading, isSuccess,error} = res;

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

//   useMemo(() => {
//     if (approveSuccess) {
//       toastSuccess("Phase 1 Approved");
//       handleLinkClick("/prephase2");
//       navigate(`/admin/prephase2/${applicationId}`);
//     }
//   }, [approveSuccess]);

  const initialValues = {
    userId: "",
    phase1: {
      applicationType: "",
      name: "",
      email: "",
      contact: "",
      birthDate: "",
      country: "",
      sameResidence: true,
      permissionInCountry: "",
      speakEnglish: true,
      proficiency: "",
      otherLanguagesSpeak: languagesArr,
      isRefusedVisaEntry: true,
      refusedVisaType: "",
      refusedVisaDate:
        "",
      refusedVisaReason: "",
      message: "",
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
    const { data } = await phase1Manual(values);
    console.log(data);
    if(data.success){
      navigate(`/add/phase2/${data?.result?._id}`);
    }
  };

  const handleRemove = (value) => {
    if (languagesArr.includes(value)) {
      const tempArr = [...languagesArr];
      const filteredArray = tempArr.filter((item) => item !== value);
      setLanguagesArr(filteredArray);
    }
  };

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

  const buttonRef = useRef();

  return (
    <div className="Phase-1-main-container">
      <SideNavbar />
      <h2 className="Pre-screening-text-2">Pre-Screening</h2>
      <div className="Buttons-preescreening"></div>
      <button onClick={() => navigate(`/admin/dashboard`)} className="back-btn">
        Back
      </button>

      <div className="phase-4-all-phase">
        <NavLink
          to={`/add/phase1/${applicationId}`}
          className={`link-hover-effect ${
            activeLink === "/phase1" ? "link-active" : ""
          }`}
          onClick={() => handleLinkClick("/phase1")}
          style={{ width: "2.9rem" }}
        >
          <span className="routes-all">Phase 1</span>
        </NavLink>

        {/* <NavLink
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
        </NavLink> */}
      </div>

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
                  <p className="phase-1-text-left-side">Service Type</p>
                  <Field
                    required
                    as="select"
                    id="phase1.applicationType"
                    name="phase1.applicationType"
                    className="phase-1-input-left-side"
                  >
                    <option value="">Select Service Type</option>
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
                    <option value="University Placement">
                      University Placement
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
                  <p className="phase-1-text-left-side">Name</p>
                  <Field
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
                        defaultChecked
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
                          If Yes, what type of permission do you have to be in
                          the country?*
                        </p>
                        <Field
                          required={permissionInCountryErr}
                          as="select"
                          id="phase1.permissionInCountry"
                          name="phase1.permissionInCountry"
                          className="phase-1-input-left-side"
                        >
                          <option value="">Select Type of permission</option>
                          <option value="National">National</option>
                          <option value="Settlement">Settlement</option>
                          <option value="TemporaryVisa">Temporary Visa</option>
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
                    defaultChecked
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
                        defaultChecked
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
                  Have you ever been refused a visa/entry to any country in the
                  world?*
                </p>

                <div className="checkbox-phase1">
                  <p className="yes-check-text">Yes</p>
                  <input
                    defaultChecked
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
                  disabled={isLoading}
                  type="submit"
                  className="submit-email-btn-2"
                >
                  {isLoading ? <Loader width={25} color={"#fff"} /> : "Next"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddPhase1;
