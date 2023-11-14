import React, { useEffect, useState, useRef } from 'react';
import editpen from "../assests/edit-pen.png"
import SideNavbar from './SideNavbar'
import "../style/Phase2.css"
import { Link , NavLink } from 'react-router-dom';
import "../style/Phase1.css"
import pdfimg from "../assests/pdf-img.png"
import Editimgapp from "../assests/Edit-file-img.svg"
import Approvedimgapp from "../assests/Approved-img.svg"
import Rejectimgapp from "../assests/Delete-File-img.svg"
const GroupPhase3 = () => {

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
        <div className='Phase-2-main-container'>
          <SideNavbar />
          <h2 className='Pre-screening-text'>Pre-Screening</h2>
          <div className='Buttons-preescreening'>
              <button className='Edit-appliction-btn' >Edit <img src={Editimgapp} alt="" /></button>
      <button className='Approved-appliction-btn' >Approved <img src={Approvedimgapp} alt="" /></button>
      <button  className='Reject-appliction-btn'> Reject <img src={Rejectimgapp} alt="" /></button>
              </div>
          <img src={editpen} alt="" className='edit-pen' />
          <NavLink exact to="/prescreening" activeClassName="active-link">
                <button className='back-btn'>Back</button>
            </NavLink>
                 
            <div className='Group-side-All-phase'>
        {links.map((link, index) => (
            <NavLink
                key={index}
                to={link.to}
                className={`link-hover-effect ${activeLink === link.label ? 'link-active' : ''}`}
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
                <span className='routes-all'>{link.label}</span>
            </NavLink>
        ))}
    </div>
          <div className='Phase-2'>
    
          <div className='Phase-2-left'>
    
            <p className='password-text'>PASSPORT*</p>
    
            {/* The example above links to a sample PDF file htpp......
             If you want to dynamically upload and display PDFs, you'll need to handle the file upload and storage in your application.
             You can utilize a backend server to handle this part. Here's an overview:
            Create an API endpoint on your server to handle PDF uploads.
            Use a form or API call to upload the PDF from the client side to the server.
            Store the uploaded PDF on the server (you can save it in a designated folder).
            Once the PDF is uploaded, generate a URL pointing to the uploaded PDF on the server. */}
    
            <Link to="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">
            <div className='pdf-input'>
                Click here to open PDF
                <img src={pdfimg} alt="" className='pdf-icon' />
              </div>
            </Link>
    
    
            <p className='password-text'>DEPENDANT PASSPORT*</p>
    
    
    
            <Link to="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">
            <div className='pdf-input'>
                Click here to open PDF
                <img src={pdfimg} alt="" className='pdf-icon' />
              </div>
            </Link>
    
    
            <p className='password-text'>UTILITY BILL*</p>
    
    
    
            <Link to="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">
            <div className='pdf-input'>
                Click here to open PDF
                <img src={pdfimg} alt="" className='pdf-icon' />
              </div>
            </Link>
    
            <p className='password-text'>BRP*</p>
    
    
    
            <Link to="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">
            <div className='pdf-input'>
                Click here to open PDF
                <img src={pdfimg} alt="" className='pdf-icon' />
              </div>
            </Link>
    
            <p className='password-text'>PREVIOUS VISA VIGNETTES</p>
    
    
    
            <Link to="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">
            <div className='pdf-input'>
                Click here to open PDF
                <img src={pdfimg} alt="" className='pdf-icon' />
              </div>
            </Link>
    
    
            <p className='password-text'>REFUSAL LETTER</p>
    
    
    
            <Link to="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">
            <div className='pdf-input'>
                Click here to open PDF
                <img src={pdfimg} alt="" className='pdf-icon' />
              </div>
            </Link>
            </div>
             <div className='Phase-2-right'>
             <p className='password-text'>EDUCATION CERTIFICATES*</p>
    
    
    
    <Link to="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">
    <div className='pdf-input'>
        Click here to open PDF
        <img src={pdfimg} alt="" className='pdf-icon' />
      </div>
    </Link>
    
    
    <p className='password-text'>ENGLISH LANGUAGE CERTIFICATE*</p>
    
    
    
    <Link to="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">
    <div className='pdf-input'>
        Click here to open PDF
        <img src={pdfimg} alt="" className='pdf-icon' />
      </div>
    </Link>
    
    <p className='password-text'>MARRIAGE CERTIFICATE*</p>
    
    
    
    <Link to="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">
    <div className='pdf-input'>
        Click here to open PDF
        <img src={pdfimg} alt="" className='pdf-icon' />
      </div>
    </Link>
    
    <p className='password-text'>BANK STATEMENTS*</p>
    
    
    
    <Link to="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">
    <div className='pdf-input'>
        Click here to open PDF
        <img src={pdfimg} alt="" className='pdf-icon' />
      </div>
    </Link>
    
    <p className='password-text'>OTHER</p>
    
    
    
    <Link to="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">
      <div className='pdf-input'>
        Click here to open PDF
        <img src={pdfimg} alt="" className='pdf-icon' />
      </div>
    </Link>
    
    <button className='Download-btn-phase-2'>Download</button>
    
             </div>
    
          </div>
        </div>
      )
    }

export default GroupPhase3