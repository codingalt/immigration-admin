import React, { useEffect, useState, useRef, useMemo } from 'react';
import SideNavbar from './SideNavbar'
import "../style/Phase1.css"
import editimg from "../assests/edit -img.png"
import editpen from "../assests/edit-pen.png"
import link from "../assests/link-company.png"
import selector from "./Selector"
import Selector from './Selector';
import { Link , NavLink, useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import pdfimg from "../assests/pdf-img.png"
import "../style/Genral.css"
import Editimgapp from "../assests/Edit-file-img.svg"
import Approvedimgapp from "../assests/Approved-img.svg"
import Rejectimgapp from "../assests/Delete-File-img.svg"
import { useGetCompanyDetailsByIdQuery, useSendRequestToCompanyClientMutation } from '../services/api/companyApi';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toastError, toastSuccess } from './Toast';
import Loader from './Loader';

const GroupAdminPhase = () => {
    const {companyId,service} = useParams();
    const {data} = useGetCompanyDetailsByIdQuery(companyId);
    console.log("Company details", data);
    const company = data?.company;
    const navigate = useNavigate();
    const [doesCompanyHelp, setDoesCompanyHelp] = useState(true)
    const [isCompanyContact, setIsCompanyContact] = useState(null);
    const [isClientContact, setIsClientContact] = useState(null);

    const [sendRequestToCompanyClient,res] = useSendRequestToCompanyClientMutation();
    const {isLoading, error,isSuccess} = res;
    
    const initialValues = {
      applicationType: "",
      name: company?.name,
      address: company?.address,
      fullName: company?.fullName,
      email: company?.email,
      telephone: company?.telephone,
      confirmIndustry: company?.confirmIndustry,
      isSponsorLicense: company?.isSponsorLicense,
      engagementLetter: company?.engagementLetter,
      terms: company?.terms,
      companyId: companyId,
      phase1: {
        doesCompanyHelp: true,
        companyHelpService: "",
        applicationType: "",
        cost: 0,
        dateTime: new Date(),
        companyContact: "",
        clientContact: "",
      },
    };

    const links = [
        { to: "/groupadminphase1", label: "Company Detail" },
        { to: "/groupprephase2", label: "Phase 1" },
        { to: "/groupphase2", label: "Pre-Phase 2" },
        { to: "/groupprephase3", label: "Phase 2" },
        { to: "/groupsideprephase3", label: "Pre-Phase 3" },
        { to: "/groupsidephase3", label: "Phase 3" },
        { to: "/phase4", label: "Phase 4" },

        // Add more links as needed
    ];
    const [activeLink, setActiveLink] = useState("/groupadminphase1");
    
    useEffect(() => {
        // Get the current path from window.location.pathname
        const currentPath = window.location.pathname;
    
        // Find the matching label from the links array based on the current path
        const matchedLink = links.find((link) => link.to === currentPath);
    
        if (matchedLink) {
            setActiveLink(matchedLink.label);
        }
    }, [links]);
    
    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
    };

    useMemo(()=>{
      if(isSuccess){
        toastSuccess("Application Details Sent to client.");
      }
    },[isSuccess])

    useMemo(() => {
      if (error) {
        toastError(error?.data?.message);
      }
    }, [error]);

    const handleSubmit = async (values, { resetForm }) => {
      console.log(values);
      if(!values.phase1.companyContact && !values.phase1.clientContact){
        toastError("Please Enter Client or Company Contact");
        return;
      }

      const {data} = await sendRequestToCompanyClient({ companyId: companyId, phase1: values.phase1 });
      if(data.success){
        resetForm({
          values: initialValues,
        });
      }

    };

    return (
      <div className="Phase-1-main-container">
        <SideNavbar />
        <h2 className="Pre-screening-text-2">Pre-Screening</h2>
        <div className="Buttons-preescreening"></div>
        <button onClick={() => navigate(-1)} className="back-btn">
          Back
        </button>

        <div className="Group-side-All-phase">
          <NavLink
            to={"#"}
            className={`link-hover-effect ${
              activeLink === "/groupadminphase1" ? "link-active" : ""
            }`}
            style={{ width: "7rem" }}
          >
            <span className="routes-all">Company Details</span>
          </NavLink>
        </div>

        {data && (
          <div className="phase-1">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ setFieldValue, errors, resetForm }) => (
                <Form style={{ display: "flex", justifyContent: "center" }}>
                  <div className="left-side-phase-1">
                    <div className="phase-1-form">
                      <p className="phase-1-text-left-side">Company Name</p>
                      <Field
                        disabled={true}
                        className="phase-1-input-left-side"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Add Company name"
                      />
                    </div>
                    <div className="email-input">
                      <p className="phase-1-text-left-side">Company Address</p>
                      <Field
                        disabled={true}
                        className="phase-1-input-left-side"
                        type="email"
                        name="address"
                        id="address"
                        placeholder="Add Company address"
                      />
                    </div>
                    <div className="Phone-number">
                      <p className="phase-1-text-left-side">
                        Full name of Company Contact
                      </p>
                      <Field
                        disabled={true}
                        className="phase-1-input-left-side"
                        type="tel"
                        name="fullName"
                        id="fullName"
                        placeholder="Add Full name of company contact"
                      />
                    </div>

                    <p className="phase-1-text-left-side">
                      Company Contact E-Mail Address
                    </p>
                    <Field
                      disabled={true}
                      className="phase-1-input-left-side"
                      type="email"
                      name="email"
                      id="email"
                    />

                    <p className="phase-1-text-left-side">
                      Company Contact Telephone Number
                    </p>
                    <Field
                      disabled={true}
                      className="phase-1-input-left-side"
                      type="tel"
                      name="telephone"
                      id="telephone"
                    />

                    <p className="phase-1-text-left-side">Confirm Industry</p>
                    <Field
                      disabled={true}
                      className="phase-1-input-left-side"
                      type="text"
                      name="confirmIndustry"
                      id="confirmIndustry"
                    />

                    <p className="country-cnfrm-text">
                      {" "}
                      Confirm if the Company holds a Sponsor Licence
                    </p>

                    <div className="checkbox-phase1">
                      <p className="yes-check-text">Yes</p>
                      <Field
                        disabled={true}
                        type="checkbox"
                        className="yes-check"
                        checked={company?.isSponsorLicense}
                      />
                      <p className="no-check-text">No</p>
                      <Field
                        disabled={true}
                        type="checkbox"
                        className="no-check"
                        checked={!company?.isSponsorLicense}
                      />
                    </div>

                    <p className="password-text">Letter of Engagement</p>

                    <Link
                      to={`${import.meta.env.VITE_IMG_URI}${
                        company?.engagementLetter
                      }`}
                      target="_blank"
                    >
                      <div className="pdf-input">
                        {company?.engagementLetter?.split("/Uploads/")}
                        <img src={pdfimg} alt="" className="pdf-icon" />
                      </div>
                    </Link>

                    <p className="password-text">Terms and Conditions</p>

                    <Link
                      to={`${import.meta.env.VITE_IMG_URI}${company?.terms}`}
                      target="_blank"
                    >
                      <div
                        className="pdf-input"
                        style={{ marginBottom: "4rem" }}
                      >
                        {company?.terms?.split("/Uploads/")}
                        <img src={pdfimg} alt="" className="pdf-icon" />
                      </div>
                    </Link>
                  </div>

                  <div className="right-side" style={{ marginLeft: "0" }}>
                    <p className="Conf-text">Confirmtion</p>

                    <p className="phase-1-text-right-side">
                      CONFIRMATION THAT THE COMPANY CAN HELP
                    </p>

                    <div className="checkbox-phase1">
                      <p className="yes-check-text">Yes</p>
                      <input
                        checked={doesCompanyHelp}
                        type="radio"
                        required
                        className="yes-check"
                        name="phase1.doesCompanyHelp"
                        id="phase1.doesCompanyHelp"
                        onChange={(e) => {
                          setFieldValue("phase1.doesCompanyHelp", true);
                          setDoesCompanyHelp(true);
                        }}
                      />
                      <p className="no-check-text">No</p>
                      <input
                        checked={!doesCompanyHelp}
                        type="radio"
                        required
                        className="no-check"
                        name="phase1.doesCompanyHelp"
                        id="phase1.doesCompanyHelp"
                        onChange={(e) => {
                          setFieldValue("phase1.doesCompanyHelp", false);
                          setDoesCompanyHelp(false);
                        }}
                      />
                    </div>

                    {doesCompanyHelp && (
                      <>
                        <p className="phase-1-text-right-side">
                          How CAN THE COMPANY HELP?
                        </p>

                        <Field
                          required={doesCompanyHelp}
                          as="select"
                          name="phase1.companyHelpService"
                          id="phase1.companyHelpService"
                          className="phase-1-input-right-side"
                          style={{ width: "83%" }}
                          onChange={(e) =>
                            setFieldValue(
                              "phase1.companyHelpService",
                              e.target.value
                            )
                          }
                        >
                          <option value="Sponsor License">
                            Sponsor License
                          </option>
                          <option value="Certificate of Sponsorship">
                            Certificate of Sponsorship
                          </option>
                          <option value="Certificate of Acceptance of Studies">
                            Certificate of Acceptance of Studies
                          </option>
                          <option value="Entry Clearance">
                            Entry Clearance
                          </option>
                          <option value="Leave to Remain">
                            Leave to Remain
                          </option>
                          <option value="Indefinite Leave to Remain">
                            Indefinite Leave to Remain
                          </option>
                          <option value="Naturalisation">Naturalisation</option>
                          <option value="EEUS Settlement">
                            EEUS Settlement
                          </option>
                          <option value="University Placement">
                            University Placement
                          </option>
                          <option value="Immigration Matter">
                            Immigration Matter
                          </option>
                          <option value="AN1 – Naturalisation">
                            AN1 – Naturalisation{" "}
                          </option>
                          <option value="MN1 – Registration">
                            MN1 – Registration{" "}
                          </option>
                          <option value="ILR – Indefinite Leave to Remain">
                            ILR – Indefinite Leave to Remain
                          </option>
                          <option value="FLR – Further Leave to Remain">
                            FLR – Further Leave to Remain{" "}
                          </option>
                          <option value="FLR(FP)">FLR(FP)</option>
                          <option value="FLR(M)">FLR(M) </option>
                          <option value="SW – Skilled Worker">
                            SW – Skilled Worker{" "}
                          </option>
                          <option value="SL- Sponsor Licence">
                            SL- Sponsor Licence{" "}
                          </option>
                          <option value="Student">Student </option>
                          <option value="Student Child">Student Child</option>
                          <option value="Graduate Visa">Graduate Visa</option>
                          <option value="ECS- Entry Clearance Spouse">
                            ECS- Entry Clearance Spouse{" "}
                          </option>
                          <option value="ECV – Entry Clearance Visitor">
                            ECV – Entry Clearance Visitor{" "}
                          </option>
                          <option value="ECD – Entry Clearance Dependant">
                            ECD – Entry Clearance Dependant{" "}
                          </option>
                          <option value="PS – Pre Settled Status">
                            PS – Pre Settled Status
                          </option>
                          <option value="SS – Settled Status">
                            SS – Settled Status{" "}
                          </option>
                          <option value="Others">Others </option>
                          <option value="Others">Others</option>
                        </Field>
                      </>
                    )}

                    <p className="phase-1-text-right-side">Application Type</p>
                    <Field
                      required
                      name="phase1.applicationType"
                      id="phase1.applicationType"
                      type="text"
                      placeholder="Aplication Type"
                      className="phase-1-input-left-side"
                    />

                    <div className="checkbox-phase1">
                      <input
                        defaultChecked
                        onChange={() => {
                          setIsCompanyContact(true);
                        }}
                        type="checkbox"
                        className="yes-check"
                      />
                      <p className="yes-check-text">Company Contact</p>
                    </div>
                    <Field
                      required={isCompanyContact}
                      type="email"
                      placeholder="Type Email"
                      name="phase1.companyContact"
                      id="phase1.companyContact"
                      className="phase-1-input-left-side"
                    />

                    <div className="checkbox-phase1">
                      <input
                        defaultChecked
                        type="checkbox"
                        className="yes-check"
                        onChange={() => {
                          setIsClientContact(true);
                        }}
                      />
                      <p className="yes-check-text">Client Contact</p>
                    </div>
                    <Field
                      required={isClientContact}
                      type="email"
                      name="phase1.clientContact"
                      id="phase1.clientContact"
                      placeholder="Type Email"
                      className="phase-1-input-left-side"
                    />

                    <button
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        opacity: isLoading ? 0.55 : 1,
                      }}
                      type="submit"
                      className="Send-button"
                    >
                      {isLoading ? <Loader /> : "Send"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    );
}

export default GroupAdminPhase