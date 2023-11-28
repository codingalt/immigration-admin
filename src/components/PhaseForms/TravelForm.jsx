import React, { useEffect, useMemo, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  useGetCountriesQuery,
  usePostPhase4Mutation,
  usePostTravelMutation,
} from "../../services/api/applicationApi";
import { maintenanceSchema } from "../../utils/ValidationSchema";
import { toastError } from "../Toast";
import Loader from "../Loader";
import SelectCountry from "../SelectCountry";

const TravelForm = ({
  data,
  setActiveTab,
  initialValues,
  setLastVisitsToUk,
  lastVisitsToUk,
  refetch,
  isEditting,
  buttonRef,
}) => {
  const application = data?.application;
  console.log("Travel Phase 4", initialValues);

  // const [postPhase4, res] = usePostPhase4Mutation();
  const [postTravel, res] = usePostTravelMutation();
  const { isLoading, isSuccess, error } = res;

  const [isCurrentlyInUk, setIsCurrentlyInUk] = useState(
    initialValues?.phase4?.travel?.areYouCurrentlyInUk
  );
  const [numOfVisits, setNumOfVisits] = useState(
    initialValues?.phase4?.travel?.numberOfVisitsToUk > 0
      ? initialValues?.phase4?.travel?.numberOfVisitsToUk
      : 0
  );
  const [isEnteredUkIllegally, setIsEnteredUkIllegally] = useState(
    initialValues?.phase4?.travel?.isVisitedUkIllegally
  );
  const [isStayedBeyondExpiry, setIsStayedBeyondExpiry] = useState(
    initialValues?.phase4?.travel?.isStayedBeyondExpiryDateInUk
  );
  const [isBreachedLeaveConditions, setIsBreachedLeaveConditions] = useState(
    initialValues?.phase4?.travel?.isBreachedLeaveConditions
  );
  const [isWorkedWithoutPermission, setIsWorkedWithoutPermission] = useState(
    initialValues?.phase4?.travel?.isWorkedWithoutPermission
  );
  const [isReceivedPublicFunds, setIsReceivedPublicFunds] = useState(
    initialValues?.phase4?.travel?.isReceivedPublicFunds
  );
  const [
    everGivenFalseInfoForApplyingVisa,
    setEverGivenFalseInfoForApplyingVisa,
  ] = useState(
    initialValues?.phase4?.travel?.everGivenFalseInfoForApplyingVisa
  );

  const [
    everUsedDeceptionInPrevVisaApplication,
    setEverUsedDeceptionInPrevVisaApplication,
  ] = useState(
    initialValues?.phase4?.travel?.everUsedDeceptionInPrevVisaApplication
  );

  const [
    everBreachedOtherImmigrationLaws,
    setEverBreachedOtherImmigrationLaws,
  ] = useState(initialValues?.phase4?.travel?.everBreachedOtherImmigrationLaws);

  const [everRefusedVisaOrBorderEntry, setEverRefusedVisaOrBorderEntry] =
    useState(initialValues?.phase4?.travel?.everRefusedVisaOrBorderEntry);

  const [everRefusedPermissionToStay, setEverRefusedPermissionToStay] =
    useState(initialValues?.phase4?.travel?.everRefusedPermissionToStay);

  const [everRefusedAsylum, setEverRefusedAsylum] = useState(
    initialValues?.phase4?.travel?.everRefusedAsylum
  );

  const [everDeported, setEverDeported] = useState(
    initialValues?.phase4?.travel?.everDeported
  );

  const [everBannedFromAnyCountry, setEverBannedFromAnyCountry] = useState(
    initialValues?.phase4?.travel?.everBannedFromAnyCountry
  );

  useMemo(() => {
    if (isSuccess) {
      refetch();
      // setActiveTab("/character");
    }
  }, [isSuccess]);

  useMemo(() => {
    if (error) {
      toastError("Something went wrong");
    }
  }, [error]);

  const handleSubmitData = async (values) => {
    if (values.phase4.travel.numberOfVisitsToUk == 0) {
      toastError("Please Select number of visits to UK");
      return;
    }
    await postTravel({
      data: values.phase4.travel,
      applicationId: application?._id,
    });
    console.log("submitted travel", values);
  };

  const handleBackClick = () => {
    setActiveTab("/maintenance");
  };

  const handleNumOfVisits = () => {
    if (numOfVisits == 0) {
      return;
    }

    setLastVisitsToUk(
      Array(parseInt(numOfVisits)).fill({
        entryDate: "",
        departureDate: "",
        reasonForVisit: "",
      })
    );
  };

  useEffect(() => {
    handleNumOfVisits();
  }, [numOfVisits]);

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmitData}>
        {({ setFieldValue, errors, touched, values }) => (
          <Form
            style={{
              display: "flex",
              width: "100%",
              gap: "2rem",
            }}
          >
            <div className="left-side-phase">
              <p className="genral-text-left-side">
                1.Are you currently in the UK?*
              </p>
              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  required
                  checked={isCurrentlyInUk}
                  type="radio"
                  className="yes-check"
                  name="phase4.travel.areYouCurrentlyInUk"
                  id="phase4.travel.areYouCurrentlyInUk"
                  onChange={(e) => {
                    setFieldValue("phase4.travel.areYouCurrentlyInUk", true);
                    setIsCurrentlyInUk(true);
                  }}
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  required
                  checked={!isCurrentlyInUk}
                  type="radio"
                  className="no-check"
                  name="phase4.travel.areYouCurrentlyInUk"
                  id="phase4.travel.areYouCurrentlyInUk"
                  onChange={(e) => {
                    setFieldValue("phase4.travel.areYouCurrentlyInUk", false);
                    setFieldValue("phase4.travel.countryVisited", "");
                    setFieldValue("phase4.travel.ukLeaveDate", "");
                    setFieldValue("phase4.travel.returnDate", "");
                    setFieldValue("phase4.travel.reasonForVisit", "");
                    setIsCurrentlyInUk(false);
                  }}
                />
              </div>

              {isCurrentlyInUk && (
                <>
                  <p className="genral-text-left-side">
                    i. What countries have you visited – please provide the date
                    you entered the country and the date you left and the reason
                    for your visit*
                  </p>

                  <p className="genral-text-left-side">ii. Country Visited*</p>
                  <Field
                    disabled={isEditting}
                    required={isCurrentlyInUk}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Country Visited"
                    name="phase4.travel.countryVisited"
                    id="phase4.travel.countryVisited"
                    style={
                      errors?.phase4?.travel?.countryVisited &&
                      touched?.phase4?.travel?.countryVisited && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">
                    iii. What date did you leave the UK?*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={isCurrentlyInUk}
                    type="date"
                    className="genral-input-left-side"
                    name="phase4.travel.ukLeaveDate"
                    id="phase4.travel.ukLeaveDate"
                    style={
                      errors?.phase4?.travel?.ukLeaveDate &&
                      touched?.phase4?.travel?.ukLeaveDate && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">
                    iv. What date did you return*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={isCurrentlyInUk}
                    type="date"
                    className="genral-input-left-side"
                    name="phase4.travel.returnDate"
                    id="phase4.travel.returnDate"
                    style={
                      errors?.phase4?.travel?.returnDate &&
                      touched?.phase4?.travel?.returnDate && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">
                    v. Reason for your visit*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={isCurrentlyInUk}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type"
                    name="phase4.travel.reasonForVisit"
                    id="phase4.travel.reasonForVisit"
                    style={
                      errors?.phase4?.travel?.reasonForVisit &&
                      touched?.phase4?.travel?.reasonForVisit && {
                        border: "1px solid red",
                      }
                    }
                  />
                </>
              )}

              <p className="genral-text-left-side">
                2.Please list the last 5 visits to the UK – date entered/date
                left and the reasons for your visit*
              </p>
              <Field
                disabled={isEditting}
                as="select"
                className="genral-input-left-side"
                placeholder="Type Number of Visits"
                name="phase4.travel.numberOfVisitsToUk"
                id="phase4.travel.numberOfVisitsToUk"
                onChange={(e) => {
                  setNumOfVisits(e.target.value);
                  setFieldValue(
                    "phase4.travel.numberOfVisitsToUk",
                    e.target.value
                  );
                }}
                style={
                  errors?.phase4?.travel?.numberOfVisitsToUk &&
                  touched?.phase4?.travel?.numberOfVisitsToUk && {
                    border: "1px solid red",
                  }
                }
              >
                <option value={0}>Select Number of Visits to UK</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </Field>

              {lastVisitsToUk?.map((item, index) => (
                <>
                  <p className="genral-text-left-side">
                    {index + 1}. Uk Visits Details
                  </p>
                  <p className="genral-text-left-side">i. Date of Entry*</p>
                  <Field
                    disabled={isEditting}
                    required
                    type="date"
                    className="genral-input-left-side"
                    name={`phase4.travel.lastUkVisits[${index}].entryDate`}
                    id={`phase4.travel.lastUkVisits[${index}].entryDate`}
                    style={
                      errors?.phase4?.travel?.lastUkVisits &&
                      errors.phase4.travel.lastUkVisits[index] &&
                      errors.phase4.travel.lastUkVisits[index].entryDate &&
                      touched?.phase4?.travel?.lastUkVisits &&
                      touched.phase4.travel.lastUkVisits[index] &&
                      touched.phase4.travel.lastUkVisits[index].entryDate
                        ? { border: "1px solid red" }
                        : null
                    }
                  />

                  <p className="genral-text-left-side">
                    ii. Date of Departure*
                  </p>
                  <Field
                    disabled={isEditting}
                    required
                    type="date"
                    className="genral-input-left-side"
                    name={`phase4.travel.lastUkVisits[${index}].departureDate`}
                    id={`phase4.travel.lastUkVisits[${index}].departureDate`}
                    style={
                      errors?.phase4?.travel?.lastUkVisits &&
                      errors.phase4.travel.lastUkVisits[index] &&
                      errors.phase4.travel.lastUkVisits[index].departureDate &&
                      touched?.phase4?.travel?.lastUkVisits &&
                      touched.phase4.travel.lastUkVisits[index] &&
                      touched.phase4.travel.lastUkVisits[index].departureDate
                        ? { border: "1px solid red" }
                        : null
                    }
                  />

                  <p className="genral-text-left-side">
                    iii. Reason for Visit*
                  </p>
                  <Field
                    disabled={isEditting}
                    required
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type Reason"
                    name={`phase4.travel.lastUkVisits[${index}].reasonForVisit`}
                    id={`phase4.travel.lastUkVisits[${index}].reasonForVisit`}
                    style={
                      errors?.phase4?.travel?.lastUkVisits &&
                      errors.phase4.travel.lastUkVisits[index] &&
                      errors.phase4.travel.lastUkVisits[index].reasonForVisit &&
                      touched?.phase4?.travel?.lastUkVisits &&
                      touched.phase4.travel.lastUkVisits[index] &&
                      touched.phase4.travel.lastUkVisits[index].reasonForVisit
                        ? { border: "1px solid red" }
                        : null
                    }
                  />
                </>
              ))}

              <p className="genral-text-left-side">
                3.Have you ever entered the UK illegally?*
              </p>

              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  defaultChecked
                  required
                  checked={isEnteredUkIllegally}
                  type="radio"
                  className="yes-check"
                  name="phase4.travel.isVisitedUkIllegally"
                  id="phase4.travel.isVisitedUkIllegally"
                  onChange={(e) => {
                    setFieldValue("phase4.travel.isVisitedUkIllegally", true);
                    setIsEnteredUkIllegally(true);
                  }}
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  required
                  checked={!isEnteredUkIllegally}
                  type="radio"
                  className="no-check"
                  name="phase4.travel.isVisitedUkIllegally"
                  id="phase4.travel.isVisitedUkIllegally"
                  onChange={(e) => {
                    setFieldValue("phase4.travel.isVisitedUkIllegally", false);
                    setFieldValue("phase4.travel.illegalVisitDetail", "");
                    setIsEnteredUkIllegally(false);
                  }}
                />
              </div>

              {isEnteredUkIllegally && (
                <>
                  <p className="genral-text-left-side">
                    i. please provide details*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={isEnteredUkIllegally}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type Details"
                    name="phase4.travel.illegalVisitDetail"
                    id="phase4.travel.illegalVisitDetail"
                    style={
                      errors?.phase4?.travel?.illegalVisitDetail &&
                      touched?.phase4?.travel?.illegalVisitDetail && {
                        border: "1px solid red",
                      }
                    }
                  />
                </>
              )}

              <p className="genral-text-left-side">
                4.Have you ever stayed beyond the expiry date of your visa in
                the UK?*
              </p>

              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  required
                  checked={isStayedBeyondExpiry}
                  type="radio"
                  className="yes-check"
                  name="phase4.travel.isStayedBeyondExpiryDateInUk"
                  id="phase4.travel.isStayedBeyondExpiryDateInUk"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.travel.isStayedBeyondExpiryDateInUk",
                      true
                    );
                    setIsStayedBeyondExpiry(true);
                  }}
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  required
                  checked={!isStayedBeyondExpiry}
                  type="radio"
                  className="no-check"
                  name="phase4.travel.isStayedBeyondExpiryDateInUk"
                  id="phase4.travel.isStayedBeyondExpiryDateInUk"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.travel.isStayedBeyondExpiryDateInUk",
                      false
                    );
                    setFieldValue(
                      "phase4.travel.reasonForStayingExpiryDateInUk",
                      ""
                    );
                    setIsStayedBeyondExpiry(false);
                  }}
                />
              </div>

              {isStayedBeyondExpiry && (
                <>
                  <p className="genral-text-left-side">
                    i. please provide details*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={isStayedBeyondExpiry}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type Details"
                    name="phase4.travel.reasonForStayingExpiryDateInUk"
                    id="phase4.travel.reasonForStayingExpiryDateInUk"
                    style={
                      errors?.phase4?.travel?.reasonForStayingExpiryDateInUk &&
                      touched?.phase4?.travel
                        ?.reasonForStayingExpiryDateInUk && {
                        border: "1px solid red",
                      }
                    }
                  />
                </>
              )}

              <p className="genral-text-left-side">
                5.Have you ever been to the UK or any other country?
              </p>
              <Field
                disabled={isEditting}
                required
                type="text"
                className="genral-input-left-side"
                placeholder="Type Details"
                name="phase4.travel.everBeenToUkOrAnyCountry"
                id="phase4.travel.everBeenToUkOrAnyCountry"
                style={
                  errors?.phase4?.travel?.everBeenToUkOrAnyCountry &&
                  touched?.phase4?.travel?.everBeenToUkOrAnyCountry && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">
                7.Have you ever breached the conditions of your leave?*
              </p>

              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  required
                  checked={isBreachedLeaveConditions}
                  type="radio"
                  className="yes-check"
                  name="phase4.travel.isBreachedLeaveConditions"
                  id="phase4.travel.isBreachedLeaveConditions"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.travel.isBreachedLeaveConditions",
                      true
                    );
                    setIsBreachedLeaveConditions(true);
                  }}
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  required
                  checked={!isBreachedLeaveConditions}
                  type="radio"
                  className="no-check"
                  name="phase4.travel.isBreachedLeaveConditions"
                  id="phase4.travel.isBreachedLeaveConditions"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.travel.isBreachedLeaveConditions",
                      false
                    );
                    setFieldValue("phase4.travel.reasonForBreachedLeave", "");
                    setIsBreachedLeaveConditions(false);
                  }}
                />
              </div>

              {isBreachedLeaveConditions && (
                <>
                  <p className="genral-text-left-side">
                    i. Please provide details*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={isBreachedLeaveConditions}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type Details"
                    name="phase4.travel.reasonForBreachedLeave"
                    id="phase4.travel.reasonForBreachedLeave"
                    style={
                      errors?.phase4?.travel?.reasonForBreachedLeave &&
                      touched?.phase4?.travel?.reasonForBreachedLeave && {
                        border: "1px solid red",
                      }
                    }
                  />
                </>
              )}
            </div>

            {/* Right Side  */}
            <div className="right-side-phase">
              <p className="genral-text-left-side">
                9. Have you ever worked without permission?*
              </p>

              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  required
                  checked={isWorkedWithoutPermission}
                  type="radio"
                  className="yes-check"
                  name="phase4.travel.isWorkedWithoutPermission"
                  id="phase4.travel.isWorkedWithoutPermission"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.travel.isWorkedWithoutPermission",
                      true
                    );
                    setIsWorkedWithoutPermission(true);
                  }}
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  required
                  checked={!isWorkedWithoutPermission}
                  type="radio"
                  className="no-check"
                  name="phase4.travel.isWorkedWithoutPermission"
                  id="phase4.travel.isWorkedWithoutPermission"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.travel.isWorkedWithoutPermission",
                      false
                    );
                    setFieldValue(
                      "phase4.travel.reasonForWorkedWithoutPermission",
                      ""
                    );
                    setIsWorkedWithoutPermission(false);
                  }}
                />
              </div>

              {isWorkedWithoutPermission && (
                <>
                  <p className="genral-text-left-side">
                    i. Please provide details*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={isWorkedWithoutPermission}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type Details"
                    name="phase4.travel.reasonForWorkedWithoutPermission"
                    id="phase4.travel.reasonForWorkedWithoutPermission"
                    style={
                      errors?.phase4?.travel
                        ?.reasonForWorkedWithoutPermission &&
                      touched?.phase4?.travel
                        ?.reasonForWorkedWithoutPermission && {
                        border: "1px solid red",
                      }
                    }
                  />
                </>
              )}

              <p className="genral-text-left-side">
                10. Have you ever received public funds?*
              </p>

              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  required
                  checked={isReceivedPublicFunds}
                  type="radio"
                  className="yes-check"
                  name="phase4.travel.isReceivedPublicFunds"
                  id="phase4.travel.isReceivedPublicFunds"
                  onChange={(e) => {
                    setFieldValue("phase4.travel.isReceivedPublicFunds", true);
                    setIsReceivedPublicFunds(true);
                  }}
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  required
                  checked={!isReceivedPublicFunds}
                  type="radio"
                  className="no-check"
                  name="phase4.travel.isReceivedPublicFunds"
                  id="phase4.travel.isReceivedPublicFunds"
                  onChange={(e) => {
                    setFieldValue("phase4.travel.isReceivedPublicFunds", false);
                    setFieldValue("phase4.travel.detailsForPublicFunds", "");
                    setIsReceivedPublicFunds(false);
                  }}
                />
              </div>

              {isReceivedPublicFunds && (
                <>
                  <p className="genral-text-left-side">
                    Please provide details*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={isReceivedPublicFunds}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type Details"
                    name="phase4.travel.detailsForPublicFunds"
                    id="phase4.travel.detailsForPublicFunds"
                    style={
                      errors?.phase4?.travel?.detailsForPublicFunds &&
                      touched?.phase4?.travel?.detailsForPublicFunds && {
                        border: "1px solid red",
                      }
                    }
                  />
                </>
              )}

              <p className="genral-text-left-side">
                11.Have you ever given false information when applying for a
                visa?*
              </p>

              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  required
                  checked={everGivenFalseInfoForApplyingVisa}
                  type="radio"
                  className="yes-check"
                  name="phase4.travel.everGivenFalseInfoForApplyingVisa"
                  id="phase4.travel.everGivenFalseInfoForApplyingVisa"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.travel.everGivenFalseInfoForApplyingVisa",
                      true
                    );
                    setEverGivenFalseInfoForApplyingVisa(true);
                  }}
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  required
                  checked={!everGivenFalseInfoForApplyingVisa}
                  type="radio"
                  className="no-check"
                  name="phase4.travel.everGivenFalseInfoForApplyingVisa"
                  id="phase4.travel.everGivenFalseInfoForApplyingVisa"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.travel.everGivenFalseInfoForApplyingVisa",
                      false
                    );
                    setFieldValue(
                      "phase4.travel.reasonForFalseInformation",
                      ""
                    );
                    setEverGivenFalseInfoForApplyingVisa(false);
                  }}
                />
              </div>

              {everGivenFalseInfoForApplyingVisa && (
                <>
                  <p className="genral-text-left-side">
                    i. Please provide details*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={everGivenFalseInfoForApplyingVisa}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type Details"
                    name="phase4.travel.reasonForFalseInformation"
                    id="phase4.travel.reasonForFalseInformation"
                    style={
                      errors?.phase4?.travel?.reasonForFalseInformation &&
                      touched?.phase4?.travel?.reasonForFalseInformation && {
                        border: "1px solid red",
                      }
                    }
                  />
                </>
              )}

              <p className="genral-text-left-side">
                12.Have you ever used deception in a previous visa application?*
              </p>

              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  required
                  checked={everUsedDeceptionInPrevVisaApplication}
                  type="radio"
                  className="yes-check"
                  name="phase4.travel.everUsedDeceptionInPrevVisaApplication"
                  id="phase4.travel.everUsedDeceptionInPrevVisaApplication"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.travel.everUsedDeceptionInPrevVisaApplication",
                      true
                    );
                    setEverUsedDeceptionInPrevVisaApplication(true);
                  }}
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  required
                  checked={!everUsedDeceptionInPrevVisaApplication}
                  type="radio"
                  className="no-check"
                  name="phase4.travel.everUsedDeceptionInPrevVisaApplication"
                  id="phase4.travel.everUsedDeceptionInPrevVisaApplication"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.travel.everUsedDeceptionInPrevVisaApplication",
                      false
                    );
                    setFieldValue("phase4.travel.reasonForDeception", "");
                    setEverUsedDeceptionInPrevVisaApplication(false);
                  }}
                />
              </div>

              {everUsedDeceptionInPrevVisaApplication && (
                <>
                  <p className="genral-text-left-side">
                    i. Please provide details*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={everUsedDeceptionInPrevVisaApplication}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type Details"
                    name="phase4.travel.reasonForDeception"
                    id="phase4.travel.reasonForDeception"
                    style={
                      errors?.phase4?.travel?.reasonForDeception &&
                      touched?.phase4?.travel?.reasonForDeception && {
                        border: "1px solid red",
                      }
                    }
                  />
                </>
              )}

              <p className="genral-text-left-side">
                13.Have you ever breached any other immigration laws?*
              </p>
              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  required
                  checked={everBreachedOtherImmigrationLaws}
                  type="radio"
                  className="yes-check"
                  name="phase4.travel.everBreachedOtherImmigrationLaws"
                  id="phase4.travel.everBreachedOtherImmigrationLaws"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.travel.everBreachedOtherImmigrationLaws",
                      true
                    );
                    setEverBreachedOtherImmigrationLaws(true);
                  }}
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  required
                  checked={!everBreachedOtherImmigrationLaws}
                  type="radio"
                  className="no-check"
                  name="phase4.travel.everBreachedOtherImmigrationLaws"
                  id="phase4.travel.everBreachedOtherImmigrationLaws"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.travel.everBreachedOtherImmigrationLaws",
                      false
                    );
                    setFieldValue(
                      "phase4.travel.reasonForBreachingImmigrationLaw",
                      ""
                    );
                    setEverBreachedOtherImmigrationLaws(false);
                  }}
                />
              </div>

              {everBreachedOtherImmigrationLaws && (
                <>
                  <p className="genral-text-left-side">
                    i. Please provide details*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={everBreachedOtherImmigrationLaws}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type Details"
                    name="phase4.travel.reasonForBreachingImmigrationLaw"
                    id="phase4.travel.reasonForBreachingImmigrationLaw"
                    style={
                      errors?.phase4?.travel
                        ?.reasonForBreachingImmigrationLaw &&
                      touched?.phase4?.travel
                        ?.reasonForBreachingImmigrationLaw && {
                        border: "1px solid red",
                      }
                    }
                  />
                </>
              )}

              <p className="genral-text-left-side">
                14.Have you ever been refused a visa or refused entry at the
                border?*
              </p>

              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  required
                  checked={everRefusedVisaOrBorderEntry}
                  type="radio"
                  className="yes-check"
                  name="phase4.travel.everRefusedVisaOrBorderEntry"
                  id="phase4.travel.everRefusedVisaOrBorderEntry"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.travel.everRefusedVisaOrBorderEntry",
                      true
                    );
                    setEverRefusedVisaOrBorderEntry(true);
                  }}
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  checked={!everRefusedVisaOrBorderEntry}
                  required
                  type="radio"
                  className="no-check"
                  name="phase4.travel.everRefusedVisaOrBorderEntry"
                  id="phase4.travel.everRefusedVisaOrBorderEntry"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.travel.everRefusedVisaOrBorderEntry",
                      false
                    );
                    setFieldValue("phase4.travel.reasonForRefusedEntry", "");
                    setEverRefusedVisaOrBorderEntry(false);
                  }}
                />
              </div>

              {everRefusedVisaOrBorderEntry && (
                <>
                  {" "}
                  <p className="genral-text-left-side">
                    i. Please provide details*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={everRefusedVisaOrBorderEntry}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type Details"
                    name="phase4.travel.reasonForRefusedEntry"
                    id="phase4.travel.reasonForRefusedEntry"
                    style={
                      errors?.phase4?.travel?.reasonForRefusedEntry &&
                      touched?.phase4?.travel?.reasonForRefusedEntry && {
                        border: "1px solid red",
                      }
                    }
                  />
                </>
              )}

              <p className="genral-text-left-side">
                15.Have you been refused permission to stay or remain ?*
              </p>

              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  checked={everRefusedPermissionToStay}
                  required
                  type="radio"
                  className="yes-check"
                  name="phase4.travel.everRefusedPermissionToStay"
                  id="phase4.travel.everRefusedPermissionToStay"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.travel.everRefusedPermissionToStay",
                      true
                    );
                    setEverRefusedPermissionToStay(true);
                  }}
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  checked={!everRefusedPermissionToStay}
                  required
                  type="radio"
                  className="no-check"
                  name="phase4.travel.everRefusedPermissionToStay"
                  id="phase4.travel.everRefusedPermissionToStay"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.travel.everRefusedPermissionToStay",
                      false
                    );
                    setFieldValue(
                      "phase4.travel.reasonForRefusedPermissionToStay",
                      ""
                    );
                    setEverRefusedPermissionToStay(false);
                  }}
                />
              </div>

              {everRefusedPermissionToStay && (
                <>
                  <p className="genral-text-left-side">
                    i. Please provide details*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={everRefusedPermissionToStay}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type Details"
                    name="phase4.travel.reasonForRefusedPermissionToStay"
                    id="phase4.travel.reasonForRefusedPermissionToStay"
                    style={
                      errors?.phase4?.travel
                        ?.reasonForRefusedPermissionToStay &&
                      touched?.phase4?.travel
                        ?.reasonForRefusedPermissionToStay && {
                        border: "1px solid red",
                      }
                    }
                  />
                </>
              )}

              <p className="genral-text-left-side">
                16.Have you ever been refused asylum?*
              </p>

              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  required
                  checked={everRefusedAsylum}
                  type="radio"
                  className="yes-check"
                  name="phase4.travel.everRefusedAsylum"
                  id="phase4.travel.everRefusedAsylum"
                  onChange={(e) => {
                    setFieldValue("phase4.travel.everRefusedAsylum", true);
                    setEverRefusedAsylum(true);
                  }}
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  required
                  checked={!everRefusedAsylum}
                  type="radio"
                  className="no-check"
                  name="phase4.travel.everRefusedAsylum"
                  id="phase4.travel.everRefusedAsylum"
                  onChange={(e) => {
                    setFieldValue("phase4.travel.everRefusedAsylum", false);
                    setFieldValue("phase4.travel.reasonForRefusedAsylum", "");
                    setEverRefusedAsylum(false);
                  }}
                />
              </div>

              {everRefusedAsylum && (
                <>
                  {" "}
                  <p className="genral-text-left-side">
                    i. Please provide details*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={everRefusedAsylum}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type Details"
                    name="phase4.travel.reasonForRefusedAsylum"
                    id="phase4.travel.reasonForRefusedAsylum"
                    style={
                      errors?.phase4?.travel?.reasonForRefusedAsylum &&
                      touched?.phase4?.travel?.reasonForRefusedAsylum && {
                        border: "1px solid red",
                      }
                    }
                  />
                </>
              )}

              <p className="genral-text-left-side">
                17.Have you ever been deported, removed or been required to
                leave any country?*
              </p>

              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  required
                  checked={everDeported}
                  type="radio"
                  className="yes-check"
                  name="phase4.travel.everDeported"
                  id="phase4.travel.everDeported"
                  onChange={(e) => {
                    setFieldValue("phase4.travel.everDeported", true);
                    setEverDeported(true);
                  }}
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  required
                  checked={!everDeported}
                  type="radio"
                  className="no-check"
                  name="phase4.travel.everDeported"
                  id="phase4.travel.everDeported"
                  onChange={(e) => {
                    setFieldValue("phase4.travel.everDeported", false);
                    setFieldValue("phase4.travel.reasonForDeported", "");
                    setEverDeported(false);
                  }}
                />
              </div>

              {everDeported && (
                <>
                  <p className="genral-text-left-side">
                    i. Please provide details*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={everDeported}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type Details"
                    name="phase4.travel.reasonForDeported"
                    id="phase4.travel.reasonForDeported"
                    style={
                      errors?.phase4?.travel?.reasonForDeported &&
                      touched?.phase4?.travel?.reasonForDeported && {
                        border: "1px solid red",
                      }
                    }
                  />
                </>
              )}

              <p className="genral-text-left-side">
                18.Have you been excluded or banned from any country?*
              </p>

              <div className="checkbox-phase1">
                <p className="yes-check-text">Yes</p>
                <input
                  disabled={isEditting}
                  required
                  checked={everBannedFromAnyCountry}
                  type="radio"
                  className="yes-check"
                  name="phase4.travel.everBannedFromAnyCountry"
                  id="phase4.travel.everBannedFromAnyCountry"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.travel.everBannedFromAnyCountry",
                      true
                    );
                    setEverBannedFromAnyCountry(true);
                  }}
                />
                <p className="no-check-text">No</p>
                <input
                  disabled={isEditting}
                  required
                  checked={!everBannedFromAnyCountry}
                  type="radio"
                  className="no-check"
                  name="phase4.travel.everBannedFromAnyCountry"
                  id="phase4.travel.everBannedFromAnyCountry"
                  onChange={(e) => {
                    setFieldValue(
                      "phase4.travel.everBannedFromAnyCountry",
                      false
                    );
                    setFieldValue("phase4.travel.reasonForBanned", "");
                    setEverBannedFromAnyCountry(false);
                  }}
                />
              </div>

              {everBannedFromAnyCountry && (
                <>
                  <p className="genral-text-left-side">
                    i. Please provide details*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={everBannedFromAnyCountry}
                    type="text"
                    className="genral-input-left-side"
                    placeholder="Type Details"
                    name="phase4.travel.reasonForBanned"
                    id="phase4.travel.reasonForBanned"
                    style={
                      errors?.phase4?.travel?.reasonForBanned &&
                      touched?.phase4?.travel?.reasonForBanned && {
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

export default TravelForm;
