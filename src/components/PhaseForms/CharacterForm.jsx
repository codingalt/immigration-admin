import React, { useEffect, useMemo, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  useGetCountriesQuery,
  usePostCharacterMutation,
  usePostPhase4Mutation,
} from "../../services/api/applicationApi";
import { educationSchema } from "../../utils/ValidationSchema";
import { toastError, toastSuccess } from "../Toast";
import Loader from "../Loader";
import SelectCountry from "../SelectCountry";
import SelectState from "../SelectState";
import { useNavigate } from "react-router-dom";

const CharacterForm = ({
  data,
  setActiveTab,
  initialValues,
  refetch,
  isEditting,
  buttonRef,
}) => {
  const application = data?.application;
  console.log("Character Phase 4", initialValues);
  const navigate = useNavigate();

  // const [postPhase4, res] = usePostPhase4Mutation();
  const [postCharacter, res] = usePostCharacterMutation();
  const { isLoading, isSuccess, error } = res;

  const [everChargedWithCriminalOffence, setEverChargedWithCriminalOffence] =
    useState(initialValues?.phase4?.character?.everChargedWithCriminalOffence);

  const [isPendingProsecutions, setIsPendingProsecutions] = useState(
    initialValues?.phase4?.character?.isPendingProsecutions
  );

  const [isTerroristViews, setIsTerroristViews] = useState(
    initialValues?.phase4?.character?.isTerroristViews
  );

  const [isWorkedForJudiciary, setIsWorkedForJudiciary] = useState(
    initialValues?.phase4?.character?.isWorkedForJudiciary
  );

  useMemo(() => {
    if (isSuccess) {
      refetch();
      setActiveTab("/character");
      setTimeout(() => {
        // navigate(`/admin/prescreening/${application?._id}`);
      }, 1700);
    }
  }, [isSuccess]);

  useMemo(() => {
    if (error) {
      toastError("Something went wrong");
    }
  }, [error]);

  const handleSubmitData = async (values) => {
    await postCharacter({
      data: values.phase4.character,
      applicationId: application?._id,
    });
    console.log("submitted Character", values.phase4);
  };

  const handleBackClick = () => {
    setActiveTab("/travel");
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
                1.Have you ever been charged with a criminal offence ?*
              </p>

              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  required
                  checked={everChargedWithCriminalOffence}
                  type="radio"
                  className="yes-check"
                  name="phase4.character.everChargedWithCriminalOffence"
                  id="phase4.character.everChargedWithCriminalOffence"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.character.everChargedWithCriminalOffence",
                      true
                    );
                    setEverChargedWithCriminalOffence(true);
                  }}
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  required
                  checked={!everChargedWithCriminalOffence}
                  type="radio"
                  className="no-check"
                  name="phase4.character.everChargedWithCriminalOffence"
                  id="phase4.character.everChargedWithCriminalOffence"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.character.everChargedWithCriminalOffence",
                      false
                    );
                    setFieldValue("phase4.character.reasonForCharged", "");
                    setEverChargedWithCriminalOffence(false);
                  }}
                />
              </div>

              {everChargedWithCriminalOffence && (
                <>
                  <p className="genral-text-left-side">
                    i. Please provide details*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={everChargedWithCriminalOffence}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type Details"
                    name="phase4.character.reasonForCharged"
                    id="phase4.character.reasonForCharged"
                    style={
                      errors?.phase4?.character?.reasonForCharged &&
                      touched?.phase4?.character?.reasonForCharged && {
                        border: "1px solid red",
                      }
                    }
                  />
                </>
              )}

              <p className="genral-text-left-side">
                2.Do you have any pending prosecutions ?*
              </p>

              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  required
                  checked={isPendingProsecutions}
                  type="radio"
                  className="yes-check"
                  name="phase4.character.isPendingProsecutions"
                  id="phase4.character.isPendingProsecutions"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.character.isPendingProsecutions",
                      true
                    );
                    setIsPendingProsecutions(true);
                  }}
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  required
                  checked={!isPendingProsecutions}
                  type="radio"
                  className="no-check"
                  name="phase4.character.isPendingProsecutions"
                  id="phase4.character.isPendingProsecutions"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.character.isPendingProsecutions",
                      false
                    );
                    setFieldValue(
                      "phase4.character.reasonForPendingProsecutions",
                      ""
                    );
                    setIsPendingProsecutions(false);
                  }}
                />
              </div>

              {isPendingProsecutions && (
                <>
                  <p className="genral-text-left-side">
                    i. Please provide details*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={isPendingProsecutions}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type Text"
                    name="phase4.character.reasonForPendingProsecutions"
                    id="phase4.character.reasonForPendingProsecutions"
                    style={
                      errors?.phase4?.character?.reasonForPendingProsecutions &&
                      touched?.phase4?.character
                        ?.reasonForPendingProsecutions && {
                        border: "1px solid red",
                      }
                    }
                  />
                </>
              )}

              <p className="genral-text-left-side">
                3.Have you ever had any terrorist views or charged with or been
                questioned in relation to terrorist charges?*
              </p>

              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  required
                  checked={isTerroristViews}
                  type="radio"
                  className="yes-check"
                  name="phase4.character.isTerroristViews"
                  id="phase4.character.isTerroristViews"
                  onChange={(e) => {
                    setFieldValue("phase4.character.isTerroristViews", true);
                    setIsTerroristViews(true);
                  }}
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  required
                  checked={!isTerroristViews}
                  type="radio"
                  className="no-check"
                  name="phase4.character.isTerroristViews"
                  id="phase4.character.isTerroristViews"
                  onChange={(e) => {
                    setFieldValue("phase4.character.isTerroristViews", false);
                    setFieldValue(
                      "phase4.character.reasonForTerroristViews",
                      ""
                    );
                    setIsTerroristViews(false);
                  }}
                />
              </div>

              {isTerroristViews && (
                <>
                  <p className="genral-text-left-side">
                    i. Please provide details*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={isTerroristViews}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type Text"
                    name="phase4.character.reasonForTerroristViews"
                    id="phase4.character.reasonForTerroristViews"
                    style={
                      errors?.phase4?.character?.reasonForTerroristViews &&
                      touched?.phase4?.character?.reasonForTerroristViews && {
                        border: "1px solid red",
                      }
                    }
                  />
                </>
              )}

              <p className="genral-text-left-side">
                4.Have you ever worked for the (Judiciary/Security
                Services/Media/ Intelligence Agencies/Armed Forces) of any
                country?*
              </p>

              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  required
                  checked={isWorkedForJudiciary}
                  type="radio"
                  className="yes-check"
                  name="phase4.character.isWorkedForJudiciary"
                  id="phase4.character.isWorkedForJudiciary"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.character.isWorkedForJudiciary",
                      true
                    );
                    setIsWorkedForJudiciary(true);
                  }}
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  required
                  checked={!isWorkedForJudiciary}
                  type="radio"
                  className="no-check"
                  name="phase4.character.isWorkedForJudiciary"
                  id="phase4.character.isWorkedForJudiciary"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.character.isWorkedForJudiciary",
                      false
                    );
                    setFieldValue(
                      "phase4.character.reasonForJudiciaryWork",
                      ""
                    );
                    setIsWorkedForJudiciary(false);
                  }}
                />
              </div>

              {isWorkedForJudiciary && (
                <>
                  <p className="genral-text-left-side">
                    i. Please provide details*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={isWorkedForJudiciary}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type Text"
                    name="phase4.character.reasonForJudiciaryWork"
                    id="phase4.character.reasonForJudiciaryWork"
                    style={
                      errors?.phase4?.character?.reasonForJudiciaryWork &&
                      touched?.phase4?.character?.reasonForJudiciaryWork && {
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
                  {isLoading ? <Loader /> : "Submit"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CharacterForm;
