import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import SideNavbar from "./SideNavbar";
import editpen from "../assests/edit-pen.png";
import "../style/Phase1.css";

import { NavLink } from "react-router-dom";
import Editimgapp from "../assests/Edit-file-img.svg"
import Approvedimgapp from "../assests/Approved-img.svg"
import Rejectimgapp from "../assests/Delete-File-img.svg"

const GroupPrephase3 = () => {
  const fileInputRef = useRef(null);

  const handlePdfDivClick = (e) => {
    // Programmatically trigger a click on the hidden file input when the div is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRequestClick = () => {
    // This function will be called when the "Request" button is clicked
    // You can add your logic here
    console.log("Request button clicked!");
    // You can perform additional actions here, such as making API calls, updating state, etc.
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
  const [activeLink, setActiveLink] = useState(null);

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

  return (
    <div className="Pre-phase-2-container">
      <SideNavbar />
      <h2 className="Pre-screening-text">Pre-Screening</h2>
      <div className='Buttons-preescreening'>
              <button className='Edit-appliction-btn' >Edit <img src={Editimgapp} alt="" /></button>
      <button className='Approved-appliction-btn' >Approved <img src={Approvedimgapp} alt="" /></button>
      <button  className='Reject-appliction-btn'> Reject <img src={Rejectimgapp} alt="" /></button>
              </div>
      <img src={editpen} alt="" className="edit-pen" />
      <NavLink exact to="/prescreening" activeClassName="active-link">
        <button className="back-btn">Back</button>
      </NavLink>

      <div className="Group-side-All-phase">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={`link-hover-effect ${
              activeLink === link.label ? "link-active" : ""
            }`}
            onClick={() => handleLinkClick(link.label)}
            style={
              link.to === "/groupadminphase1"
                ? { width: "5.8rem" }
                : link.to === "/groupprephase2"
                ? { width: "2.9rem" }
                : link.to === "/groupphase2"
                ? { width: "4.4rem" }
                :
                link.to === "/groupprephase3"
                ? { width: "2.9rem" }
                :
                link.to === "/groupsideprephase3"
                ? { width: "4.4rem" }
                :
                link.to === "/groupsidephase3"
                ? { width: "2.9rem" }
                :
                
                
                
                 {
                    width: "4rem",
                  }
            }
          >
            <span className="routes-all">{link.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="pre-phase-2-div">
        <div className="Group-dataa-main">
          <p className="req-term-con-text">Required Terms & Conditions</p>
          <div className="group-detail-phase3">
            <input type="checkbox" />
            <p> TERMS & CONDITIONS </p>
          </div>

          <div className="group-detail-phase3">
            <input type="checkbox" />
            <p> Authority to Act </p>
          </div>

          <div className="group-detail-phase3">
            <input type="checkbox" />
            <p> AUTHORITY TO ALLOW THE OISC ACCESS TO THE FILE</p>
          </div>

          <div className="group-detail-phase3">
            <input type="checkbox" />
            <p>
              {" "}
              AUTHORITY TO SHARE THE CLIENT’S DETAILS WITH COMPANY CONTACTS AND
              IT’S AGENTS AND ALL OTHER APPLICABLE AGENTS{" "}
            </p>
          </div>
        </div>
        <p className="Required-document-text-group">
          Required Documents (PDF ONLY)*
        </p>

        <div className="checkboxes-all-group">
          <p className="prephase-2-text"> Passport </p>
          <input type="checkbox" className="checks-prephase-2" />
          <p className="prephase-2-text"> DEPENDANT PASSPORT </p>
          <input type="checkbox" className="checks-prephase-2" />

          <p className="prephase-2-text"> UTILITY BILL </p>
          <input type="checkbox" className="checks-prephase-2" />
          <p className="prephase-2-text"> BRP </p>
          <input type="checkbox" className="checks-prephase-2" />

          <p className="prephase-2-text"> PREVIOUS VISA VIGNETTES </p>
          <input type="checkbox" className="checks-prephase-2" />
          <p className="prephase-2-text"> REFUSAL LETTER </p>
          <input type="checkbox" className="checks-prephase-2" />
          <p className="prephase-2-text"> EDUCATION CERTIFICATES </p>
          <input type="checkbox" className="checks-prephase-2" />
          <p className="prephase-2-text"> ENGLISH LANGUAGE CERTIFICATE </p>
          <input type="checkbox" className="checks-prephase-2" />
          <p className="prephase-2-text"> MARRIAGE CERTIFICATE </p>
          <input type="checkbox" className="checks-prephase-2" />
          <p className="prephase-2-text"> BANK STATEMENTS </p>
          <input type="checkbox" className="checks-prephase-2" />
        </div>

        <div className="right-side-group-phase3">
          <p className="Other">
            {" "}
            <input type="checkbox" /> OTHER{" "}
          </p>

          <input
            className="pre-phase-input"
            type="text"
            placeholder="Document"
          />
          <button className="req-btn" onClick={handleRequestClick}>
            Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupPrephase3;
