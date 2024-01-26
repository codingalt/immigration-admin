import React, { useState } from "react";
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";
import "../style/Addcaseworker.css";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import vectorline from "../assests/Vector-line.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createCaseWorkerSchema } from "../utils/ValidationSchema";
import SelectCountry from "./SelectCountry";
import { useCreateCaseWorkerMutation } from "../services/api/adminApi";
import { useMemo } from "react";
import { toastError, toastSuccess } from "./Toast";
import LanguageList from "./LanguageList";
import Loader from "./Loader";

const Addcaseworker = () => {
  const navigate = useNavigate();
  const [languagesArr, setLanguagesArr] = useState([]);

  const handleRemove = (value) => {
    if (languagesArr.includes(value)) {
      const tempArr = [...languagesArr];
      const filteredArray = tempArr.filter((item) => item !== value);
      setLanguagesArr(filteredArray);
    }
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    workerId: "",
    country: "",
    state: "",
    birthDate: "",
    languages: "",
    password: "",
    confirmPassword: "",
  };

  const [createCaseWorker, res] = useCreateCaseWorkerMutation();
  const { isLoading, error, isSuccess } = res;

  useMemo(() => {
    if (error) {
      toastError(
        error?.data?.message ? error?.data?.message : "Something went wrong"
      );
    }
  }, [error]);

  useMemo(() => {
    if (isSuccess) {
      toastSuccess("Case Worker Profile Created.");
    }
  }, [isSuccess]);

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    await createCaseWorker(values);
    resetForm({
      values: initialValues,
    });
    setLanguagesArr([]);
  };
  return (
    <div className="AddCaseworkerprofile-main-container">
      <SideNavbar />
      <div style={{ marginLeft: "11.8rem" }}>
        <TopNavbar />
        <div>
          <h2 className="changepassword-profile-heading">Caseworker Profile</h2>

          <div className="Addcaseworkerproile-sub-container">
            <div className="add-case-form">
              <Formik
                validationSchema={createCaseWorkerSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue, errors, resetForm, touched }) => (
                  <Form style={{ display: "flex", gap: "4rem" }}>
                    <div className="form-left-side">
                      <p className="add-case-lable">First Name:</p>
                      <Field
                        className="basic-inputs-add-case"
                        type="text"
                        placeholder="John Leo"
                        name="firstName"
                        id="firstName"
                        style={
                          errors.firstName &&
                          touched.firstName && { border: "1px solid red" }
                        }
                      />

                      <p className="add-case-lable">Last Name:</p>
                      <Field
                        className="basic-inputs-add-case"
                        type="text"
                        placeholder="John Leo"
                        name="lastName"
                        id="lastName"
                        style={
                          errors.lastName &&
                          touched.lastName && { border: "1px solid red" }
                        }
                      />

                      <p className="add-case-lable">Email:</p>
                      <Field
                        className="basic-inputs-add-case"
                        type="email"
                        placeholder="email@email.com"
                        name="email"
                        id="email"
                        style={
                          errors.email &&
                          touched.email && { border: "1px solid red" }
                        }
                      />

                      <p className="add-case-lable">Contact:</p>
                      <Field
                        className="basic-inputs-add-case"
                        type="tel"
                        placeholder="(485)-845-8542658"
                        name="contact"
                        id="contact"
                        style={
                          errors.contact &&
                          touched.contact && { border: "1px solid red" }
                        }
                      />

                      <p className="add-case-lable">Agent ID:</p>
                      <Field
                        className="basic-inputs-add-case"
                        type="text"
                        placeholder="Agent ID"
                        name="workerId"
                        id="workerId"
                        style={
                          errors.workerId &&
                          touched.workerId && { border: "1px solid red" }
                        }
                      />

                      <p className="add-case-lable">Date of Birth:</p>
                      <Field
                        name="birthDate"
                        id="birthDate"
                        style={
                          errors.birthDate &&
                          touched.birthDate && { border: "1px solid red" }
                        }
                        className="basic-inputs-add-case"
                        type="date"
                      />

                      <p className="add-case-lable">Country:</p>
                      <SelectCountry
                        className="selector-inputs-add-case"
                        name={"country"}
                      ></SelectCountry>

                      <p className="add-case-lable">State/Province:</p>
                      <Field
                        name="state"
                        id="state"
                        style={
                          errors.state &&
                          touched.state && { border: "1px solid red" }
                        }
                        type="text"
                        className="basic-inputs-add-case"
                        placeholder="State"
                      />

                      <p className="add-case-lable">Language:</p>

                      <LanguageList
                        name="languages"
                        className="selector-inputs-add-case"
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
                    </div>

                    <div className="right-side-add">
                      <p className="add-case-lable">Password:</p>
                      <Field
                        name="password"
                        id="password"
                        style={
                          errors.password &&
                          touched.password && { border: "1px solid red" }
                        }
                        className="basic-inputs-add-case-2"
                        type="password"
                        placeholder="*******"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error"
                      />

                      <p className="add-case-lable">Confirm Password:</p>
                      <Field
                        name="confirmPassword"
                        id="confirmPassword"
                        style={
                          errors.confirmPassword &&
                          touched.confirmPassword && { border: "1px solid red" }
                        }
                        className="basic-inputs-add-case-2"
                        type="password"
                        placeholder="*******"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="error"
                      />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "20px",
                          width: "100%",
                          marginTop: "2rem",
                        }}
                      >
                        <button
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(-1)}
                          type="button"
                          className="cancel-add-case"
                        >
                          Cancel
                        </button>
                        <button
                          disabled={isLoading}
                          style={{ cursor: "pointer" }}
                          type="submit"
                          className="sumbit-add-case"
                        >
                          {isLoading ? "Submit..." : "Submit"}
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addcaseworker;
