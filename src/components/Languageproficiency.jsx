
import React, { useEffect, useState, useRef } from 'react';
import SideNavbar from './SideNavbar'
import editpen from "../assests/edit-pen.png"
import { Link , NavLink } from 'react-router-dom';
import "../style/languageproficiency.css"
import "../style/Genral.css"
import Editimgapp from "../assests/Edit-file-img.svg"
const Languageproficiency = () => {
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


    
    <div className='language-prof-main'>
    

      <form action="">
   
        <div className='left-side-general-lg-pro'>

     
        <p className='country-cnfrm-text-lgpro'>1.Do you have a degree taught in English ?*</p>
          <div className='checkbox-family'>
          <p className='yes-check-text-family'>Yes</p>
          <input type="checkbox" className='yes-check-family' />
          <p className='no-check-text-family'>No</p>
          <input type="checkbox" className='no-check-family' />

          </div>


               
          <p className='country-cnfrm-text-lgpro'>2.Have you passed any English Test ?*</p>
          <div className='checkbox-lgpro'>
          <p className='yes-check-text-family'>Yes</p>
          <input type="checkbox" className='yes-check-family' />
          <p className='no-check-text-family'>No</p>
          <input type="checkbox" className='no-check-family' />

          </div>

   

          <p className='full-name-text-accc-left-lgpro'>i. Please select the relevant test ?*</p>
          <select class="form-select" placeholder='Select' className='input-full-name-acc-left-lgpro'  >
            <p className='select-country-11' >16.Select Country*</p>
            <option>The English language proficiency can be proven as follows:</option>
                                    <option value="AF">TOEFL or TOEFL Special Home Edition</option>
                                    <option value="AX">IELTS</option>
                                    <option value="AL">TOEIC</option>
                                    <option value="DZ">Duolingo</option>
                                    <option value="AX">Pearson</option>
                                    <option value="AL">Trinity College</option>
                                    <option value="DZ">At least 6 months of residence in an English-speaking country
Other</option>
          </select>

          <div className="All-button-containers">
          <Link to="/family">
                 <button className='Back-butnnn'>Back</button>
                 </Link>
                 <Link to="">
                <button className='Save-btnn'>Save</button>
                </Link>
                <Link to="/education">
                <button className='Next-btnnnn'>Next</button>  
                </Link>    
                 </div>   
        </div>
       
       <div className='right-side-lgpro'>
       <button className='Download-button-lgpro'>Download</button>
       </div>
    
      </form>
    </div>
  </div>
  )
}

export default Languageproficiency