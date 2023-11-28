import React, { useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SelectCountry from "../SelectCountry";
import { usePostAccomodationMutation, usePostPhase4Mutation } from "../../services/api/applicationApi";
import { toastError } from "../Toast";
import Loader from "../Loader";
import { accommodationSchema } from "../../utils/ValidationSchema";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { usePostGroupAccomodationMutation } from "../../services/api/companyClient";

const AccomodationFormGroup = ({
  data,
  setActiveTab,
  initialValues,
  refetch,
  isEditting,
  buttonRef
}) => {
  const application = data?.application;
  // console.log("Accomodation Phase 4", initialValues);
  const homeType = initialValues?.phase4?.accommodation?.homeType;
  // console.log(homeType);
  const [isRented, setIsRented] = useState(
    homeType && homeType === "Rented" ? true : false
  );
  const [isOther, setIsOther] = useState(
    homeType && homeType === "Other" ? true : false
  );
  const [landLordTelephone, setLandLordTelephone] = useState(
    initialValues?.phase4?.accommodation?.landLordTelephone
  );

  // const [postPhase4, res] = usePostPhase4Mutation();
  const [postGroupAccomodation, res] =
    usePostGroupAccomodationMutation();
  const { isLoading, isSuccess, error } = res;

  useMemo(() => {
    if (isSuccess) {
      refetch();
      // setActiveTab("/family");
    }
  }, [isSuccess]);

  useMemo(() => {
    if (error) {
      toastError("Something went wrong");
    }
  }, [error]);

  const handleSubmitData = async (values) => {
    if (values.phase4.accommodation.bedrooms <= 0) {
      toastError("Please specify number of bedrooms");
      return;
    }
    if (values.phase4.accommodation.otherRooms <= 0) {
      toastError("Please specify Other rooms of your home");
      return;
    }
    if (isRented && values.phase4.accommodation.landLordTelephone.length < 5) {
      toastError("Please Enter a Valid Telephone Number");
      return;
    }
    // console.log("submitted accomodation", values?.phase4?.accommodation);
    await postGroupAccomodation({
      data: values.phase4.accommodation,
      applicationId: application?._id,
    });
  };

  const handleBackClick = () => {
    setActiveTab("/phase4");
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitData}
        validationSchema={accommodationSchema}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form
            style={{
              display: "flex",
              width: "100%",
              gap: "2rem",
            }}
          >
            <div className="left-side-phase">
              <p className="genral-text-left-side">1.Address 1*</p>
              <Field
                disabled={isEditting}
                type="text"
                name="phase4.accommodation.address1"
                id="phase4.accommodation.address1"
                className="genral-input-left-side"
                placeholder="Type Address"
                style={
                  errors?.phase4?.accommodation?.address1 &&
                  touched?.phase4?.accommodation?.address1 && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">2.Address 2*</p>
              <Field
                disabled={isEditting}
                type="text"
                name="phase4.accommodation.address2"
                id="phase4.accommodation.address2"
                className="genral-input-left-side"
                placeholder="Type Address"
                style={
                  errors?.phase4?.accommodation?.address2 &&
                  touched?.phase4?.accommodation?.address2 && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">3.Location Name*</p>
              <Field
                disabled={isEditting}
                type="text"
                name="phase4.accommodation.locationName"
                id="phase4.accommodation.locationName"
                className="genral-input-left-side"
                placeholder="Type Location"
                style={
                  errors?.phase4?.accommodation?.locationName &&
                  touched?.phase4?.accommodation?.locationName && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">4.Location Code*</p>
              <Field
                disabled={isEditting}
                type="text"
                name="phase4.accommodation.locationCode"
                id="phase4.accommodation.locationCode"
                className="genral-input-left-side"
                placeholder="Type Location Code"
                style={
                  errors?.phase4?.accommodation?.locationCode &&
                  touched?.phase4?.accommodation?.locationCode && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">5.Town*</p>
              <Field
                disabled={isEditting}
                type="text"
                name="phase4.accommodation.town"
                id="phase4.accommodation.town"
                className="genral-input-left-side"
                placeholder="Type"
                style={
                  errors?.phase4?.accommodation?.town &&
                  touched?.phase4?.accommodation?.town && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">6.County*</p>
              <Field
                disabled={isEditting}
                type="text"
                name="phase4.accommodation.county"
                id="phase4.accommodation.county"
                className="genral-input-left-side"
                placeholder="Type County"
                style={
                  errors?.phase4?.accommodation?.county &&
                  touched?.phase4?.accommodation?.county && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">7.Post Code*</p>
              <Field
                disabled={isEditting}
                type="text"
                name="phase4.accommodation.postCode"
                id="phase4.accommodation.postCode"
                className="genral-input-left-side"
                placeholder="Type Post Code"
                style={
                  errors?.phase4?.accommodation?.postCode &&
                  touched?.phase4?.accommodation?.postCode && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">8.Country Prefix*</p>
              <Field
                disabled={isEditting}
                type="text"
                name="phase4.accommodation.countryPrefix"
                id="phase4.accommodation.countryPrefix"
                className="genral-input-left-side"
                placeholder="Type Country Prefix"
                style={
                  errors?.phase4?.accommodation?.countryPrefix &&
                  touched?.phase4?.accommodation?.countryPrefix && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">9.Country*</p>
              <Field
                disabled={isEditting}
                name="phase4.accommodation.country"
                id="phase4.accommodation.country"
                render={({ field }) => (
                  <SelectCountry
                    disabled={isEditting}
                    name={field.name}
                    id={field.name}
                    className="genral-input-left-side-selector"
                  />
                )}
                style={
                  errors?.phase4?.accommodation?.country &&
                  touched?.phase4?.accommodation?.country && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">10.FAX</p>
              <Field
                disabled={isEditting}
                type="text"
                name="phase4.accommodation.fax"
                id="phase4.accommodation.fax"
                className="genral-input-left-side"
                placeholder="FAX"
                style={
                  errors?.phase4?.accommodation?.fax &&
                  touched?.phase4?.accommodation?.fax && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">11.VAT Rate</p>
              <Field
                disabled={isEditting}
                type="text"
                name="phase4.accommodation.vatRate"
                id="phase4.accommodation.vatRate"
                className="genral-input-left-side"
                placeholder="Type Country Prefix"
                style={
                  errors?.phase4?.accommodation?.vatRate &&
                  touched?.phase4?.accommodation?.vatRate && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">
                12.What date did you move in ? (mm/dd/yyyy)*
              </p>
              <Field
                disabled={isEditting}
                required
                type="date"
                name="phase4.accommodation.moveInDate"
                id="phase4.accommodation.moveInDate"
                className="genral-input-left-side"
              />

              <p className="genral-text-left-side">
                13.Time lived at current address?*
              </p>
              <Field
                disabled={isEditting}
                type="text"
                name="phase4.accommodation.timeLivedAtCurrentAddress"
                id="phase4.accommodation.timeLivedAtCurrentAddress"
                className="genral-input-left-side"
                placeholder="Type"
                style={
                  errors?.phase4?.accommodation?.timeLivedAtCurrentAddress &&
                  touched?.phase4?.accommodation?.timeLivedAtCurrentAddress && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">
                14.Is your home owned/rented/other ?*
              </p>

              <div
                className="genral-checkbox-acc-3"
                style={{ marginTop: "5px" }}
              >
                <div>
                  <p className="owned-check-text">Owned</p>
                  <input
                    disabled={isEditting}
                    required
                    defaultChecked={homeType === "Owned"}
                    type="radio"
                    name="phase4.accommodation.homeType"
                    id="phase4.accommodation.homeType"
                    className="owned-check"
                    onChange={(e) => {
                      setFieldValue("phase4.accommodation.homeType", "Owned");
                      setFieldValue(
                        "phase4.accommodation.otherHomeDetails",
                        ""
                      );
                      setFieldValue("phase4.accommodation.landLordName", "");
                      setFieldValue("phase4.accommodation.landLordEmail", "");
                      setFieldValue(
                        "phase4.accommodation.landLordTelephone",
                        ""
                      );
                      setFieldValue(
                        "phase4.accommodation.landLordAddress1",
                        ""
                      );
                      setFieldValue(
                        "phase4.accommodation.landLordAddress2",
                        ""
                      );
                      setFieldValue(
                        "phase4.accommodation.landLordLocationName",
                        ""
                      );
                      setFieldValue(
                        "phase4.accommodation.landLordLocationCode",
                        ""
                      );
                      setFieldValue("phase4.accommodation.landLordCounty", "");
                      setFieldValue("phase4.accommodation.landLordTown", "");
                      setFieldValue(
                        "phase4.accommodation.landLordPostCode",
                        ""
                      );
                      setFieldValue(
                        "phase4.accommodation.landLordCountryPrefix",
                        ""
                      );
                      setFieldValue("phase4.accommodation.landLordCountry", "");
                      setFieldValue("phase4.accommodation.landLordFax", "");
                      setFieldValue("phase4.accommodation.landLordVatRate", "");
                      setFieldValue("phase4.accommodation.landLordVatRate", "");
                      setIsRented(false);
                      setIsOther(false);
                    }}
                  />
                </div>
                <p className="rented-check-text">Rented</p>
                <input
                  disabled={isEditting}
                  defaultChecked={homeType === "Rented"}
                  required
                  type="radio"
                  name="phase4.accommodation.homeType"
                  id="phase4.accommodation.homeType"
                  className="rented-check"
                  onChange={(e) => {
                    setFieldValue("phase4.accommodation.homeType", "Rented");
                    setFieldValue("phase4.accommodation.otherHomeDetails", "");
                    setIsRented(true);
                    setIsOther(false);
                  }}
                />
                <p className="other-check-text">Other</p>
                <input
                  disabled={isEditting}
                  required
                  defaultChecked={homeType === "Other"}
                  type="radio"
                  name="phase4.accommodation.homeType"
                  id="phase4.accommodation.homeType"
                  className="other-check"
                  onChange={(e) => {
                    setFieldValue("phase4.accommodation.homeType", "Other");
                    setIsRented(false);
                    setIsOther(true);
                  }}
                />
              </div>

              {isOther && (
                <>
                  <p className="genral-text-left-side">Other Details*</p>
                  <Field
                    disabled={isEditting}
                    required={isOther}
                    type="text"
                    name="phase4.accommodation.otherHomeDetails"
                    id="phase4.accommodation.otherHomeDetails"
                    className="genral-input-left-side"
                    placeholder="Tell us about other details.."
                  />
                </>
              )}

              {isRented && (
                <>
                  <p className="genral-text-left-side">i.Landlord's Name*</p>
                  <Field
                    disabled={isEditting}
                    required={isRented}
                    type="text"
                    name="phase4.accommodation.landLordName"
                    id="phase4.accommodation.landLordName"
                    className="genral-input-left-side"
                    placeholder="Type Name"
                    style={
                      errors?.phase4?.accommodation?.landLordName &&
                      touched?.phase4?.accommodation?.landLordName && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">
                    ii. Landlord's Email Address*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={isRented}
                    type="text"
                    name="phase4.accommodation.landLordEmail"
                    id="phase4.accommodation.landLordEmail"
                    className="genral-input-left-side"
                    placeholder="Type Email"
                    style={
                      errors?.phase4?.accommodation?.landLordEmail &&
                      touched?.phase4?.accommodation?.landLordEmail && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">
                    iii. Landlord's Telephone Number*
                  </p>
                  <PhoneInput
                    disabled={isEditting}
                    country={"us"}
                    inputClass={"mobileInput"}
                    placeholder="(485)-845-8542658"
                    containerClass="inputContainer"
                    name="phase4.accommodation.landLordTelephone"
                    id="phase4.accommodation.landLordTelephone"
                    value={landLordTelephone}
                    containerStyle={{
                      height: "3rem",
                      marginLeft: "0rem",
                      marginTop: "5px",
                    }}
                    inputStyle={{
                      height: "3rem",
                      width: "30.9rem",
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
                        "phase4.accommodation.landLordTelephone",
                        value
                      );
                      setLandLordTelephone(value);
                    }}
                  />
                  {/* <Field
                    required={isRented}
                    type="text"
                    name="phase4.accommodation.landLordTelephone"
                    id="phase4.accommodation.landLordTelephone"
                    className="genral-input-left-side"
                    placeholder="+xxx-xxx-xxx-xxxx"
                    style={
                      errors?.phase4?.accommodation?.landLordTelephone &&
                      touched?.phase4?.accommodation?.landLordTelephone && {
                        border: "1px solid red",
                      }
                    }
                  /> */}

                  <p className="genral-text-left-side">
                    iv. Landlord's Address 1*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={isRented}
                    type="text"
                    name="phase4.accommodation.landLordAddress1"
                    id="phase4.accommodation.landLordAddress1"
                    className="genral-input-left-side"
                    placeholder="Type Address"
                    style={
                      errors?.phase4?.accommodation?.landLordAddress1 &&
                      touched?.phase4?.accommodation?.landLordAddress1 && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">
                    iv. Landlord's Address 2*
                  </p>
                  <Field
                    disabled={isEditting}
                    required={isRented}
                    type="text"
                    name="phase4.accommodation.landLordAddress2"
                    id="phase4.accommodation.landLordAddress2"
                    className="genral-input-left-side"
                    placeholder="Type Address"
                    style={
                      errors?.phase4?.accommodation?.landLordAddress2 &&
                      touched?.phase4?.accommodation?.landLordAddress2 && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">iv. Location Name*</p>
                  <Field
                    disabled={isEditting}
                    required={isRented}
                    type="text"
                    name="phase4.accommodation.landLordLocationName"
                    id="phase4.accommodation.landLordLocationName"
                    className="genral-input-left-side"
                    placeholder="Type Name"
                    style={
                      errors?.phase4?.accommodation?.landLordLocationName &&
                      touched?.phase4?.accommodation?.landLordLocationName && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">vi. Location Code</p>
                  <Field
                    disabled={isEditting}
                    required={isRented}
                    type="text"
                    name="phase4.accommodation.landLordLocationCode"
                    id="phase4.accommodation.landLordLocationCode"
                    className="genral-input-left-side"
                    placeholder="Type Location Code"
                    style={
                      errors?.phase4?.accommodation?.landLordLocationCode &&
                      touched?.phase4?.accommodation?.landLordLocationCode && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">vii. Town*</p>
                  <Field
                    disabled={isEditting}
                    required={isRented}
                    type="text"
                    name="phase4.accommodation.landLordTown"
                    id="phase4.accommodation.landLordTown"
                    className="genral-input-left-side"
                    placeholder="Type town"
                    style={
                      errors?.phase4?.accommodation?.landLordTown &&
                      touched?.phase4?.accommodation?.landLordTown && {
                        border: "1px solid red",
                      }
                    }
                  />
                </>
              )}
            </div>

            <div className="right-side-phase">
              {isRented && (
                <>
                  <p className="genral-text-left-side">viii. County*</p>
                  <Field
                    disabled={isEditting}
                    required={isRented}
                    type="text"
                    name="phase4.accommodation.landLordCounty"
                    id="phase4.accommodation.landLordCounty"
                    className="genral-input-left-side"
                    placeholder="Type County"
                    style={
                      errors?.phase4?.accommodation?.landLordCounty &&
                      touched?.phase4?.accommodation?.landLordCounty && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">ix. Post Code*</p>
                  <Field
                    disabled={isEditting}
                    required={isRented}
                    type="text"
                    name="phase4.accommodation.landLordPostCode"
                    id="phase4.accommodation.landLordPostCode"
                    className="genral-input-left-side"
                    placeholder="Post Code"
                    style={
                      errors?.phase4?.accommodation?.landLordPostCode &&
                      touched?.phase4?.accommodation?.landLordPostCode && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">x. Country Prefix*</p>
                  <Field
                    disabled={isEditting}
                    required={isRented}
                    type="text"
                    name="phase4.accommodation.landLordCountryPrefix"
                    id="phase4.accommodation.landLordCountryPrefix"
                    className="genral-input-left-side"
                    placeholder="Country Prefix"
                    style={
                      errors?.phase4?.accommodation?.landLordCountryPrefix &&
                      touched?.phase4?.accommodation?.landLordCountryPrefix && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">xi. Country*</p>
                  <SelectCountry
                    disabled={isEditting}
                    name="phase4.accommodation.landLordCountry"
                    id="phase4.accommodation.landLordCountry"
                    className="genral-input-right-side-selector"
                  ></SelectCountry>

                  <p className="genral-text-left-side">xii. FAX</p>
                  <Field
                    disabled={isEditting}
                    type="text"
                    name="phase4.accommodation.landLordFax"
                    id="phase4.accommodation.landLordFax"
                    className="genral-input-left-side"
                    placeholder="FAX"
                    style={
                      errors?.phase4?.accommodation?.landLordFax &&
                      touched?.phase4?.accommodation?.landLordFax && {
                        border: "1px solid red",
                      }
                    }
                  />

                  <p className="genral-text-left-side">xiii. VAT Rate</p>
                  <Field
                    disabled={isEditting}
                    type="text"
                    name="phase4.accommodation.landLordVatRate"
                    id="phase4.accommodation.landLordVatRate"
                    className="genral-input-left-side"
                    placeholder="VAT"
                    style={
                      errors?.phase4?.accommodation?.landLordVatRate &&
                      touched?.phase4?.accommodation?.landLordVatRate && {
                        border: "1px solid red",
                      }
                    }
                  />
                </>
              )}

              <p className="genral-text-left-side">
                xiv. How many bedrooms are in your house ?*
              </p>
              <Field
                disabled={isEditting}
                required
                min={0}
                type="number"
                name="phase4.accommodation.bedrooms"
                id="phase4.accommodation.bedrooms"
                className="genral-input-left-side"
                placeholder="Type"
                style={
                  errors?.phase4?.accommodation?.bedrooms &&
                  touched?.phase4?.accommodation?.bedrooms && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">
                xv. How many other rooms are in your house ?*
              </p>
              <Field
                disabled={isEditting}
                type="number"
                min={0}
                name="phase4.accommodation.otherRooms"
                id="phase4.accommodation.otherRooms"
                className="genral-input-left-side"
                placeholder="Type"
                style={
                  errors?.phase4?.accommodation?.otherRooms &&
                  touched?.phase4?.accommodation?.otherRooms && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">
                xvi. Who else lives there and their names?*
              </p>
              <Field
                disabled={isEditting}
                type="text"
                name="phase4.accommodation.otherWhoLives"
                id="phase4.accommodation.otherWhoLives"
                className="genral-input-left-side"
                placeholder="Type"
                style={
                  errors?.phase4?.accommodation?.otherWhoLives &&
                  touched?.phase4?.accommodation?.otherWhoLives && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="please-provide-text">
                Please provide your previous address if you have lived at your
                address for less than 2 years*
              </p>

              <p className="genral-text-left-side">i. Address 1*</p>
              <Field
                disabled={isEditting}
                type="text"
                name="phase4.accommodation.previousHomeDetails.address1"
                id="phase4.accommodation.previousHomeDetails.address1"
                className="genral-input-left-side"
                placeholder="Type Address"
              />

              <p className="genral-text-left-side">ii. Address 2*</p>
              <Field
                disabled={isEditting}
                type="text"
                name="phase4.accommodation.previousHomeDetails.address2"
                id="phase4.accommodation.previousHomeDetails.address2"
                className="genral-input-left-side"
                placeholder="Type Address"
              />

              <p className="genral-text-left-side">iii. Location Name*</p>
              <Field
                disabled={isEditting}
                type="text"
                name="phase4.accommodation.previousHomeDetails.locationName"
                id="phase4.accommodation.previousHomeDetails.locationName"
                className="genral-input-left-side"
                placeholder="Type Address"
              />

              <p className="genral-text-left-side">iv. Location Code*</p>
              <Field
                disabled={isEditting}
                type="text"
                name="phase4.accommodation.previousHomeDetails.locationCode"
                id="phase4.accommodation.previousHomeDetails.locationCode"
                placeholder="Type Address"
                className="genral-input-left-side"
              />

              <p className="genral-text-left-side">vii. Town*</p>
              <Field
                disabled={isEditting}
                type="text"
                name="phase4.accommodation.previousHomeDetails.town"
                id="phase4.accommodation.previousHomeDetails.town"
                className="genral-input-left-side"
                placeholder="Type Address"
              />

              <p className="genral-text-left-side">vi. County*</p>
              <Field
                disabled={isEditting}
                type="text"
                name="phase4.accommodation.previousHomeDetails.county"
                id="phase4.accommodation.previousHomeDetails.county"
                className="genral-input-left-side"
                placeholder="Type Address"
              />

              <p className="genral-text-left-side">vii. Post Code*</p>
              <Field
                disabled={isEditting}
                type="text"
                name="phase4.accommodation.previousHomeDetails.postCode"
                id="phase4.accommodation.previousHomeDetails.postCode"
                className="genral-input-left-side"
                placeholder="Type Address"
              />

              <p className="genral-text-left-side">viii. Country Prefix*</p>
              <Field
                disabled={isEditting}
                type="text"
                name="phase4.accommodation.previousHomeDetails.countryPrefix"
                id="phase4.accommodation.previousHomeDetails.countryPrefix"
                className="genral-input-left-side"
                placeholder="Type Address"
              />

              <p className="genral-text-left-side">9.Country*</p>
              <SelectCountry
                disabled={isEditting}
                name="phase4.accommodation.previousHomeDetails.country"
                id="phase4.accommodation.previousHomeDetails.country"
                className="genral-input-right-side-selector"
                notReq={true}
              ></SelectCountry>

              <p className="genral-text-left-side">x. FAX</p>
              <Field
                disabled={isEditting}
                type="text"
                name="phase4.accommodation.previousHomeDetails.fax"
                id="phase4.accommodation.previousHomeDetails.fax"
                className="genral-input-left-side"
                placeholder="FAX"
              />
              <p className="genral-text-left-side">xi. VAT Rate</p>
              <Field
                disabled={isEditting}
                type="text"
                name="phase4.accommodation.previousHomeDetails.vatRate"
                id="phase4.accommodation.previousHomeDetails.vatRate"
                className="genral-input-left-side"
                placeholder="FAX"
              />

              {/* Back and Next buttons */}
              <button
                disabled={isLoading}
                type="button"
                className="back-button-accomodation"
                onClick={handleBackClick}
                style={{ opacity: "0", cursor: "default" }}
              >
                Back
              </button>
              <button
                disabled={isLoading}
                ref={buttonRef}
                type="submit"
                className="Next-button-acomodation"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: "0",
                  cursor: "default",
                }}
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

export default AccomodationFormGroup;
