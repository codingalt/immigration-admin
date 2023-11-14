import React, { useEffect, useState, useRef } from 'react';
import SideNavbar from './SideNavbar'
import editpen from "../assests/edit-pen.png"
import { Link , NavLink } from 'react-router-dom';
import "../style/phase3.css"
import pdfimg from "../assests/pdf-img.png"
import Editimgapp from "../assests/Edit-file-img.svg"
import Approvedimgapp from "../assests/Approved-img.svg"
import Rejectimgapp from "../assests/Delete-File-img.svg"


const Groupsidephase3 = () => {

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
            <Link to="/prescreening">
            <button className='back-btn'>Back</button>
</Link>

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
           

            <div className='phase-3'>
              <p className='evidence-payement-text'>Evidence of Payment*</p>
              <Link to="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">
          <div className='pdf-17'>
            Click here to open PDF
            <img src={pdfimg} alt="" className='pdf-icon' />
          </div>
        </Link>
        <button className='Download-btn-2'>Download</button>
            </div>
        </div>
    )
}
export default Groupsidephase3