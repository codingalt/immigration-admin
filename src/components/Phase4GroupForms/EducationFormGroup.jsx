import React, { useEffect, useMemo, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  useGetCountriesQuery,
  usePostEducationMutation,
  usePostPhase4Mutation,
} from "../../services/api/applicationApi";
import { educationSchema } from "../../utils/ValidationSchema";
import { toastError } from "../Toast";
import Loader from "../Loader";
import SelectCountry from "../SelectCountry";
import SelectState from "../SelectState";
import { usePostGroupEducationMutation } from "../../services/api/companyClient";

const EducationFormGroup = ({
  data,
  setActiveTab,
  initialValues,
  refetch,
  isEditting,
  buttonRef,
}) => {
  const application = data?.application;
  console.log("Education Phase 4", initialValues);

  // const [postPhase4, res] = usePostPhase4Mutation();
  const [postGroupEducation, res] = usePostGroupEducationMutation();
  const { isLoading, isSuccess, error } = res;

  useMemo(() => {
    if (isSuccess) {
      refetch();
      // setActiveTab("/employement");
    }
  }, [isSuccess]);

  useMemo(() => {
    if (error) {
      toastError("Something went wrong");
    }
  }, [error]);

  const handleSubmitData = async (values) => {
    await postGroupEducation({
      data: values.phase4.education,
      applicationId: application?._id,
    });
    console.log("submitted education", values);
  };

  const handleBackClick = () => {
    setActiveTab("/languageprofeciency");
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitData}
        validationSchema={educationSchema}
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
              <p className="genral-text-left-side">1.Qualification*</p>
              <Field
                disabled={isEditting}
                type="text"
                className="genral-input-left-side"
                placeholder="Type Qualification"
                name="phase4.education.qualification"
                id="phase4.education.qualification"
                style={
                  errors?.phase4?.education?.qualification &&
                  touched?.phase4?.education?.qualification && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">2.Awarding Institute*</p>
              <Field
                disabled={isEditting}
                type="text"
                className="genral-input-left-side"
                placeholder="Type Awarding Institute"
                name="phase4.education.awardingInstitute"
                id="phase4.education.awardingInstitute"
                style={
                  errors?.phase4?.education?.awardingInstitute &&
                  touched?.phase4?.education?.awardingInstitute && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">3.Grade*</p>
              <Field
                disabled={isEditting}
                type="text"
                className="genral-input-left-side"
                placeholder="Type Grade"
                name="phase4.education.grade"
                id="phase4.education.grade"
                style={
                  errors?.phase4?.education?.grade &&
                  touched?.phase4?.education?.grade && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">4.Course Subject*</p>
              <Field
                disabled={isEditting}
                type="text"
                className="genral-input-left-side"
                placeholder="Type Course Subject"
                name="phase4.education.courseSubject"
                id="phase4.education.courseSubject"
                style={
                  errors?.phase4?.education?.courseSubject &&
                  touched?.phase4?.education?.courseSubject && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">5.Course Length*</p>
              <Field
                disabled={isEditting}
                type="text"
                className="genral-input-left-side"
                placeholder="Type Course Length"
                name="phase4.education.courseLength"
                id="phase4.education.courseLength"
                style={
                  errors?.phase4?.education?.courseLength &&
                  touched?.phase4?.education?.courseLength && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">6.Year of Award*</p>
              <Field
                disabled={isEditting}
                type="number"
                className="genral-input-left-side"
                placeholder="Eg: 2016"
                name="phase4.education.yearOfAward"
                id="phase4.education.yearOfAward"
                style={
                  errors?.phase4?.education?.yearOfAward &&
                  touched?.phase4?.education?.yearOfAward && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">7.Country of Award*</p>
              <SelectCountry
                disabled={isEditting}
                name="phase4.education.countryOfAward"
                id="phase4.education.countryOfAward"
                className="genral-input-left-side"
              ></SelectCountry>

              <p className="genral-text-left-side">8.State*</p>
              <Field
                disabled={isEditting}
                type="text"
                name="phase4.education.state"
                id="phase4.education.state"
                className="genral-input-left-side"
                placeholder="State"
                style={
                  errors?.phase4?.education?.state &&
                  touched?.phase4?.education?.state && {
                    border: "1px solid red",
                  }
                }
              ></Field>
              {/* <SelectState
                name="phase4.education.state"
                id="phase4.education.state"
                className="genral-input-left-side"
              ></SelectState> */}
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

export default EducationFormGroup;
