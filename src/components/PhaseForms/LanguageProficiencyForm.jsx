import React, { useEffect, useMemo, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  useGetCountriesQuery,
  usePostLanguageMutation,
  usePostPhase4Mutation,
} from "../../services/api/applicationApi";
import { generalSchema } from "../../utils/ValidationSchema";
import { toastError } from "../Toast";
import Loader from "../Loader";

const LanguageProficiencyForm = ({
  data,
  setActiveTab,
  initialValues,
  refetch,
  isEditting,
  buttonRef,
}) => {
  const application = data?.application;
  console.log("Language Proficiency Phase 4", initialValues);

  // const [postPhase4, res] = usePostPhase4Mutation();
  const [postLanguage, res] = usePostLanguageMutation();
  const { isLoading, isSuccess, error } = res;

  const [isDegreeTaughtInEnglish, setIsDegreeTaughtInEnglish] = useState(
    initialValues?.phase4?.languageProficiency?.isDegreeTaughtInEnglish
  );

  const [isPassedAnyEnglishTest, setIsPassedAnyEnglishTest] = useState(
    initialValues?.phase4?.languageProficiency?.isPassedAnyEnglishTest
  );

  useMemo(() => {
    if (isSuccess) {
      refetch();
      setActiveTab("/education");
    }
  }, [isSuccess]);

  useMemo(() => {
    if (error) {
      toastError("Something went wrong");
    }
  }, [error]);

  const handleSubmitData = async (values) => {
    await postLanguage({
      data: values.phase4.languageProficiency,
      applicationId: application?._id,
    });
    console.log("submitted", values.phase4.languageProficiency);
  };

  const handleBackClick = () => {
    setActiveTab("/family");
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
                1.Do you have a degree taught in English ?*
              </p>

              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  required
                  defaultChecked={isDegreeTaughtInEnglish}
                  type="radio"
                  className="yes-check"
                  name="phase4.languageProficiency.isDegreeTaughtInEnglish"
                  id="phase4.languageProficiency.isDegreeTaughtInEnglish"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.languageProficiency.isDegreeTaughtInEnglish",
                      true
                    );
                    setIsDegreeTaughtInEnglish(true);
                  }}
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  defaultChecked={!isDegreeTaughtInEnglish}
                  required
                  type="radio"
                  className="no-check"
                  name="phase4.languageProficiency.isDegreeTaughtInEnglish"
                  id="phase4.languageProficiency.isDegreeTaughtInEnglish"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.languageProficiency.isDegreeTaughtInEnglish",
                      false
                    );
                    setIsDegreeTaughtInEnglish(false);
                  }}
                />
              </div>

              <p className="genral-text-left-side">
                2.Have you passed any English Test ?*
              </p>

              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  required
                  defaultChecked={isPassedAnyEnglishTest}
                  type="radio"
                  className="yes-check"
                  name="phase4.languageProficiency.isPassedAnyEnglishTest"
                  id="phase4.languageProficiency.isPassedAnyEnglishTest"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.languageProficiency.isPassedAnyEnglishTest",
                      true
                    );
                    setIsPassedAnyEnglishTest(true);
                  }}
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  defaultChecked={!isPassedAnyEnglishTest}
                  required
                  type="radio"
                  className="no-check"
                  name="phase4.languageProficiency.isPassedAnyEnglishTest"
                  id="phase4.languageProficiency.isPassedAnyEnglishTest"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.languageProficiency.isPassedAnyEnglishTest",
                      false
                    );
                    setIsPassedAnyEnglishTest(false);
                  }}
                />
              </div>

              <p className="genral-text-left-side">
                i. Please select the relevant test ?*
              </p>
              <Field
                disabled={isEditting}
                required
                as="select"
                name="phase4.languageProficiency.testType"
                id="phase4.languageProficiency.testType"
                placeholder="Select"
                className="genral-input-left-side-selector"
                onChange={(e) =>
                  setFieldValue(
                    "phase4.languageProficiency.testType",
                    e.target.value
                  )
                }
              >
                {/* <option value="">
                  The English language proficiency can be proven as follows:
                </option> */}
                <option value="">Select Test Type</option>
                <option value="TOEFL or TOEFL Special Home Edition">
                  TOEFL or TOEFL Special Home Edition
                </option>
                <option value="IELTS">IELTS</option>
                <option value="TOEIC">TOEIC</option>
                <option value="Duolingo">Duolingo</option>
                <option value="Pearson">Pearson</option>
                <option value="Trinity College">Trinity College</option>
                <option
                  value="At least 6 months of residence in an English-speaking country
                  Other"
                >
                  At least 6 months of residence in an English-speaking country
                  Other
                </option>
              </Field>

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

export default LanguageProficiencyForm;
