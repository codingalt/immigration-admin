import React, { useRef } from "react";
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";
import { Link, useNavigate } from "react-router-dom";
import "../style/Addingprofile.css";
import addcompanysideimg from "../assests/wepik-export-20230607060525FIPD 1.png";
import Loader from "./Loader";
import { toastError, toastSuccess } from "./Toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createCompanySchema } from "../utils/ValidationSchema";
import { useCreateCompanyMutation } from "../services/api/companyApi";
import Congratspopup from "./Congratspopup";
import { useMemo } from "react";

const Addingprofile = () => {
  const navigate = useNavigate();
  const letterOfEngagementRef = useRef(null);
  const termsRef = useRef();

  const openFile = (e, setFieldValue) => {
    if (e.target.files && e.target.files[0]) {
      let pdf = e.target.files[0];
      setFieldValue(e.target.name, pdf);
    }
  };

  const initialValues = {
    name: "",
    address: "",
    email: "",
    fullName: "",
    telephone: "",
    confirmIndustry: "",
    isSponsorLicense: "",
    engagementLetter: "",
    terms: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (values.engagementLetter === "") {
      toastError("Please Upload Engagement Letter");
      return;
    }

    if (values.terms === "") {
      toastError("Please Upload Terms and Conditions");
      return;
    }

    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("address", values.address);
    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    formData.append("telephone", values.telephone);
    formData.append("confirmIndustry", values.confirmIndustry);
    formData.append("isSponsorLicense", values.isSponsorLicense);
    formData.append("engagementLetter", values.engagementLetter);
    formData.append("terms", values.terms);
    console.log(values);

    await createCompany(formData);
  };

  const [createCompany, res] = useCreateCompanyMutation();
  const { isLoading, error, isSuccess } = res;

  useMemo(() => {
    if (error) {
      toastError(error?.data?.message);
    }
  }, [error]);

  useMemo(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/admin/companyprofiles");
      }, 2500);
    }
  }, [isSuccess]);

  return (
    <div className="comapnayprofile-main-container">
      <SideNavbar />

      {isSuccess && <Congratspopup />}

      <div style={{ marginLeft: "11.8rem" }}>
        <TopNavbar />
        <div>
          <h2 className="changepassword-profile-heading">Add New Company</h2>

          <div className="Addingcompany-sub-container">
            <div className="left-add-company-profile">
              <Formik
                validationSchema={createCompanySchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue, errors, resetForm, touched, values }) => (
                  <Form>
                    <p className="heading-ist">
                      ADMINISTRATOR CREATES A PROFILE FOR A GROUP*
                    </p>
                    <p className="full-name-text-accc-left-adding-profile">
                      Company Name
                    </p>
                    <Field
                      type="text"
                      className="input-full-name-acc-left-adding-profile"
                      placeholder="Add Company name"
                      name="name"
                      id="name"
                      style={
                        errors.name &&
                        touched.name && { border: "1px solid red" }
                      }
                    />

                    <p className="full-name-text-accc-left-adding-profile">
                      Company Address
                    </p>
                    <Field
                      type="text"
                      className="input-full-name-acc-left-adding-profile"
                      placeholder="Add Company address"
                      name="address"
                      id="address"
                      style={
                        errors.address &&
                        touched.address && { border: "1px solid red" }
                      }
                    />

                    <p className="full-name-text-accc-left-adding-profile">
                      Full name of Company Contact
                    </p>
                    <Field
                      type="text"
                      className="input-full-name-acc-left-adding-profile"
                      placeholder="Add Full name of company contact"
                      name="fullName"
                      id="fullName"
                      style={
                        errors.fullName &&
                        touched.fullName && { border: "1px solid red" }
                      }
                    />

                    <p className="full-name-text-accc-left-adding-profile">
                      Company Contact E-Mail address
                    </p>
                    <Field
                      type="text"
                      className="input-full-name-acc-left-adding-profile"
                      placeholder="Add Company contact email address"
                      name="email"
                      id="email"
                      style={
                        errors.email &&
                        touched.email && { border: "1px solid red" }
                      }
                    />

                    <p className="full-name-text-accc-left-adding-profile">
                      Company Contact telephone number
                    </p>
                    <Field
                      type="text"
                      className="input-full-name-acc-left-adding-profile"
                      placeholder="Add company contact telephone number"
                      name="telephone"
                      id="telephone"
                      style={
                        errors.telephone &&
                        touched.telephone && { border: "1px solid red" }
                      }
                    />

                    <p className="full-name-text-accc-left-adding-profile">
                      Confirm industry
                    </p>
                    <Field
                      type="text"
                      className="input-full-name-acc-left-adding-profile"
                      placeholder="Company"
                      name="confirmIndustry"
                      id="confirmIndustry"
                      style={
                        errors.confirmIndustry &&
                        touched.confirmIndustry && { border: "1px solid red" }
                      }
                    />

                    <p className="country-cnfrm-text-add-company">
                      1.Do you have a degree taught in English ?*
                    </p>
                    <div className="checkbox-add-company">
                      <p className="yes-check-text-family">Yes</p>
                      <input
                        required
                        type="radio"
                        name="isSponsorLicense"
                        id="isSponsorLicense"
                        className="yes-check-family"
                        onChange={(e) => {
                          setFieldValue("isSponsorLicense", true);
                        }}
                      />
                      <p className="no-check-text-family">No</p>
                      <input
                        required
                        type="radio"
                        name="isSponsorLicense"
                        id="isSponsorLicense"
                        className="no-check-family"
                        onChange={(e) => {
                          setFieldValue("isSponsorLicense", false);
                        }}
                      />
                    </div>

                    {/* Add the div for file input */}

                    <p className="full-name-text-accc-left-adding-profile">
                      Letter of Engagement
                    </p>
                    <div
                      style={{ cursor: "pointer" }}
                      className="custom-div"
                      onClick={() => letterOfEngagementRef.current.click()}
                    >
                      <span className="upload-icon">&#x1F4C2;</span>{" "}
                      <p className="upload">
                        {values.engagementLetter
                          ? values.engagementLetter.name
                          : "Upload File"}
                      </p>
                    </div>
                    {/* Hidden file input */}

                    <div className="custom-file-label">
                      <input
                        ref={letterOfEngagementRef}
                        type="file"
                        id="engagementLetter"
                        name="engagementLetter"
                        accept=".pdf"
                        onChange={(event) => openFile(event, setFieldValue)}
                        style={{ display: "none" }}
                      />
                    </div>

                    <p className="full-name-text-accc-left-adding-profile">
                      Terms and Conditions
                    </p>
                    <div
                      style={{ cursor: "pointer" }}
                      className="custom-div"
                      onClick={() => termsRef.current.click()}
                    >
                      <span className="upload-icon">&#x1F4C2;</span>{" "}
                      <p className="upload">
                        {values.terms ? values.terms.name : "Upload File"}
                      </p>
                    </div>
                    {/* Hidden file input */}

                    <div className="custom-file-label">
                      <input
                        ref={termsRef}
                        type="file"
                        id="terms"
                        name="terms"
                        accept=".pdf"
                        onChange={(event) => openFile(event, setFieldValue)}
                        style={{ display: "none" }}
                      />
                    </div>
                    <button
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      type="submit"
                      className="create-profile-button"
                    >
                      {isLoading ? <Loader /> : "Create Profile"}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>

            <div className="right-side-add-company">
              <img src={addcompanysideimg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addingprofile;
