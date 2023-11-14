import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  useGetCountriesQuery,
  usePostGeneralMutation,
  usePostPhase4Mutation,
} from "../../services/api/applicationApi";
import SelectCountry from "../SelectCountry";
import { generalSchema } from "../../utils/ValidationSchema";
import { toastError } from "../Toast";
import Loader from "../Loader";

const GeneralForm = ({
  data,
  setActiveTab,
  initialValues,
  refetch,
  isEditting,
  buttonRef,
}) => {
  const application = data?.application;
  // console.log("General Phase 4", initialValues);

  // const [postPhase4, res] = usePostPhase4Mutation();
  const [postGeneral, res] = usePostGeneralMutation();
  const { isLoading, isSuccess, error } = res;

  useMemo(() => {
    if (isSuccess) {
      refetch();
      setActiveTab("/Accomodation");
    }
  }, [isSuccess]);

  useMemo(() => {
    if (error) {
      toastError("Something went wrong");
    }
  }, [error]);

  console.log("Button ref", buttonRef);

  const handleSubmitData = async (values) => {
    console.log(values);
    // console.log("Button ref", buttonRef);
    await postGeneral({
      data: values.phase4.general,
      applicationId: application?._id,
    });
  };

  const [isKnownByOtherName, setIsKnownByOtherName] = useState(
    initialValues?.phase4?.general?.isKnownByOtherName
  );
  const [isOtherNationality, setIsOtherNationality] = useState(
    initialValues?.phase4?.general?.isOtherNationality
  );
  const [isNationalIDCard, setIsNationalIDCard] = useState(
    initialValues?.phase4?.general?.isNationalIDCard
  );
  const [isBrp, setIsBrp] = useState(initialValues?.phase4?.general?.isBrp);
  const [isUKNINumber, setIsUKNINumber] = useState(
    initialValues?.phase4?.general?.isUKNINumber
  );
  const [isUKDrivingLicense, setIsUKDrivingLicense] = useState(
    initialValues?.phase4?.general?.isUKDrivingLicense
  );

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitData}
        validationSchema={generalSchema}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form
            style={{
              display: "flex",
              width: "100%",
              gap: "2rem",
            }}
          >
            <div className="left-side-phase">
              <>
                <p className="genral-text-left-side">1.Full Name*</p>
                <Field
                  disabled={isEditting}
                  type="text"
                  className="genral-input-left-side"
                  placeholder="Jhon Leo"
                  name="phase4.general.fullName"
                  id="phase4.general.fullName"
                  style={
                    errors?.phase4?.general?.fullName &&
                    touched?.phase4?.general?.fullName && {
                      border: "1px solid red",
                    }
                  }
                />
                <ErrorMessage
                  name="phase4.general.fullName"
                  component="div"
                  style={{
                    color: "red",
                    fontSize: ".8rem",
                    marginLeft: "7px",
                  }}
                />
                <p className="genral-text-left-side">
                  2.Have you been known by any other names ?*
                </p>

                <div className="checkbox-phase1">
                  <p className="yes-check-text">Yes</p>
                  <input
                    disabled={isEditting}
                    defaultChecked={isKnownByOtherName}
                    type="radio"
                    name="phase4.general.isKnownByOtherName"
                    id="phase4.general.isKnownByOtherName"
                    onChange={(e) => {
                      setFieldValue("phase4.general.isKnownByOtherName", true);
                      setIsKnownByOtherName(true);
                    }}
                    className="yes-check"
                  />
                  <p className="no-check-text">No</p>
                  <input
                    disabled={isEditting}
                    defaultChecked={!isKnownByOtherName}
                    type="radio"
                    name="phase4.general.isKnownByOtherName"
                    id="phase4.general.isKnownByOtherName"
                    onChange={(e) => {
                      setFieldValue("phase4.general.isKnownByOtherName", false);
                      setFieldValue("phase4.general.previousName", "");
                      setFieldValue("phase4.general.prevNameFrom", "");
                      setFieldValue("phase4.general.prevNameTo", "");
                      setIsKnownByOtherName(false);
                    }}
                    className="no-check"
                  />
                </div>

                {isKnownByOtherName && (
                  <>
                    <p className="genral-text-left-side">i. Previous Name*</p>
                    <Field
                      disabled={isEditting}
                      required={isKnownByOtherName}
                      type="text"
                      className="genral-input-left-side"
                      placeholder="Jhon Leo"
                      name="phase4.general.previousName"
                      id="phase4.general.previousName"
                      style={
                        errors.previousName &&
                        touched.previousName && { border: "1px solid red" }
                      }
                    />
                    <p className="genral-text-left-side">ii. From*</p>
                    <Field
                      disabled={isEditting}
                      required={isKnownByOtherName}
                      type="date"
                      className="genral-input-left-side"
                      name="phase4.general.prevNameFrom"
                      id="phase4.general.prevNameFrom"
                      style={
                        errors.prevNameFrom &&
                        touched.prevNameFrom && { border: "1px solid red" }
                      }
                    />
                    <p className="genral-text-left-side">iii. To*</p>
                    <Field
                      disabled={isEditting}
                      required={isKnownByOtherName}
                      type="date"
                      className="genral-input-left-side"
                      name="phase4.general.prevNameTo"
                      id="phase4.general.prevNameTo"
                      style={
                        errors.prevNameTo &&
                        touched.prevNameTo && { border: "1px solid red" }
                      }
                    />
                  </>
                )}

                <p className="genral-text-left-side">3.Country of Birth*</p>
                <SelectCountry
                  disabled={isEditting}
                  name="phase4.general.countryOfBirth"
                  id="phase4.general.countryOfBirth"
                  className="genral-input-left-side-selector"
                ></SelectCountry>

                <p className="genral-text-left-side">4.Place of Birth*</p>
                <SelectCountry
                  disabled={isEditting}
                  name="phase4.general.placeOfBirth"
                  id="phase4.general.placeOfBirth"
                  className="genral-input-left-side-selector"
                ></SelectCountry>
                <p className="genral-text-left-side">
                  6.Any other Nationalities ?
                </p>

                <div className="checkbox-phase1">
                  <p className="yes-check-text">Yes</p>
                  <input
                    disabled={isEditting}
                    defaultChecked={isOtherNationality}
                    type="radio"
                    name="phase4.general.isOtherNationality"
                    id="phase4.general.isOtherNationality"
                    onChange={(e) => {
                      setFieldValue("phase4.general.isOtherNationality", true);
                      setIsOtherNationality(true);
                    }}
                    className="yes-check"
                  />
                  <p className="no-check-text">No</p>
                  <input
                    disabled={isEditting}
                    defaultChecked={!isOtherNationality}
                    name="phase4.general.isOtherNationality"
                    id="phase4.general.isOtherNationality"
                    onChange={(e) => {
                      setFieldValue("phase4.general.isOtherNationality", false);
                      setFieldValue("phase4.general.otherNationality", "");
                      setFieldValue("phase4.general.nationalityFrom", "");
                      setFieldValue("phase4.general.nationalityUntill", "");
                      setIsOtherNationality(false);
                    }}
                    type="radio"
                    className="no-check"
                  />
                </div>
                {isOtherNationality && (
                  <>
                    <p className="genral-text-left-side">
                      i. Other Nationality*
                    </p>
                    <SelectCountry
                      disabled={isEditting}
                      name="phase4.general.otherNationality"
                      id="phase4.general.otherNationality"
                      className="genral-input-left-side-selector"
                      style={{
                        errors: errors.otherNationality,
                        touched: touched.otherNationality,
                      }}
                    ></SelectCountry>
                    <p className="genral-text-left-side">ii. From*</p>
                    <Field
                      disabled={isEditting}
                      required={isOtherNationality}
                      type="date"
                      className="genral-input-left-side"
                      name="phase4.general.nationalityFrom"
                      id="phase4.general.nationalityFrom"
                      style={
                        errors.nationalityFrom &&
                        touched.nationalityFrom && {
                          border: "1px solid red",
                        }
                      }
                    />

                    <p className="genral-text-left-side">iii. Until*</p>
                    <Field
                      disabled={isEditting}
                      required={isOtherNationality}
                      type="date"
                      className="genral-input-left-side"
                      name="phase4.general.nationalityUntill"
                      id="phase4.general.nationalityUntill"
                      style={
                        errors.nationalityUntill &&
                        touched.nationalityUntill && {
                          border: "1px solid red",
                        }
                      }
                    />
                  </>
                )}

                <p className="genral-text-left-side">
                  7.Current passport number*
                </p>
                <Field
                  disabled={isEditting}
                  type="text"
                  placeholder="Current Passport Number"
                  className="genral-input-left-side"
                  name="phase4.general.currentPassportNumber"
                  id="phase4.general.currentPassportNumber"
                  style={
                    errors?.phase4?.general?.currentPassportNumber &&
                    touched?.phase4?.general?.currentPassportNumber && {
                      border: "1px solid red",
                    }
                  }
                />
                <ErrorMessage
                  name="phase4.general.currentPassportNumber"
                  component="div"
                  style={{
                    color: "red",
                    fontSize: ".8rem",
                    marginLeft: "7px",
                  }}
                />

                <p className="genral-text-left-side">8.Issue date*</p>
                <Field
                  disabled={isEditting}
                  required
                  type="date"
                  className="genral-input-left-side"
                  name="phase4.general.passportIssueDate"
                  id="phase4.general.passportIssueDate"
                  style={
                    errors?.phase4?.general?.passportIssueDate &&
                    touched?.phase4?.general?.passportIssueDate && {
                      border: "1px solid red",
                    }
                  }
                />
                <ErrorMessage
                  name="phase4.general.passportIssueDate"
                  component="div"
                  style={{
                    color: "red",
                    fontSize: ".8rem",
                    marginLeft: "7px",
                  }}
                />

                <p className="genral-text-left-side">9.Expiry date*</p>
                <Field
                  disabled={isEditting}
                  type="date"
                  className="genral-input-left-side"
                  name="phase4.general.passportExpiryDate"
                  id="phase4.general.passportExpiryDate"
                  style={
                    errors?.phase4?.general?.passportExpiryDate &&
                    touched?.phase4?.general?.passportExpiryDate && {
                      border: "1px solid red",
                    }
                  }
                />
                <ErrorMessage
                  name="phase4.general.passportExpiryDate"
                  component="div"
                  style={{
                    color: "red",
                    fontSize: ".8rem",
                    marginLeft: "7px",
                  }}
                />

                <p className="genral-text-left-side">10.Issuing authority*</p>
                <Field
                  disabled={isEditting}
                  type="text"
                  className="genral-input-left-side"
                  placeholder="Issuing autority"
                  name="phase4.general.issuingAuthority"
                  id="phase4.general.issuingAuthority"
                  style={
                    errors?.phase4?.general?.issuingAuthority &&
                    touched?.phase4?.general?.issuingAuthority && {
                      border: "1px solid red",
                    }
                  }
                />
                <ErrorMessage
                  name="phase4.general.issuingAuthority"
                  component="div"
                  style={{
                    color: "red",
                    fontSize: ".8rem",
                    marginLeft: "7px",
                  }}
                />

                <p className="genral-text-left-side">11.Place of issue*</p>
                <SelectCountry
                  disabled={isEditting}
                  name="phase4.general.passportPlaceOfIssue"
                  id="phase4.general.passportPlaceOfIssue"
                  className="genral-input-left-side-selector"
                ></SelectCountry>

                <p className="genral-text-left-side">
                  12.Do you have a national ID card for your country of
                  nationality ?*
                </p>

                <div className="checkbox-phase1">
                  <p className="yes-check-text">Yes</p>
                  <input
                    disabled={isEditting}
                    defaultChecked={isNationalIDCard}
                    name="phase4.general.isNationalIDCard"
                    id="phase4.general.isNationalIDCard"
                    onChange={(e) => {
                      setFieldValue("phase4.general.isNationalIDCard", true);
                      setIsNationalIDCard(true);
                    }}
                    type="radio"
                    className="yes-check"
                  />
                  <p className="no-check-text">No</p>
                  <input
                    disabled={isEditting}
                    defaultChecked={!isNationalIDCard}
                    name="phase4.general.isNationalIDCard"
                    id="phase4.general.isNationalIDCard"
                    onChange={(e) => {
                      setFieldValue("phase4.general.isNationalIDCard", false);
                      setFieldValue("phase4.general.idCardNumber", "");
                      setFieldValue("phase4.general.idCardIssueDate", "");
                      setIsNationalIDCard(false);
                    }}
                    type="radio"
                    className="no-check"
                  />
                </div>

                {isNationalIDCard && (
                  <>
                    <p className="genral-text-left-side">
                      i. National Id card Number*
                    </p>
                    <Field
                      disabled={isEditting}
                      required={isNationalIDCard}
                      type="text"
                      className="genral-input-left-side"
                      placeholder="Type Number"
                      name="phase4.general.idCardNumber"
                      id="phase4.general.idCardNumber"
                      style={
                        errors.idCardNumber &&
                        touched.idCardNumber && { border: "1px solid red" }
                      }
                    />
                    <p className="genral-text-left-side">ii. Date of issue*</p>
                    <Field
                      disabled={isEditting}
                      required={isNationalIDCard}
                      type="date"
                      className="genral-input-left-side"
                      name="phase4.general.idCardIssueDate"
                      id="phase4.general.idCardIssueDate"
                      style={
                        errors.idCardIssueDate &&
                        touched.idCardIssueDate && { border: "1px solid red" }
                      }
                    />
                  </>
                )}
              </>
            </div>

            {/* Right Side  */}
            <div className="right-side-phase">
              <p className="genral-text-right-side">i. Do you have a BRP?*</p>

              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  defaultChecked={isBrp}
                  name="phase4.general.isBrp"
                  id="phase4.general.isBrp"
                  onChange={(e) => {
                    setFieldValue("phase4.general.isBrp", true);
                    setIsBrp(true);
                  }}
                  type="radio"
                  className="yes-check"
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  defaultChecked={!isBrp}
                  name="phase4.general.isBrp"
                  id="phase4.general.isBrp"
                  onChange={(e) => {
                    setFieldValue("phase4.general.isBrp", false);
                    setFieldValue("phase4.general.brpNumber", "");
                    setFieldValue("phase4.general.brpIssueDate", "");
                    setIsBrp(false);
                  }}
                  type="radio"
                  className="no-check"
                />
              </div>

              {isBrp && (
                <>
                  <p className="genral-text-right-side">ii. BRP Number*</p>
                  <Field
                    disabled={isEditting}
                    type="text"
                    className="genral-input-right-side"
                    placeholder="Type Number"
                    required={isBrp}
                    name="phase4.general.brpNumber"
                    id="phase4.general.brpNumber"
                    style={
                      errors.brpNumber &&
                      touched.brpNumber && { border: "1px solid red" }
                    }
                  />

                  <p className="genral-text-right-side">iii. Date of issue*</p>
                  <Field
                    disabled={isEditting}
                    type="date"
                    className="genral-input-right-side"
                    required={isBrp}
                    name="phase4.general.brpIssueDate"
                    id="phase4.general.brpIssueDate"
                    style={
                      errors.brpIssueDate &&
                      touched.brpIssueDate && { border: "1px solid red" }
                    }
                  />
                </>
              )}

              <p className="genral-text-right-side">13.Name of Mother*</p>
              <Field
                disabled={isEditting}
                type="text"
                className="genral-input-right-side"
                placeholder="Jhon Leo"
                name="phase4.general.motherName"
                id="phase4.general.motherName"
                style={
                  errors?.phase4?.general?.motherName &&
                  touched?.phase4?.general?.motherName && {
                    border: "1px solid red",
                  }
                }
              />
              <ErrorMessage
                name="phase4.general.motherName"
                component="div"
                style={{
                  color: "red",
                  fontSize: ".8rem",
                  marginLeft: "7px",
                }}
              />

              <p className="genral-text-right-side">14.Date of Birth*</p>
              <Field
                disabled={isEditting}
                type="date"
                className="genral-input-right-side"
                name="phase4.general.motherDob"
                id="phase4.general.motherDob"
                style={
                  errors?.phase4?.general?.motherDob &&
                  touched?.phase4?.general?.motherDob && {
                    border: "1px solid red",
                  }
                }
              />
              <p className="genral-text-right-side">15.Nationality*</p>
              <SelectCountry
                disabled={isEditting}
                name="phase4.general.motherNationality"
                id="phase4.general.motherNationality"
                className="genral-input-left-side-selector"
              ></SelectCountry>
              <p className="genral-text-right-side">16.Select Country*</p>
              <SelectCountry
                disabled={isEditting}
                name="phase4.general.motherCountry"
                id="phase4.general.motherCountry"
                className="genral-input-left-side-selector"
              ></SelectCountry>
              <p className="genral-text-right-side">
                17.Mother's Place of Birth*
              </p>
              <SelectCountry
                disabled={isEditting}
                name="phase4.general.motherPlaceOfBirth"
                id="phase4.general.motherPlaceOfBirth"
                className="genral-input-left-side-selector"
              ></SelectCountry>
              <p className="genral-text-right-side">18.Name of Father*</p>
              <Field
                disabled={isEditting}
                type="text"
                className="genral-input-right-side"
                placeholder="Jhon Leo"
                name="phase4.general.fatherName"
                id="phase4.general.fatherName"
                style={
                  errors?.phase4?.general?.fatherName &&
                  touched?.phase4?.general?.fatherName && {
                    border: "1px solid red",
                  }
                }
              />
              <p className="genral-text-right-side">19.Date of Birth*</p>
              <Field
                disabled={isEditting}
                type="date"
                className="genral-input-right-side"
                name="phase4.general.fatherDob"
                id="phase4.general.fatherDob"
                style={
                  errors?.phase4?.general?.fatherDob &&
                  touched?.phase4?.general?.fatherDob && {
                    border: "1px solid red",
                  }
                }
              />
              <p className="genral-text-right-side">20.Nationality*</p>
              <SelectCountry
                disabled={isEditting}
                name="phase4.general.fatherNationality"
                id="phase4.general.fatherNationality"
                className="genral-input-left-side-selector"
              ></SelectCountry>
              <p className="genral-text-right-side">21.Select Country*</p>
              <SelectCountry
                disabled={isEditting}
                name="phase4.general.fatherCountry"
                id="phase4.general.fatherCountry"
                className="genral-input-left-side-selector"
              ></SelectCountry>
              <p className="genral-text-right-side">
                22.Father's Place of Birth*
              </p>
              <SelectCountry
                disabled={isEditting}
                name="phase4.general.fatherPlaceOfBirth"
                id="phase4.general.fatherPlaceOfBirth"
                className="genral-input-left-side-selector"
              ></SelectCountry>

              <p className="genral-text-right-side">
                23.Do you have a UK NI Number ?*
              </p>

              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  required
                  defaultChecked={isUKNINumber}
                  name="phase4.general.isUKNINumber"
                  id="phase4.general.isUKNINumber"
                  onChange={(e) => {
                    setFieldValue("phase4.general.isUKNINumber", true);
                    setIsUKNINumber(true);
                  }}
                  type="radio"
                  className="yes-check"
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  required
                  defaultChecked={!isUKNINumber}
                  name="phase4.general.isUKNINumber"
                  id="phase4.general.isUKNINumber"
                  onChange={(e) => {
                    setFieldValue("phase4.general.isUKNINumber", false);
                    setFieldValue("phase4.general.ukNINumber", "");
                    setFieldValue("phase4.general.niNumberIssueDate", "");
                    setIsUKNINumber(false);
                  }}
                  type="radio"
                  className="no-check"
                />
              </div>

              {isUKNINumber && (
                <>
                  <p className="genral-text-right-side">i. UK NI Number*</p>
                  <Field
                    disabled={isEditting}
                    required={isUKNINumber}
                    type="text"
                    className="genral-input-right-side"
                    placeholder="Type Number"
                    name="phase4.general.ukNINumber"
                    id="phase4.general.ukNINumber"
                    style={
                      errors.ukNINumber &&
                      touched.ukNINumber && { border: "1px solid red" }
                    }
                  />

                  <p className="genral-text-right-side">ii. Date of issue*</p>
                  <Field
                    disabled={isEditting}
                    required={isUKNINumber}
                    type="date"
                    className="genral-input-right-side"
                    name="phase4.general.niNumberIssueDate"
                    id="phase4.general.niNumberIssueDate"
                    style={
                      errors.niNumberIssueDate &&
                      touched.niNumberIssueDate && { border: "1px solid red" }
                    }
                  />
                </>
              )}

              <p className="genral-text-right-side">
                24.Do you have a UK driving license ?*
              </p>

              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  defaultChecked={isUKDrivingLicense}
                  name="phase4.general.isUKDrivingLicense"
                  id="phase4.general.isUKDrivingLicense"
                  onChange={(e) => {
                    setFieldValue("phase4.general.isUKDrivingLicense", true);
                    setIsUKDrivingLicense(true);
                  }}
                  type="radio"
                  className="yes-check"
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  defaultChecked={!isUKDrivingLicense}
                  name="phase4.general.isUKDrivingLicense"
                  id="phase4.general.isUKDrivingLicense"
                  onChange={(e) => {
                    setFieldValue("phase4.general.isUKDrivingLicense", false);
                    setFieldValue("phase4.general.ukDrivingLicenseNumber", "");
                    setFieldValue("phase4.general.ukLicenseIssueDate", "");
                    setIsUKDrivingLicense(false);
                  }}
                  type="radio"
                  className="no-check"
                />
              </div>

              {isUKDrivingLicense && (
                <>
                  <p className="genral-text-right-side">
                    i. UK driving license Number*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={isUKDrivingLicense}
                    type="text"
                    className="genral-input-right-side"
                    placeholder="Type Number"
                    name="phase4.general.ukDrivingLicenseNumber"
                    id="phase4.general.ukDrivingLicenseNumber"
                    style={
                      errors.ukDrivingLicenseNumber &&
                      touched.ukDrivingLicenseNumber && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-right-side">ii. Date of issue*</p>
                  <Field
                    disabled={isEditting}
                    required={isUKDrivingLicense}
                    type="date"
                    className="genral-input-right-side"
                    name="phase4.general.ukLicenseIssueDate"
                    id="phase4.general.ukLicenseIssueDate"
                    style={
                      errors.ukLicenseIssueDate &&
                      touched.ukLicenseIssueDate && {
                        border: "1px solid red",
                      }
                    }
                  />
                </>
              )}

              <p className="genral-text-right-side">25.Email Address*</p>
              <Field
                disabled={isEditting}
                type="email"
                className="genral-input-right-side"
                placeholder="Email"
                name="phase4.general.email"
                id="phase4.general.email"
                style={
                  errors?.phase4?.general?.email &&
                  touched?.phase4?.general?.email && {
                    border: "1px solid red",
                  }
                }
              />
              <ErrorMessage
                name="phase4.general.email"
                component="div"
                style={{
                  color: "red",
                  fontSize: ".8rem",
                  marginLeft: "7px",
                }}
              />
              <p className="genral-text-right-side">26.Mobile Number*</p>
              <Field
                disabled={isEditting}
                type="tel"
                className="genral-input-right-side"
                placeholder="Mobile Number"
                name="phase4.general.mobileNumber"
                id="phase4.general.mobileNumber"
                style={
                  errors?.phase4?.general?.mobileNumber &&
                  touched?.phase4?.general?.mobileNumber && {
                    border: "1px solid red",
                  }
                }
              />
              <ErrorMessage
                name="phase4.general.mobileNumber"
                component="div"
                style={{
                  color: "red",
                  fontSize: ".8rem",
                  marginLeft: "7px",
                }}
              />

              <button
                ref={buttonRef}
                disabled={isLoading}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                type="submit"
                className="Next-button-genral"
              >
                {isLoading ? <Loader /> : "Next"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default GeneralForm;
