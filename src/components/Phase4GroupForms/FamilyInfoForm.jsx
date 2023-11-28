import React, { useEffect, useRef, useState } from "react";
import "../../style/FamilyInfo.css";
import SelectCountry from "../SelectCountry";
import { useGetCountriesQuery } from "../../services/api/applicationApi";
import { Formik, Form, Field, ErrorMessage } from "formik";

const FamilyInfoForm = ({
  showModal,
  childOptions,
  setShowModal,
  initialValues,
  errors
}) => {
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

  useEffect(() => {
    setChildDetails(
      Array(arrLength && arrLength).fill({
        childName: "",
        childGender: "",
        childDob: "",
        childNationality: "",
        childPassportNumber: "",
        childPassportIssueDate: "",
        childPassportExpiryDate: "",
        childVisaType: "",
        childVisaIssueDate: "",
        childVisaExpiryDate: "",
      })
    );
  }, [childOptions]);

  const handleChange = (e, index) => {
    e.preventDefault();
    const { name, value } = e.target;
    setChildDetails((prevChildDetails) => {
      // Create a copy of the previous state
      const updatedChildDetails = [...prevChildDetails];
      // Update the specific index with the new value
      updatedChildDetails[index] = {
        ...updatedChildDetails[index],
        [name]: value,
      };
      return updatedChildDetails;
    });
  };

  const handleSubmitData = (event) => {
    event.preventDefault();
    console.log(values);
    // if (selectedChild < arrLength) {
    //   setSelectedChild(selectedChild + 1);
    // }
  };

  useEffect(() => {
    if (topDivRef.current) {
      topDivRef.current.scrollTop = 0;
    }
  }, [selectedChild]);

    console.log("Child Details", initialValues?.phase4.family);
  // console.log("Child Details", childDetails);
  return (
    <div>
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
            <div className="child-details">
              {childOptions?.map(
                (item, index) =>
                  index + 1 === selectedChild && (
                    <div key={item}>
                      <p className="genral-text-left-side">
                        i. Child's Name {index + 1}*
                      </p>
                      <Field
                        // required={isReq}
                        type="text"
                        className="genral-input-left-side"
                        placeholder="Type Name"
                        name={`phase4.family.childDetails[${[
                          index,
                        ]}].childName`}
                        id={`phase4.family.childDetails[${[index]}].childName`}
                        style={
                          errors?.phase4?.family?.childDetails[index]
                            .childName &&
                          touched?.phase4?.family?.childDetails[index]
                            .childName && {
                            border: "1px solid red",
                          }
                        }
                        // onChange={(e) => handleChange(e, index)}
                      />

                      <p className="genral-text-left-side">ii. Gender ?</p>
                      <Field
                        as="select"
                        // required={isReq}
                        name={`phase4.family.childDetails[${[
                          index,
                        ]}].childGender`}
                        id={`phase4.family.childDetails[${[
                          index,
                        ]}].childGender`}
                        placeholder="Select"
                        className="genral-input-left-side-selector"
                        style={
                          errors?.phase4?.family?.childDetails[index]
                            .childGender &&
                          touched?.phase4?.family?.childDetails[index]
                            .childGender && {
                            border: "1px solid red",
                          }
                        }
                        // onChange={(e) => handleChange(e, index)}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">female</option>
                        <option value="Other">Other</option>
                      </Field>

                      <p className="genral-text-left-side">
                        iii. Date of Birth*
                      </p>
                      <input
                        // required={isReq}
                        type="date"
                        className="genral-input-left-side"
                        name={`phase4.family.childDetails[${[index]}].childDob`}
                        id={`phase4.family.childDetails[${[index]}].childDob`}
                        style={
                          errors?.phase4?.family?.childDetails[index]
                            .childDob &&
                          touched?.phase4?.family?.childDetails[index]
                            .childDob && {
                            border: "1px solid red",
                          }
                        }
                        // onChange={(e) => handleChange(e, index)}
                      />

                      <p className="genral-text-left-side">
                        iv. Child Nationality*
                      </p>
                      <select
                        required={isReq}
                        className="genral-input-left-side"
                        name="childNationality"
                        id="childNationality"
                        onChange={(e) => handleChange(e, index)}
                      >
                        <option value="">Select Nationality</option>
                        {countries?.map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>

                      <p className="genral-text-left-side">
                        v. Passport Number*
                      </p>
                      <input
                        required={isReq}
                        type="text"
                        className="genral-input-left-side"
                        name="childPassportNumber"
                        id="childPassportNumber"
                        placeholder="Passport Number*"
                        onChange={(e) => handleChange(e, index)}
                      />

                      <p className="genral-text-left-side">
                        vi. Passport Issued Date*
                      </p>
                      <input
                        required={isReq}
                        type="date"
                        className="genral-input-left-side"
                        name="childPassportIssueDate"
                        id="childPassportIssueDate"
                        onChange={(e) => handleChange(e, index)}
                      />

                      <p className="genral-text-left-side">
                        vii. Passport Expiry Date*
                      </p>
                      <input
                        required={isReq}
                        type="date"
                        className="genral-input-left-side"
                        name="childPassportExpiryDate"
                        id="childPassportExpiryDate"
                        onChange={(e) => handleChange(e, index)}
                      />

                      <p className="genral-text-left-side">viii. Visa Type*</p>
                      <select
                        required={isReq}
                        name="childVisaType"
                        id="childVisaType"
                        placeholder="Select"
                        className="genral-input-left-side-selector"
                        onChange={(e) => handleChange(e, index)}
                      >
                        <option value="">Type of visa refused</option>
                        <option value="AF">Visit</option>
                        <option value="AX">Study</option>
                        <option value="AL">Work</option>
                        <option value="DZ">Settlement </option>
                        <option value="DZ">Other</option>
                      </select>

                      <p className="genral-text-left-side">
                        ix. Visa Issued Date*
                      </p>
                      <input
                        required={isReq}
                        type="date"
                        className="genral-input-left-side"
                        name="childVisaIssueDate"
                        id="childVisaIssueDate"
                        onChange={(e) => handleChange(e, index)}
                      />

                      <p className="genral-text-left-side">
                        x. Visa Expiry Date*
                      </p>
                      <input
                        required={isReq}
                        type="date"
                        className="genral-input-left-side"
                        name="childVisaExpiryDate"
                        id="childVisaExpiryDate"
                        onChange={(e) => handleChange(e, index)}
                      />
                      <br />
                      <button
                        type="button"
                        className="Close-btn-modal"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        //   onClick={handleSubmitData}
                        className="Save-btn-modal"
                      >
                        Save
                      </button>
                    </div>
                  )
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyInfoForm;
