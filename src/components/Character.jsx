import React, { useEffect, useState, useRef } from 'react';
import SideNavbar from './SideNavbar'
import editpen from "../assests/edit-pen.png"
import { Link , NavLink } from 'react-router-dom';
import "../style/character.css"
import "../style/Genral.css"
import Editimgapp from "../assests/Edit-file-img.svg"
import Approvedimgapp from "../assests/Approved-img.svg"
import Rejectimgapp from "../assests/Delete-File-img.svg"

const Character = () => {
  const links = [
    { to: "/phase4", label: "General" },
    { to: "/accommodation", label: "Accommodation" },
    { to: "/family", label: "Family" },
    { to: "/languageproficiency", label: "Language Proficiency" },
    { to: "/education", label: "Education" },
    { to: "/employment", label: "Employement" },
    { to: "/maintenance", label: "Mainteance" },
    { to: "/travel", label: "travel" },
    { to: "/character", label: "Character" },
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
    <Link to="/phase1">
            <button className='back-btn'>Back</button>
</Link>

    
<div className='phase-4-all-phase'>
        {links.map((link, index) => (
            <NavLink
                key={index}
                to={link.to}
                className={`link-hover-effect ${activeLink === link.label ? 'link-active' : ''}`}
                onClick={() => handleLinkClick(link.label)}
                style={link.to === "/languageproficiency"? {width:'8rem'}: {}}
            >
               <span className='routes-all'>{link.label}</span>
            </NavLink>
        ))}
    </div>

  

    <div className='character-main'>

        <form action="">
          <div className='left-side-general-charcter'>


          <p className='country-cnfrm-text-charcter'>1.Have you ever been charged with a criminal offence ?*</p>
            <div className='checkbox-charcter'>
            <p className='yes-check-text-family'>Yes</p>
            <input type="checkbox" className='yes-check-family' />
            <p className='no-check-text-family'>No</p>
            <input type="checkbox" className='no-check-family' />

            </div>

       
            <p className='full-name-text-accc-left-charcter'>i. Please provide details*</p>
            <input type="text" className='input-full-name-acc-left-charcter' placeholder='Type Address' />


            <p className='country-cnfrm-text-charcter'>2.Do you have any pending prosecutions ?*</p>
            <div className='checkbox-charcter'>
            <p className='yes-check-text-family'>Yes</p>
            <input type="checkbox" className='yes-check-family' />
            <p className='no-check-text-family'>No</p>
            <input type="checkbox" className='no-check-family' />

            </div>

            <p className='full-name-text-accc-left-charcter'>i. Please provide details*</p>
            <input type="text" className='input-full-name-acc-left-charcter' placeholder='Type Text' />


            <p className='country-cnfrm-text-charcter'>3.Have you ever had any terrorist views or charged with or been questioned in relation to terrorist charges?*</p>
            <div className='checkbox-charcter'>
            <p className='yes-check-text-family'>Yes</p>
            <input type="checkbox" className='yes-check-family' />
            <p className='no-check-text-family'>No</p>
            <input type="checkbox" className='no-check-family' />

            </div>

            <p className='full-name-text-accc-left-charcter'>i. Please provide details*</p>
            <input type="text" className='input-full-name-acc-left-charcter' placeholder='Type Text' />



            <p className='country-cnfrm-text-charcter'>4.Have you ever worked for the (Judiciary/Security Services/Media/Intelligence Agencies/Armed Forces) of any country?*</p>
            <div className='checkbox-charcter'>
            <p className='yes-check-text-family'>Yes</p>
            <input type="checkbox" className='yes-check-family' />
            <p className='no-check-text-family'>No</p>
            <input type="checkbox" className='no-check-family' />

            </div>

            <p className='full-name-text-accc-left-charcter'>i. Please provide details*</p>
            <input type="text" className='input-full-name-acc-left-charcter' placeholder='Type Text' />
    


          </div>

          <div className='right-side-lgpro'>
       <button className='Download-button-character'>Download</button>

       </div>

             
  
       <div className="All-button-containers-Character">
                 <button className='Back-butnnn'>Back</button>
                <button className='Save-btnn'>Save</button>
                <button className='Next-btnnnn'>Next</button>     
                 </div>  
      
        </form>

   
    </div>
</div>
  )
}

export default Character