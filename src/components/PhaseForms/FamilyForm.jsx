import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  useGetCountriesQuery,
  usePostFamilyMutation,
  usePostPhase4Mutation,
} from "../../services/api/applicationApi";
import { toastError } from "../Toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SelectCountry from "../SelectCountry";
import { familySchema } from "../../utils/ValidationSchema";
import { NavLink } from "react-router-dom";
import Loader from "../Loader";
import FamilyInfoForm from "./FamilyInfoForm";

const FamilyForm = ({
  data,
  setActiveTab,
  initialValues,
  setChildDetailsArr,
  refetch,
  isEditting,
  buttonRef,
}) => {
  const application = data?.application;
  console.log("initialValues", initialValues.phase4.family);
  // console.log("Family Phase 4", initialValues?.phase4);

  // const [postPhase4, res] = usePostPhase4Mutation();
  const [postFamily, res] = usePostFamilyMutation();
  const { isLoading, isSuccess, error } = res;

  const [marriedStatus, setMarriedStatus] = useState("");

  const [showAddChildCount, setShowAddChildCount] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [numChildren, setNumChildren] = useState(
    initialValues?.phase4?.family?.numberOfChildren > 0
      ? initialValues?.phase4?.family?.numberOfChildren
      : 0
  );
  const [childOptions, setChildOptions] = useState([]);
  const [isChildPassport, setIsChildPassport] = useState();
  const [isChildVisa, setIsChildVisa] = useState();

  const handleSaveClick = () => {
    if (numChildren <= 0) {
      toastError("Number of children must be greater than 0");
      return;
    }
    const options = [];
    for (let i = 1; i <= numChildren; i++) {
      options.push(`Child ${i}`);
    }
    setChildOptions(options);

    setShowAddChildCount(false);
    setShowModal(true);

    console.log(numChildren);

    setChildDetailsArr(
      Array(parseInt(numChildren)).fill({
        childName: "",
        childGender: "",
        childDob: "",
        childNationality: "",
        isChildPassport: null,
        childPassportNumber: "",
        childPassportIssueDate: "",
        childPassportExpiryDate: "",
        isChildVisa: null,
        childVisaType: "",
        childVisaIssueDate: "",
        childVisaExpiryDate: "",
      })
    );
  };

  const [isLiveTogether, setIsLiveTogether] = useState(
    initialValues?.phase4?.family?.isLiveTogether
  );

  const [isChildren, setIsChildren] = useState(
    initialValues?.phase4?.family?.isChildren
  );
  const [isMarriedBefore, setIsMarriedBefore] = useState(
    initialValues?.phase4?.family?.isMarriedBefore
  );
  const [isCurrentPartnerMarriedBefore, setIsCurrentPartnerMarriedBefore] =
    useState(initialValues?.phase4?.family?.isCurrentPartnerMarriedBefore);
  const [isFamilyInHome, setIsFamilyInHome] = useState(
    initialValues?.phase4?.family?.isFamilyFriendsInHomeCountry
  );

  useMemo(() => {
    if (isSuccess) {
      refetch();
      // setActiveTab("/languageprofeciency");
    }
  }, [isSuccess]);

  useMemo(() => {
    if (error) {
      toastError("Something went wrong");
    }
  }, [error]);

  const handleSubmitData = async (values) => {
    if (marriedStatus != "single" && numChildren <= 0) {
      toastError("Number of children must be greater than 0");
      return;
    }

    if (
      marriedStatus != "single" &&
      values.phase4.family.childDetails.length == 0
    ) {
      toastError("Please fill out Child Details.");
      return;
    }

    // Check if any child detail object has empty properties
    const hasEmptyChildDetails = values.phase4.family.childDetails.some(
      (child) => {
        if (child.isChildPassport) {
          // Check these properties only if isChildPassport is true
          return (
            !child.childName.trim() ||
            !child.childGender.trim() ||
            !child.childDob.trim() ||
            !child.childNationality.trim() ||
            !child.childPassportNumber.trim() ||
            !child.childPassportIssueDate.trim() ||
            !child.childPassportExpiryDate.trim() ||
            !child.childVisaType.trim() ||
            !child.childVisaIssueDate.trim() ||
            !child.childVisaExpiryDate.trim()
          );
        } else if (child.isChildVisa) {
          return (
            !child.childName.trim() ||
            !child.childGender.trim() ||
            !child.childDob.trim() ||
            !child.childNationality.trim() ||
            !child.childPassportNumber.trim() ||
            !child.childPassportIssueDate.trim() ||
            !child.childPassportExpiryDate.trim() ||
            !child.childVisaType.trim() ||
            !child.childVisaIssueDate.trim() ||
            !child.childVisaExpiryDate.trim()
          );
        } else {
          return (
            !child.childName.trim() ||
            !child.childGender.trim() ||
            !child.childDob.trim() ||
            !child.childNationality.trim()
          );
        }
      }
    );

    if (marriedStatus != "single" && hasEmptyChildDetails) {
      toastError("Please fill in all child details");
      return;
    }

    console.log("submitted family", values?.phase4?.family);
    await postFamily({
      data: values.phase4.family,
      applicationId: application?._id,
    });
  };

  const handleBackClick = () => {
    setActiveTab("/Accomodation");
  };

  const [selectedChild, setSelectedChild] = useState(1);
  const arrLength = childOptions?.length;
  const [childDetails, setChildDetails] = useState();
  const isReq = true;

  const [countries, setCountries] = useState([]);
  const { data: country } = useGetCountriesQuery();
  const topDivRef = useRef();

  useEffect(() => {
    const countryNames = country?.map((country) => country.name.common);
    const sortedCountries = countryNames?.sort();
    setCountries(sortedCountries);
  }, [country]);

  const changeChild = (index) => {
    console.log(index);
    if (selectedChild < arrLength) {
      setSelectedChild(index + 1);
    }
  };

  useEffect(() => {
    if (topDivRef.current) {
      topDivRef.current.scrollTop = 0;
    }
  }, [selectedChild]);

  const handleClose = (values) => {
    console.log(values);
    // const hasEmptyChildDetails = values.phase4.family.childDetails.some(
    //   (child) => {
    //     return (
    //       !child.childName.trim() ||
    //       !child.childGender.trim() ||
    //       !child.childDob.trim() ||
    //       !child.childNationality.trim() ||
    //       !child.childPassportNumber.trim() ||
    //       !child.childPassportIssueDate.trim() ||
    //       !child.childPassportExpiryDate.trim() ||
    //       !child.childVisaType.trim() ||
    //       !child.childVisaIssueDate.trim() ||
    //       !child.childVisaExpiryDate.trim()
    //     );
    //   }
    // );

    const hasEmptyChildDetails = values.phase4.family.childDetails.some(
      (child) => {
        if (child.isChildPassport) {
          // Check these properties only if isChildPassport is true
          return (
            !child.childName.trim() ||
            !child.childGender.trim() ||
            !child.childDob.trim() ||
            !child.childNationality.trim() ||
            !child.childPassportNumber.trim() ||
            !child.childPassportIssueDate.trim() ||
            !child.childPassportExpiryDate.trim() ||
            !child.childVisaType.trim() ||
            !child.childVisaIssueDate.trim() ||
            !child.childVisaExpiryDate.trim()
          );
        } else if (child.isChildVisa) {
          return (
            !child.childName.trim() ||
            !child.childGender.trim() ||
            !child.childDob.trim() ||
            !child.childNationality.trim() ||
            !child.childPassportNumber.trim() ||
            !child.childPassportIssueDate.trim() ||
            !child.childPassportExpiryDate.trim() ||
            !child.childVisaType.trim() ||
            !child.childVisaIssueDate.trim() ||
            !child.childVisaExpiryDate.trim()
          );
        } else {
          return (
            !child.childName.trim() ||
            !child.childGender.trim() ||
            !child.childDob.trim() ||
            !child.childNationality.trim()
          );
        }
      }
    );

    // if (hasEmptyChildDetails) {
    //   toastError("Please fill in all child details");
    //   return;
    // }
    setShowModal(false);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitData}
        validationSchema={familySchema}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form
            style={{
              display: "flex",
              width: "100%",
              gap: "2rem",
            }}
          >
            <div className="left-side-phase" style={{ paddingBottom: "4rem" }}>
              <p className="genral-text-left-side">1. Marital Status*</p>
              <Field
                disabled={isEditting}
                as="select"
                required
                className="genral-input-left-side-selector"
                name="phase4.family.maritalStatus"
                id="phase4.family.maritalStatus"
                style={
                  errors?.phase4?.family?.maritalStatus &&
                  touched?.phase4?.family?.maritalStatus && {
                    border: "1px solid red",
                  }
                }
                onChange={(e) => {
                  setMarriedStatus(e.target.value);
                  setFieldValue("phase4.family.maritalStatus", e.target.value);
                }}
              >
                <option value="">Select Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorce">Divorce</option>
                <option value="widowed">Widowed</option>
                <option value="separated">Separated</option>
              </Field>

              {marriedStatus != "single" && (
                <>
                  <p className="genral-text-left-side">1. Name of Spouse*</p>
                  <Field
                    disabled={isEditting}
                    required={marriedStatus != "single"}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Name of Spouse*"
                    name="phase4.family.spouseName"
                    id="phase4.family.spouseName"
                    style={
                      errors?.phase4?.family?.spouseName &&
                      touched?.phase4?.family?.spouseName && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">3. Date of Marriage*</p>
                  <Field
                    disabled={isEditting}
                    required={marriedStatus != "single"}
                    type="date"
                    className="genral-input-left-side"
                    name="phase4.family.marriageDate"
                    id="phase4.family.marriageDate"
                    style={
                      errors?.phase4?.family?.marriageDate &&
                      touched?.phase4?.family?.marriageDate && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">
                    4. Where you got married*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={marriedStatus != "single"}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type"
                    name="phase4.family.whereGotMarried"
                    id="phase4.family.whereGotMarried"
                    style={
                      errors?.phase4?.family?.whereGotMarried &&
                      touched?.phase4?.family?.whereGotMarried && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">
                    5. Date of birth of spouse*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={marriedStatus != "single"}
                    type="date"
                    className="genral-input-left-side"
                    name="phase4.family.spouseDob"
                    id="phase4.family.spouseDob"
                    style={
                      errors?.phase4?.family?.spouseDob &&
                      touched?.phase4?.family?.spouseDob && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">
                    6. Nationality of spouse*
                  </p>
                  <SelectCountry
                    disabled={isEditting}
                    required={marriedStatus != "single"}
                    className="genral-input-left-side-selector"
                    name="phase4.family.spouseNationality"
                    id="phase4.family.spouseNationality"
                    style={
                      errors?.phase4?.family?.spouseNationality &&
                      touched?.phase4?.family?.spouseNationality && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">
                    7. Passport number for spouse*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={marriedStatus != "single"}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type Number"
                    name="phase4.family.spousePassportNumber"
                    id="phase4.family.spousePassportNumber"
                    style={
                      errors?.phase4?.family?.spousePassportNumber &&
                      touched?.phase4?.family?.spousePassportNumber && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">
                    8. Where did you meet?*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={marriedStatus != "single"}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type"
                    name="phase4.family.whereDidYouMeet"
                    id="phase4.family.whereDidYouMeet"
                    style={
                      errors?.phase4?.family?.whereDidYouMeet &&
                      touched?.phase4?.family?.whereDidYouMeet && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">
                    9. When did your relationship begin*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={marriedStatus != "single"}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type"
                    name="phase4.family.whenDidRelationshipBegan"
                    id="phase4.family.whenDidRelationshipBegan"
                    style={
                      errors?.phase4?.family?.whenDidRelationshipBegan &&
                      touched?.phase4?.family?.whenDidRelationshipBegan && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">
                    10. When you last saw each other*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={marriedStatus != "single"}
                    type="date"
                    className="genral-input-left-side"
                    name="phase4.family.whenLastSawEachOther"
                    id="phase4.family.whenLastSawEachOther"
                    style={
                      errors?.phase4?.family?.whenLastSawEachOther &&
                      touched?.phase4?.family?.whenLastSawEachOther && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">
                    11. Do you live together ?*
                  </p>

                  <div className="checkbox-phase1">
                    <p className="yes-check-text">Yes</p>
                    <input
                      disabled={isEditting}
                      checked={isLiveTogether}
                      type="radio"
                      className="yes-check"
                      name="phase4.family.isLiveTogether"
                      id="phase4.family.isLiveTogetherYes"
                      onChange={(e) => {
                        setFieldValue("phase4.family.isLiveTogether", true);
                        setIsLiveTogether(true);
                      }}
                    />
                    <p className="no-check-text">No</p>
                    <input
                      disabled={isEditting}
                      checked={!isLiveTogether}
                      type="radio"
                      className="no-check"
                      name="phase4.family.isLiveTogether"
                      id="phase4.family.isLiveTogetherNo"
                      onChange={(e) => {
                        setFieldValue("phase4.family.isLiveTogether", false);
                        setIsLiveTogether(false);
                      }}
                    />
                  </div>

                  {isLiveTogether && (
                    <>
                      <p className="genral-text-left-side">
                        12. iv. What date you started living together?*
                      </p>
                      <Field
                        disabled={isEditting}
                        required={marriedStatus != "single" && isLiveTogether}
                        type="date"
                        className="genral-input-left-side"
                        name="phase4.family.whichDateStartedLivingTogether"
                        id="phase4.family.whichDateStartedLivingTogether"
                        style={
                          errors?.phase4?.family
                            ?.whichDateStartedLivingTogether &&
                          touched?.phase4?.family
                            ?.whichDateStartedLivingTogether && {
                            border: "1px solid red",
                          }
                        }
                      />
                    </>
                  )}

                  <p className="genral-text-left-side">
                    13. Do you have any children ?*
                  </p>

                  <div className="checkbox-phase1">
                    <p className="yes-check-text">Yes</p>
                    <input
                      disabled={isEditting}
                      required={marriedStatus != "single"}
                      defaultChecked={isChildren}
                      type="radio"
                      className="yes-check"
                      name="phase4.family.isChildren"
                      id="phase4.family.isChildrenYes"
                      onChange={(e) => {
                        setFieldValue("phase4.family.isChildren", true);
                        setIsChildren(true);
                      }}
                    />
                    <p className="no-check-text">No</p>
                    <input
                      disabled={isEditting}
                      required={marriedStatus != "single"}
                      defaultChecked={!isChildren}
                      type="radio"
                      className="no-check"
                      name="phase4.family.isChildren"
                      id="phase4.family.isChildrenNo"
                      onChange={(e) => {
                        setFieldValue("phase4.family.isChildren", false);
                        setIsChildren(false);
                      }}
                    />
                  </div>

                  {isChildren && (
                    <div>
                      <p className="genral-text-left-side">
                        Number of Children:
                      </p>
                      <div
                        style={{
                          display: "flex",
                          gap: "15px",
                          alignItems: "center",
                          marginBottom: "15px",
                        }}
                      >
                        <Field
                          disabled={isEditting}
                          className="genral-input-left-side"
                          type="number"
                          name="phase4.family.numberOfChildren"
                          id="phase4.family.numberOfChildren"
                          min={0}
                          style={{ width: "65%" }}
                          onChange={(e) => {
                            setNumChildren(e.target.value);
                            setFieldValue(
                              "phase4.family.numberOfChildren",
                              e.target.value
                            );
                          }}
                        />
                        <button
                          style={{
                            marginTop: "0",
                            width: "9rem",
                            height: "2.5rem",
                          }}
                          type="button"
                          onClick={() => {
                            handleSaveClick();
                          }}
                          className="Add-chlid-btn"
                        >
                          Child Details
                        </button>
                      </div>
                    </div>
                  )}

                  {showModal && (
                    <div className="modal active">
                      <div
                        className="modal-content"
                        ref={topDivRef}
                        style={{ scrollBehavior: "smooth" }}
                      >
                        <div className="child-tabs">
                          {childOptions?.map((option, index) => (
                            <button
                              key={option}
                              className={`child-tab ${
                                index + 1 === selectedChild ? "active" : ""
                              }`}
                              onClick={() => setSelectedChild(index + 1)}
                              type="button"
                            >
                              {option}
                            </button>
                          ))}
                        </div>

                        <p className="genral-text-left-side">{`Child ${selectedChild}'s Details`}</p>
                        <div
                          className="child-details"
                          style={{ display: "flex", width: "100%" }}
                        >
                          {childOptions?.map(
                            (item, index) =>
                              index + 1 === selectedChild && (
                                <div
                                  key={item}
                                  style={{
                                    display: "flex",
                                    width: "100%",
                                    overflowX: "hidden",
                                    gap: "14px",
                                  }}
                                >
                                  <div style={{ width: "50%" }}>
                                    <p className="genral-text-left-side">
                                      i. Child's Name*
                                    </p>
                                    <Field
                                      disabled={isEditting}
                                      required={isReq}
                                      type="text"
                                      className="genral-input-left-side"
                                      placeholder="Type Name"
                                      name={`phase4.family.childDetails[${index}].childName`}
                                      id={`phase4.family.childDetails[${index}].childName`}
                                      style={
                                        errors?.phase4?.family?.childDetails &&
                                        errors.phase4.family.childDetails[
                                          index
                                        ] &&
                                        errors.phase4.family.childDetails[index]
                                          .childName &&
                                        touched?.phase4?.family?.childDetails &&
                                        touched.phase4.family.childDetails[
                                          index
                                        ] &&
                                        touched.phase4.family.childDetails[
                                          index
                                        ].childName
                                          ? { border: "1px solid red" }
                                          : null
                                      }
                                    />

                                    <ErrorMessage
                                      name={`phase4.family.childDetails[${index}]
                                              .childName`}
                                      component="div"
                                      style={{
                                        color: "red",
                                        fontSize: ".8rem",
                                        marginLeft: "7px",
                                      }}
                                    />

                                    <p className="genral-text-left-side">
                                      ii. Gender ?
                                    </p>
                                    <Field
                                      disabled={isEditting}
                                      as="select"
                                      required={isReq}
                                      name={`phase4.family.childDetails[${index}].childGender`}
                                      id={`phase4.family.childDetails[${index}].childGender`}
                                      placeholder="Select"
                                      className="genral-input-left-side-selector"
                                      style={
                                        errors?.phase4?.family?.childDetails &&
                                        errors.phase4.family.childDetails[
                                          index
                                        ] &&
                                        errors.phase4.family.childDetails[index]
                                          .childGender &&
                                        touched?.phase4?.family?.childDetails &&
                                        touched.phase4.family.childDetails[
                                          index
                                        ] &&
                                        touched.phase4.family.childDetails[
                                          index
                                        ].childGender
                                          ? { border: "1px solid red" }
                                          : null
                                      }
                                    >
                                      <option value="">Select Gender</option>
                                      <option value="Male">Male</option>
                                      <option value="Female">female</option>
                                      <option value="Other">Other</option>
                                    </Field>

                                    <p className="genral-text-left-side">
                                      iii. Date of Birth*
                                    </p>
                                    <Field
                                      disabled={isEditting}
                                      required={isReq}
                                      type="date"
                                      className="genral-input-left-side"
                                      name={`phase4.family.childDetails[${index}].childDob`}
                                      id={`phase4.family.childDetails[${index}].childDob`}
                                      style={
                                        errors?.phase4?.family?.childDetails &&
                                        errors.phase4.family.childDetails[
                                          index
                                        ] &&
                                        errors.phase4.family.childDetails[index]
                                          .childDob &&
                                        touched?.phase4?.family?.childDetails &&
                                        touched.phase4.family.childDetails[
                                          index
                                        ] &&
                                        touched.phase4.family.childDetails[
                                          index
                                        ].childDob
                                          ? { border: "1px solid red" }
                                          : null
                                      }
                                    />

                                    <p className="genral-text-left-side">
                                      iv. Child Nationality*
                                    </p>
                                    <Field
                                      disabled={isEditting}
                                      as="select"
                                      required={isReq}
                                      className="genral-input-left-side"
                                      name={`phase4.family.childDetails[${index}].childNationality`}
                                      id={`phase4.family.childDetails[${index}].childNationality`}
                                      style={
                                        errors?.phase4?.family?.childDetails &&
                                        errors.phase4.family.childDetails[
                                          index
                                        ] &&
                                        errors.phase4.family.childDetails[index]
                                          .childNationality &&
                                        touched?.phase4?.family?.childDetails &&
                                        touched.phase4.family.childDetails[
                                          index
                                        ] &&
                                        touched.phase4.family.childDetails[
                                          index
                                        ].childNationality
                                          ? { border: "1px solid red" }
                                          : null
                                      }
                                    >
                                      <option value="">
                                        Select Nationality
                                      </option>
                                      {countries?.map((country, index) => (
                                        <option key={index} value={country}>
                                          {country}
                                        </option>
                                      ))}
                                    </Field>

                                    <p className="genral-text-left-side">
                                      11. Do you have Passport?*
                                    </p>

                                    <div className="checkbox-phase1">
                                      <p className="yes-check-text">Yes</p>
                                      <input
                                        disabled={isEditting}
                                        required
                                        type="radio"
                                        className="yes-check checkbox-child"
                                        name={`phase4.family.childDetails[${index}].isChildPassport`}
                                        id={`phase4.family.childDetails[${index}].isChildPassport`}
                                        value="true"
                                        checked={isChildPassport}
                                        onChange={() => {
                                          setFieldValue(
                                            `phase4.family.childDetails[${index}]
                                              .isChildPassport`,
                                            true
                                          );
                                          setIsChildPassport(true);
                                        }}
                                      />
                                      <p className="no-check-text">No</p>
                                      <input
                                        disabled={isEditting}
                                        required
                                        type="radio"
                                        className="no-check checkbox-child"
                                        name={`phase4.family.childDetails[${index}].isChildPassport`}
                                        id={`phase4.family.childDetails[${index}].isChildPassport`}
                                        value="false"
                                        checked={!isChildPassport}
                                        onChange={() => {
                                          setFieldValue(
                                            `phase4.family.childDetails[${index}]
                                              .isChildPassport`,
                                            false
                                          );
                                          setIsChildPassport(false);
                                        }}
                                      />
                                      <ErrorMessage
                                        name={`phase4.family.childDetails[${index}]
                                              .isChildPassport`}
                                        component="div"
                                        style={{
                                          color: "red",
                                          fontSize: ".8rem",
                                          marginLeft: "7px",
                                        }}
                                      />
                                    </div>

                                    {isChildPassport && (
                                      <>
                                        <p className="genral-text-left-side">
                                          v. Passport Number*
                                        </p>
                                        <Field
                                          disabled={isEditting}
                                          required={isReq && isChildPassport}
                                          type="text"
                                          className="genral-input-left-side"
                                          name={`phase4.family.childDetails[${index}].childPassportNumber`}
                                          id={`phase4.family.childDetails[${index}].childPassportNumber`}
                                          style={
                                            errors?.phase4?.family
                                              ?.childDetails &&
                                            errors.phase4.family.childDetails[
                                              index
                                            ] &&
                                            errors.phase4.family.childDetails[
                                              index
                                            ].childPassportNumber &&
                                            touched?.phase4?.family
                                              ?.childDetails &&
                                            touched.phase4.family.childDetails[
                                              index
                                            ] &&
                                            touched.phase4.family.childDetails[
                                              index
                                            ].childPassportNumber
                                              ? { border: "1px solid red" }
                                              : null
                                          }
                                          placeholder="Passport Number*"
                                        />

                                        <p className="genral-text-left-side">
                                          vi. Passport Issued Date*
                                        </p>
                                        <Field
                                          disabled={isEditting}
                                          required={isReq && isChildPassport}
                                          type="date"
                                          className="genral-input-left-side"
                                          name={`phase4.family.childDetails[${index}].childPassportIssueDate`}
                                          id={`phase4.family.childDetails[${index}].childPassportIssueDate`}
                                          style={
                                            errors?.phase4?.family
                                              ?.childDetails &&
                                            errors.phase4.family.childDetails[
                                              index
                                            ] &&
                                            errors.phase4.family.childDetails[
                                              index
                                            ].childPassportIssueDate &&
                                            touched?.phase4?.family
                                              ?.childDetails &&
                                            touched.phase4.family.childDetails[
                                              index
                                            ] &&
                                            touched.phase4.family.childDetails[
                                              index
                                            ].childPassportIssueDate
                                              ? { border: "1px solid red" }
                                              : null
                                          }
                                        />
                                      </>
                                    )}
                                  </div>

                                  <div style={{ width: "50%" }}>
                                    {isChildPassport && (
                                      <>
                                        <p className="genral-text-left-side">
                                          vii. Passport Expiry Date*
                                        </p>
                                        <Field
                                          disabled={isEditting}
                                          required={isReq && isChildPassport}
                                          type="date"
                                          className="genral-input-left-side"
                                          name={`phase4.family.childDetails[${index}].childPassportExpiryDate`}
                                          id={`phase4.family.childDetails[${index}].childPassportExpiryDate`}
                                          style={
                                            errors?.phase4?.family
                                              ?.childDetails &&
                                            errors.phase4.family.childDetails[
                                              index
                                            ] &&
                                            errors.phase4.family.childDetails[
                                              index
                                            ].childPassportExpiryDate &&
                                            touched?.phase4?.family
                                              ?.childDetails &&
                                            touched.phase4.family.childDetails[
                                              index
                                            ] &&
                                            touched.phase4.family.childDetails[
                                              index
                                            ].childPassportExpiryDate
                                              ? { border: "1px solid red" }
                                              : null
                                          }
                                        />
                                      </>
                                    )}

                                    <p className="genral-text-left-side">
                                      11. Do you have a Visa?*
                                    </p>

                                    <div className="checkbox-phase1">
                                      <p className="yes-check-text">Yes</p>
                                      <input
                                        disabled={isEditting}
                                        type="radio"
                                        className="yes-check checkbox-child"
                                        name={`phase4.family.childDetails[${index}].isChildVisa`}
                                        id={`phase4.family.childDetails[${index}].isChildVisa`}
                                        checked={isChildVisa}
                                        onChange={() => {
                                          setFieldValue(
                                            `phase4.family.childDetails[${index}]
                                              .isChildVisa`,
                                            true
                                          );
                                          setIsChildVisa(true);
                                        }}
                                      />
                                      <p className="no-check-text">No</p>
                                      <input
                                        disabled={isEditting}
                                        type="radio"
                                        className="no-check checkbox-child"
                                        name={`phase4.family.childDetails[${index}].isChildVisa`}
                                        id={`phase4.family.childDetails[${index}].isChildVisa`}
                                        checked={!isChildVisa}
                                        onChange={() => {
                                          setFieldValue(
                                            `phase4.family.childDetails[${index}]
                                              .isChildVisa`,
                                            false
                                          );
                                          setIsChildVisa(false);
                                        }}
                                      />
                                      <ErrorMessage
                                        name={`phase4.family.childDetails[${index}]
                                              .isChildVisa`}
                                        component="div"
                                        style={{
                                          color: "red",
                                          fontSize: ".8rem",
                                          marginLeft: "7px",
                                        }}
                                      />
                                    </div>

                                    {isChildVisa && (
                                      <>
                                        <p className="genral-text-left-side">
                                          viii. Visa Type*
                                        </p>
                                        <Field
                                          disabled={isEditting}
                                          as="select"
                                          required={isReq && isChildVisa}
                                          name={`phase4.family.childDetails[${index}].childVisaType`}
                                          id={`phase4.family.childDetails[${index}].childVisaType`}
                                          style={
                                            errors?.phase4?.family
                                              ?.childDetails &&
                                            errors.phase4.family.childDetails[
                                              index
                                            ] &&
                                            errors.phase4.family.childDetails[
                                              index
                                            ].childVisaType &&
                                            touched?.phase4?.family
                                              ?.childDetails &&
                                            touched.phase4.family.childDetails[
                                              index
                                            ] &&
                                            touched.phase4.family.childDetails[
                                              index
                                            ].childVisaType
                                              ? { border: "1px solid red" }
                                              : null
                                          }
                                          placeholder="Select"
                                          className="genral-input-left-side-selector"
                                        >
                                          <option value="">Type of visa</option>
                                          <option value="Visit">Visit</option>
                                          <option value="Study">Study</option>
                                          <option value="Work">Work</option>
                                          <option value="Settlement">
                                            Settlement{" "}
                                          </option>
                                          <option value="Other">Other</option>
                                        </Field>

                                        <p className="genral-text-left-side">
                                          ix. Visa Issued Date*
                                        </p>
                                        <Field
                                          disabled={isEditting}
                                          required={isReq && isChildVisa}
                                          type="date"
                                          className="genral-input-left-side"
                                          name={`phase4.family.childDetails[${index}].childVisaIssueDate`}
                                          id={`phase4.family.childDetails[${index}].childVisaIssueDate`}
                                          style={
                                            errors?.phase4?.family
                                              ?.childDetails &&
                                            errors.phase4.family.childDetails[
                                              index
                                            ] &&
                                            errors.phase4.family.childDetails[
                                              index
                                            ].childVisaIssueDate &&
                                            touched?.phase4?.family
                                              ?.childDetails &&
                                            touched.phase4.family.childDetails[
                                              index
                                            ] &&
                                            touched.phase4.family.childDetails[
                                              index
                                            ].childVisaIssueDate
                                              ? { border: "1px solid red" }
                                              : null
                                          }
                                        />

                                        <p className="genral-text-left-side">
                                          x. Visa Expiry Date*
                                        </p>
                                        <Field
                                          disabled={isEditting}
                                          required={isReq && isChildVisa}
                                          type="date"
                                          className="genral-input-left-side"
                                          name={`phase4.family.childDetails[${index}].childVisaExpiryDate`}
                                          id={`phase4.family.childDetails[${index}].childVisaExpiryDate`}
                                          style={
                                            errors?.phase4?.family
                                              ?.childDetails &&
                                            errors.phase4.family.childDetails[
                                              index
                                            ] &&
                                            errors.phase4.family.childDetails[
                                              index
                                            ].childVisaExpiryDate &&
                                            touched?.phase4?.family
                                              ?.childDetails &&
                                            touched.phase4.family.childDetails[
                                              index
                                            ] &&
                                            touched.phase4.family.childDetails[
                                              index
                                            ].childVisaExpiryDate
                                              ? { border: "1px solid red" }
                                              : null
                                          }
                                        />
                                      </>
                                    )}

                                    <br />
                                    <button
                                      type="button"
                                      className="Close-btn-modal"
                                      onClick={() => handleClose(initialValues)}
                                    >
                                      Close
                                    </button>
                                    {/* <button
                                      type="submit"
                                      className="Save-btn-modal"
                                    >
                                      Save
                                    </button> */}
                                    {selectedChild < childOptions.length && (
                                      <button
                                        type="button"
                                        onClick={() => changeChild(index + 1)}
                                        className="Save-btn-modal"
                                      >
                                        Next
                                      </button>
                                    )}
                                  </div>
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* <FamilyInfoForm
                    showModal={showModal}
                    setShowModal={setShowModal}
                    childOptions={childOptions}
                    initialValues={initialValues}
                    errors={errors}
                  /> */}
                </>
              )}
            </div>

            {/* Right Side  */}
            <div className="right-side-phase">
              {marriedStatus != "single" && (
                <>
                  <p className="genral-text-left-side">
                    13. Have you been married before ?*
                  </p>

                  <div className="checkbox-phase1">
                    <p className="yes-check-text">Yes</p>
                    <input
                      disabled={isEditting}
                      defaultChecked={isMarriedBefore}
                      required={marriedStatus != "single"}
                      type="radio"
                      className="yes-check"
                      name="phase4.family.isMarriedBefore"
                      id="phase4.family.isMarriedBeforeYes"
                      onChange={(e) => {
                        setFieldValue("phase4.family.isMarriedBefore", true);
                        setIsMarriedBefore(true);
                      }}
                    />
                    <p className="no-check-text">No</p>
                    <input
                      disabled={isEditting}
                      defaultChecked={!isMarriedBefore}
                      required={marriedStatus != "single"}
                      type="radio"
                      className="no-check"
                      name="phase4.family.isMarriedBefore"
                      id="phase4.family.isMarriedBeforeNo"
                      onChange={(e) => {
                        setFieldValue("phase4.family.isMarriedBefore", false);
                        setIsMarriedBefore(false);
                        setFieldValue("phase4.family.exName", "");
                        setFieldValue("phase4.family.exDob", "");
                        setFieldValue("phase4.family.exNationality", "");
                        setFieldValue("phase4.family.marriageDateWithEx", "");
                        setFieldValue("phase4.family.divorceDateWithEx", "");
                        setFieldValue("phase4.family.divorceDateWithEx", "");
                      }}
                    />
                  </div>

                  {isMarriedBefore && (
                    <>
                      <p className="genral-text-left-side">i. Name of Ex*</p>
                      <Field
                        disabled={isEditting}
                        required={isMarriedBefore}
                        type="text"
                        className="genral-input-left-side"
                        placeholder="Type County"
                        name="phase4.family.exName"
                        id="phase4.family.exName"
                        style={
                          errors?.phase4?.family?.exName &&
                          touched?.phase4?.family?.exName && {
                            border: "1px solid red",
                          }
                        }
                      />

                      <p className="genral-text-left-side">
                        ii. Date of Birth (mm/dd/yyyy)*
                      </p>
                      <Field
                        disabled={isEditting}
                        required={isMarriedBefore}
                        type="date"
                        className="genral-input-left-side"
                        name="phase4.family.exDob"
                        id="phase4.family.exDob"
                        style={
                          errors?.phase4?.family?.exDob &&
                          touched?.phase4?.family?.exDob && {
                            border: "1px solid red",
                          }
                        }
                      />

                      <p className="genral-text-left-side">
                        iii. Nationality ?*
                      </p>
                      <SelectCountry
                        disabled={isEditting}
                        notReq={isMarriedBefore}
                        className="genral-input-left-side-selector"
                        name="phase4.family.exNationality"
                        id="phase4.family.exNationality"
                        style={
                          errors?.phase4?.family?.exNationality &&
                          touched?.phase4?.family?.exNationality && {
                            border: "1px solid red",
                          }
                        }
                      />

                      <p className="genral-text-left-side">
                        iv. Date of Marriage (mm/dd/yyyy)*
                      </p>
                      <Field
                        disabled={isEditting}
                        required={isMarriedBefore}
                        type="date"
                        className="genral-input-left-side"
                        name="phase4.family.marriageDateWithEx"
                        id="phase4.family.marriageDateWithEx"
                        style={
                          errors?.phase4?.family?.marriageDateWithEx &&
                          touched?.phase4?.family?.marriageDateWithEx && {
                            border: "1px solid red",
                          }
                        }
                      />

                      <p className="genral-text-left-side">
                        v. Date of Divorce (mm/dd/yyyy)*
                      </p>
                      <Field
                        disabled={isEditting}
                        required={isMarriedBefore}
                        type="date"
                        className="genral-input-left-side"
                        name="phase4.family.divorceDateWithEx"
                        id="phase4.family.divorceDateWithEx"
                        style={
                          errors?.phase4?.family?.divorceDateWithEx &&
                          touched?.phase4?.family?.divorceDateWithEx && {
                            border: "1px solid red",
                          }
                        }
                      />
                    </>
                  )}

                  <p className="genral-text-left-side">
                    14. Has your current partner been married before?*
                  </p>

                  <div className="checkbox-phase1">
                    <p className="yes-check-text">Yes</p>
                    <input
                      disabled={isEditting}
                      defaultChecked={isCurrentPartnerMarriedBefore}
                      type="radio"
                      className="yes-check"
                      name="phase4.family.isCurrentPartnerMarriedBefore"
                      id="phase4.family.isCurrentPartnerMarriedBeforeYes"
                      onChange={(e) => {
                        setFieldValue(
                          "phase4.family.isCurrentPartnerMarriedBefore",
                          true
                        );
                        setIsCurrentPartnerMarriedBefore(true);
                      }}
                    />
                    <p className="no-check-text">No</p>
                    <input
                      disabled={isEditting}
                      defaultChecked={!isCurrentPartnerMarriedBefore}
                      type="radio"
                      className="no-check"
                      name="phase4.family.isCurrentPartnerMarriedBefore"
                      id="phase4.family.isCurrentPartnerMarriedBeforeNo"
                      onChange={(e) => {
                        setFieldValue(
                          "phase4.family.isCurrentPartnerMarriedBefore",
                          false
                        );

                        setIsCurrentPartnerMarriedBefore(false);
                      }}
                    />
                  </div>

                  {isCurrentPartnerMarriedBefore && (
                    <>
                      <p className="genral-text-left-side">
                        i. Name of Ex-Partner*
                      </p>
                      <Field
                        disabled={isEditting}
                        required={isCurrentPartnerMarriedBefore}
                        type="text"
                        className="genral-input-left-side"
                        placeholder="Type County"
                        name="phase4.family.currentPartnerExName"
                        id="phase4.family.currentPartnerExName"
                        style={
                          errors?.phase4?.family?.currentPartnerExName &&
                          touched?.phase4?.family?.currentPartnerExName && {
                            border: "1px solid red",
                          }
                        }
                      />

                      <p className="genral-text-left-side">
                        ii. Date of Birth*
                      </p>
                      <Field
                        disabled={isEditting}
                        required={isCurrentPartnerMarriedBefore}
                        type="date"
                        className="genral-input-left-side"
                        name="phase4.family.currentPartnerExDob"
                        id="phase4.family.currentPartnerExDob"
                        style={
                          errors?.phase4?.family?.currentPartnerExDob &&
                          touched?.phase4?.family?.currentPartnerExDob && {
                            border: "1px solid red",
                          }
                        }
                      />

                      <p className="genral-text-left-side">
                        iii. Nationality ?*
                      </p>
                      <SelectCountry
                        disabled={isEditting}
                        notReq={isCurrentPartnerMarriedBefore}
                        className="genral-input-left-side-selector"
                        name="phase4.family.currentPartnerExNationality"
                        id="phase4.family.currentPartnerExNationality"
                        style={
                          errors?.phase4?.family?.currentPartnerExNationality &&
                          touched?.phase4?.family
                            ?.currentPartnerExNationality && {
                            border: "1px solid red",
                          }
                        }
                      />

                      <p className="genral-text-left-side">
                        iv. Date of Marriage*
                      </p>
                      <Field
                        disabled={isEditting}
                        required={isCurrentPartnerMarriedBefore}
                        type="date"
                        className="genral-input-left-side"
                        name="phase4.family.currentPartnerExMarriageDate"
                        id="phase4.family.currentPartnerExMarriageDate"
                        style={
                          errors?.phase4?.family
                            ?.currentPartnerExMarriageDate &&
                          touched?.phase4?.family
                            ?.currentPartnerExMarriageDate && {
                            border: "1px solid red",
                          }
                        }
                      />

                      <p className="genral-text-left-side">
                        v. Date of Divorce*
                      </p>
                      <Field
                        disabled={isEditting}
                        required={isCurrentPartnerMarriedBefore}
                        type="date"
                        className="genral-input-left-side"
                        name="phase4.family.currentPartnerExDivorceDate"
                        id="phase4.family.currentPartnerExDivorceDate"
                        style={
                          errors?.phase4?.family?.currentPartnerExDivorceDate &&
                          touched?.phase4?.family
                            ?.currentPartnerExDivorceDate && {
                            border: "1px solid red",
                          }
                        }
                      />
                    </>
                  )}
                </>
              )}

              <p className="genral-text-left-side">
                15. What family/friends do you have in your home country ?*
              </p>

              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  defaultChecked={isFamilyInHome}
                  type="radio"
                  className="yes-check"
                  name="phase4.family.isFamilyFriendsInHomeCountry"
                  id="phase4.family.isFamilyFriendsInHomeCountry"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.family.isFamilyFriendsInHomeCountry",
                      true
                    );
                    setIsFamilyInHome(true);
                  }}
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  defaultChecked={!isFamilyInHome}
                  type="radio"
                  className="no-check"
                  name="phase4.family.isFamilyFriendsInHomeCountry"
                  id="phase4.family.isFamilyFriendsInHomeCountryNo"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.family.isFamilyFriendsInHomeCountry",
                      false
                    );
                    setIsFamilyInHome(false);
                  }}
                />
              </div>

              {isFamilyInHome && (
                <>
                  <p className="genral-text-left-side">i. Name of Relative*</p>
                  <Field
                    disabled={isEditting}
                    required={isFamilyInHome}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type County"
                    name="phase4.family.relativeName"
                    id="phase4.family.relativeName"
                    style={
                      errors?.phase4?.family?.relativeName &&
                      touched?.phase4?.family?.relativeName && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">ii. Relationship*</p>
                  <Field
                    disabled={isEditting}
                    required={isFamilyInHome}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type County"
                    name="phase4.family.relativeRelationship"
                    id="phase4.family.relativeRelationship"
                    style={
                      errors?.phase4?.family?.relativeRelationship &&
                      touched?.phase4?.family?.relativeRelationship && {
                        border: "1px solid red",
                      }
                    }
                  />
                </>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginTop: "1.5rem",
                }}
              >
                <button
                  disabled={isLoading}
                  type="button"
                  className="back-button-new"
                  onClick={handleBackClick}
                  style={{ opacity: "0", cursor: "default" }}
                >
                  Back
                </button>
                <button
                  disabled={isLoading}
                  ref={buttonRef}
                  type="submit"
                  className="Next-button"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "0",
                    opacity: "0",
                    cursor: "default",
                  }}
                >
                  {isLoading ? <Loader /> : "Next"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FamilyForm;
