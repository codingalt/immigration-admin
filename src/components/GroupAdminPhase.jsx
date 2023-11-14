import React, { useEffect, useState, useRef } from 'react';
import SideNavbar from './SideNavbar'
import "../style/Phase1.css"
import editimg from "../assests/edit -img.png"
import editpen from "../assests/edit-pen.png"
import link from "../assests/link-company.png"
import selector from "./Selector"
import Selector from './Selector';
import { Link , NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import pdfimg from "../assests/pdf-img.png"
import "../style/Genral.css"
import Editimgapp from "../assests/Edit-file-img.svg"
import Approvedimgapp from "../assests/Approved-img.svg"
import Rejectimgapp from "../assests/Delete-File-img.svg"

const GroupAdminPhase = () => {
    const [Name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [companyContactEmail, setCompanyContactEmail] = useState('');
    const [companyContactPhoneNumber, setCompanyContactPhoneNumber] = useState('');
    const [confirmIndustry, setConfirmIndustry] = useState('');

    // Define handleChange functions for each input
    const handleEmailChange = (e) => {
        setCompanyContactEmail(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setCompanyContactPhoneNumber(e.target.value);
    };

    const handleIndustryChange = (e) => {
        setConfirmIndustry(e.target.value);
    };

    
    const fileInputRef = useRef(null);

    const handlePdfDivClick = (e) => {
        // Programmatically trigger a click on the hidden file input when the div is clicked
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
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
        <div className='Phase-1-main-container'>
            <SideNavbar />
            <h2 className='Pre-screening-text-2'>Pre-Screening</h2>
            <div className='Buttons-preescreening'>
              <button className='Edit-appliction-btn' >Edit <img src={Editimgapp} alt="" /></button>
      <button className='Approved-appliction-btn' >Approved <img src={Approvedimgapp} alt="" /></button>
      <button  className='Reject-appliction-btn'> Reject <img src={Rejectimgapp} alt="" /></button>
              </div>
            {/* <img src={editimg} alt="" className='edit-img' />
            <img src={editpen} alt="" className='edit-pen' />
            <div className='link-img-2'> <img src={link} alt="" className='link-company-2' /> </div> */}
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


            <div className='phase-1'>
                <div className='left-side-phase-1'>
                    <form>
                        <div className='phase-1-form'>
                            <p className="phase-1-text-left-side">Company Name</p>
                            <input className='phase-1-input-left-side'
                                type="text"
                                placeholder="Add Company name"

                              
                            />
                        </div>
                        <div className='email-input'>
                            <p className="phase-1-text-left-side">Company Address</p>
                            <input className='phase-1-input-left-side'
                                type="email"
                                placeholder="Add Company address"

                         
                            />
                        </div>
                        <div className='Phone-number'>
                            <p className="phase-1-text-left-side">Full name of Company Contact</p>
                            <input className='phase-1-input-left-side'
                                type="tel"
                                placeholder="Add Full name of company contact"

                       
                            />
                        </div>

                        <p className="phase-1-text-left-side">Company Contact E-Mail Address</p>
                        <input
                            className='phase-1-input-left-side'
                            type="email"
                            placeholder="Add Company Contact E-Mail Address"
                            value={companyContactEmail}
                    
                        />

                        <p className="phase-1-text-left-side">Company Contact Telephone Number</p>
                        <input
                            className='phase-1-input-left-side'
                            type="tel"
                            placeholder="Add Company Contact Telephone Number"
                            value={companyContactPhoneNumber}
                            onChange={handlePhoneNumberChange}
                        />

                        <p className="phase-1-text-left-side">Confirm Industry</p>
                        <input
                            className='phase-1-input-left-side'
                            type="text"
                            placeholder="Confirm Industry"
                            value={confirmIndustry}
                            onChange={handleIndustryChange}
                        />





                        <p className='country-cnfrm-text'> Confirm if the Company holds a Sponsor Licence</p>

                        <div className='checkbox-phase1'>
                            <p className='yes-check-text'>Yes</p>
                            <input type="checkbox" className='yes-check' />
                            <p className='no-check-text'>No</p>
                            <input type="checkbox" className='no-check' />
                        </div>


                        <input
                            ref={fileInputRef}
                            type="file"
                            style={{ display: 'none' }}
                        // Add any attributes you need for the file input
                        />


                        <p className='password-text'>Letter of Engagement</p>


                        <div
                            className='pdf-input'
                            onClick={handlePdfDivClick}
                        >
                            Click here to Upload PDF
                            <img src={pdfimg} alt="" className='pdf-icon' />
                        </div>



                        <p className='password-text'>Terms and Conditions</p>



                        <div
                            className='pdf-input'
                            onClick={handlePdfDivClick}
                        >
                        Click here to Upload PDF
                            <img src={pdfimg} alt="" className='pdf-icon' />
                        </div>


                    </form>
                </div>



                <div className='right-side'> 

                 <p className='Conf-text'>Confirmtion</p>

                    <p className='phase-1-text-right-side'>CONFIRMATION THAT THE COMPANY CAN HELP</p>

                    <div className='checkbox-phase1'>
                        <p className='yes-check-text'>Yes</p>
                        <input type="checkbox" className='yes-check' />
                        <p className='no-check-text'>No</p>
                        <input type="checkbox" className='no-check' />
                    </div>


          


                    <p className='phase-1-text-right-side'>How CAN THE COMPANY HELP?</p>

                    <select name="languages[]" className='phase-1-input-right-side'>
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>

                    </select>

                    
                    <p className='phase-1-text-right-side'>Application Type</p>
                    <input type="text" placeholder='APL1' className='phase-1-input-left-side' />


         


      




              
                    <div className='checkbox-phase1'>
             
                        <input type="checkbox" className='yes-check' />
                        <p className='yes-check-text'>Company Contact</p>
               
                    </div>
                    <input type="text" placeholder='Type Email' className='phase-1-input-left-side' />


               <div className='checkbox-phase1'>
                  
                        <input type="checkbox" className='yes-check' />
                        <p className='yes-check-text'>Client Contact</p>
               
                    </div>
                    <input type="text" placeholder='Type Email' className='phase-1-input-left-side' />
                          
                    <button className='Send-button'>Send</button>

                    
                </div>
                <button className='Download-button'>Download</button>
            </div>
        </div>
    )
}

export default GroupAdminPhase