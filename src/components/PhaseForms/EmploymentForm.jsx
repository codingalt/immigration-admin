import React, { useEffect, useMemo, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  useGetCountriesQuery,
  usePostEmploymentMutation,
  usePostPhase4Mutation,
} from "../../services/api/applicationApi";
import { toastError } from "../Toast";
import Loader from "../Loader";
import SelectCountry from "../SelectCountry";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const EmploymentForm = ({
  data,
  setActiveTab,
  initialValues,
  refetch,
  isEditting,
  buttonRef,
}) => {
  const application = data?.application;
  console.log("Employment Phase 4", initialValues);

  // const [postPhase4, res] = usePostPhase4Mutation();
  const [postEmployment, res] = usePostEmploymentMutation();
  const { isLoading, isSuccess, error } = res;

  const [isEmployed, setIsEmployed] = useState(
    initialValues?.phase4?.employment?.isEmployed
  );
  const [employerTelephone, setEmployerTelephone] = useState(
    initialValues?.phase4?.employment?.employerTelephone
  );

  useMemo(() => {
    if (isSuccess) {
      refetch();
      // setActiveTab("/maintenance");
    }
  }, [isSuccess]);

  useMemo(() => {
    if (error) {
      toastError("Something went wrong");
    }
  }, [error]);

  const handleSubmitData = async (values) => {
    console.log(values);
    if (
      isEmployed &&
      values?.phase4?.employment?.employerTelephone.length < 5
    ) {
      toastError("Please Enter a Valid Employer Telephone Number");
      return;
    }
    await postEmployment({
      data: values.phase4.employment,
      applicationId: application?._id,
    });
    console.log("submitted", values.phase4.employment);
  };

  const handleBackClick = () => {
    setActiveTab("/education");
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmitData}>
        {({ setFieldValue, errors, touched }) => (
          <Form
            style={{
              display: "flex",
              width: "100%",
              gap: "2rem",
            }}
          >
            <div className="left-side-phase">
              <p className="genral-text-left-side">
                1. Are you (Employed/Self-Employed)?*
              </p>
              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  required
                  defaultChecked={isEmployed}
                  type="radio"
                  name="phase4.employment.isEmployed"
                  id="phase4.employment.isEmployed"
                  onChange={(e) => {
                    setFieldValue("phase4.employment.isEmployed", true);
                    setIsEmployed(true);
                  }}
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  required
                  defaultChecked={!isEmployed}
                  type="radio"
                  name="phase4.employment.isEmployed"
                  id="phase4.employment.isNotEmployed"
                  onChange={(e) => {
                    setFieldValue("phase4.employment.isEmployed", false);
                    setIsEmployed(false);
                  }}
                />
              </div>

              {isEmployed && (
                <>
                  <p className="genral-text-left-side">
                    i. When did you start your job?*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={isEmployed}
                    type="date"
                    className="genral-input-left-side"
                    name="phase4.employment.jobStartDate"
                    id="phase4.employment.jobStartDate"
                    style={
                      errors?.phase4?.employment?.jobStartDate &&
                      touched?.phase4?.employment?.jobStartDate && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">
                    ii. What is the name of your employer?*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={isEmployed}
                    type="text"
                    className="genral-input-left-side"
                    name="phase4.employment.employerName"
                    id="phase4.employment.employerName"
                    placeholder="Type Name"
                    style={
                      errors?.phase4?.employment?.employerName &&
                      touched?.phase4?.employment?.employerName && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">
                    iii. Telephone number of your employer*
                  </p>
                  <PhoneInput
                    disabled={isEditting}
                    country={"us"}
                    inputClass={"mobileInput"}
                    placeholder="(485)-845-8542658"
                    containerClass="inputContainer"
                    name="phase4.employment.employerTelephone"
                    id="phase4.employment.employerTelephone"
                    value={employerTelephone}
                    containerStyle={{
                      height: "2.8rem",
                      marginLeft: "0rem",
                      marginTop: "5px",
                    }}
                    inputStyle={{
                      height: "2.8rem",
                      width: "26.9rem",
                      borderRadius: "8px",
                      background: "#f7f7f7",
                    }}
                    buttonStyle={{
                      borderRadius: "8px",
                      borderTopRightRadius: "0",
                      borderBottomRightRadius: "0",
                    }}
                    onChange={(value) => {
                      setFieldValue(
                        "phase4.employment.employerTelephone",
                        value
                      );
                      setEmployerTelephone(value);
                    }}
                  />
                  {/* <Field
                  disabled={isEditting}
                    required={isEmployed}
                    type="text"
                    className="genral-input-left-side"
                    name="phase4.employment.employerTelephone"
                    id="phase4.employment.employerTelephone"
                    placeholder="Telephone"
                    style={
                      errors?.phase4?.employment?.employerTelephone &&
                      touched?.phase4?.employment?.employerTelephone && {
                        border: "1px solid red",
                      }
                    }
                  /> */}

                  <p className="genral-text-left-side">
                    iv. Email address of your employer*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={isEmployed}
                    type="text"
                    className="genral-input-left-side"
                    name="phase4.employment.employerEmail"
                    id="phase4.employment.employerEmail"
                    placeholder="Email Address"
                    style={
                      errors?.phase4?.employment?.employerEmail &&
                      touched?.phase4?.employment?.employerEmail && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">
                    v. What is your annual salary*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={isEmployed}
                    type="text"
                    className="genral-input-left-side"
                    name="phase4.employment.annualSalary"
                    id="phase4.employment.annualSalary"
                    placeholder="Annual Salary"
                    style={
                      errors?.phase4?.employment?.annualSalary &&
                      touched?.phase4?.employment.annualSalary && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">
                    vi. What is your job title?*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={isEmployed}
                    type="text"
                    className="genral-input-left-side"
                    name="phase4.employment.jobTitle"
                    id="phase4.employment.jobTitle"
                    placeholder="Job Title"
                    style={
                      errors?.phase4?.employment?.jobTitle &&
                      touched?.phase4?.employment.jobTitle && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="provide-employee-address">
                    Please provide your employer's address
                  </p>

                  <p className="genral-text-left-side">i. Address 1*</p>
                  <Field
                    disabled={isEditting}
                    required={isEmployed}
                    type="text"
                    className="genral-input-left-side"
                    name="phase4.employment.employerAddress1"
                    id="phase4.employment.employerAddress1"
                    placeholder="Address 1"
                    style={
                      errors?.phase4?.employment.employerAddress1 &&
                      touched?.phase4?.employment.employerAddress1 && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">ii. Address 2*</p>
                  <Field
                    disabled={isEditting}
                    required={isEmployed}
                    type="text"
                    className="genral-input-left-side"
                    name="phase4.employment.employerAddress2"
                    id="phase4.employment.employerAddress2"
                    placeholder="Address 2"
                    style={
                      errors?.phase4?.employment.employerAddress2 &&
                      touched?.phase4?.employment.employerAddress2 && {
                        border: "1px solid red",
                      }
                    }
                  />
                </>
              )}
            </div>

            <div className="right-side-phase">
              {isEmployed && (
                <>
                  <p className="genral-text-left-side">iii. Location Name*</p>
                  <Field
                    disabled={isEditting}
                    required={isEmployed}
                    type="text"
                    className="genral-input-left-side"
                    name="phase4.employment.employerLocation"
                    id="phase4.employment.employerLocation"
                    placeholder="Location Name"
                    style={
                      errors?.phase4?.employment?.employerLocation &&
                      touched?.phase4?.employment?.employerLocation && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">iv. Location Code</p>
                  <Field
                    disabled={isEditting}
                    required={isEmployed}
                    type="text"
                    className="genral-input-left-side"
                    name="phase4.employment.employerLocationCode"
                    id="phase4.employment.employerLocationCode"
                    placeholder="Location Name"
                    style={
                      errors?.phase4?.employment?.employerLocationCode &&
                      touched?.phase4?.employment?.employerLocationCode && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">v. Town*</p>
                  <Field
                    disabled={isEditting}
                    required={isEmployed}
                    className="form-select genral-input-left-side-selector"
                    name="phase4.employment.employerTown"
                    id="phase4.employment.employerTown"
                    placeholder="Town"
                    style={
                      errors?.phase4?.employment?.employerTown &&
                      touched?.phase4?.employment?.employerTown && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">vi. County*</p>
                  <Field
                    disabled={isEditting}
                    required={isEmployed}
                    type="text"
                    className="genral-input-left-side"
                    name="phase4.employment.employerCounty"
                    id="phase4.employment.employerCounty"
                    placeholder="County"
                    style={
                      errors?.phase4?.employment?.employerCounty &&
                      touched?.phase4?.employment?.employerCounty && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">vii. Post Code*</p>
                  <Field
                    disabled={isEditting}
                    required={isEmployed}
                    type="text"
                    className="genral-input-left-side"
                    name="phase4.employment.employerPostCode"
                    id="phase4.employment.employerPostCode"
                    placeholder="Post Code"
                    style={
                      errors?.phase4?.employment?.employerPostCode &&
                      touched?.phase4?.employment?.employerPostCode && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">viii. Country Prefix*</p>
                  <Field
                    disabled={isEditting}
                    required={isEmployed}
                    type="text"
                    className="genral-input-left-side"
                    name="phase4.employment.employerCountryPrefix"
                    id="phase4.employment.employerCountryPrefix"
                    placeholder="Country Prefix"
                    style={
                      errors?.phase4?.employment?.employerCountryPrefix &&
                      touched?.phase4?.employment?.employerCountryPrefix && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">ix. Country*</p>
                  <SelectCountry
                    disabled={isEditting}
                    className="form-select genral-input-left-side-selector"
                    name="phase4.employment.employerCountry"
                    id="phase4.employment.employerCountry"
                  ></SelectCountry>

                  <p className="genral-text-left-side">xi. FAX</p>
                  <Field
                    disabled={isEditting}
                    type="text"
                    className="genral-input-left-side"
                    name="phase4.employment.employerFax"
                    id="phase4.employment.employerFax"
                    placeholder="FAX"
                    style={
                      errors?.phase4?.employment?.employerFax &&
                      touched?.phase4?.employment?.employerFax && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">xii. VAT Rate</p>
                  <Field
                    disabled={isEditting}
                    type="text"
                    className="genral-input-left-side"
                    name="phase4.employment.employerVatRate"
                    id="phase4.employment.employerVatRate"
                    placeholder="VAT Rate"
                    style={
                      errors?.phase4?.employment?.employerVatRate &&
                      touched?.phase4?.employment?.employerVatRate && {
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
                  marginTop: "1.7rem",
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

export default EmploymentForm;
