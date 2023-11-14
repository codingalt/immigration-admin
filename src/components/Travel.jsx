import React, { useEffect, useState, useRef } from 'react';
import SideNavbar from './SideNavbar'
import editpen from "../assests/edit-pen.png"
import { Link , NavLink } from 'react-router-dom';
import "../style/travel.css"
import "../style/Genral.css"
import Editimgapp from "../assests/Edit-file-img.svg"

const Travel = () => {
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
  
  
    <div className='Travel-main'>

        <form action="">
          <div className='left-side-general-travel'>


          <p className='country-cnfrm-text-travel-2'>1.Are you currently in the UK?*</p>
            <div className='checkbox-travel'>
            <p className='yes-check-text-family'>Yes</p>
            <input type="checkbox" className='yes-check-family' />
            <p className='no-check-text-family'>No</p>
            <input type="checkbox" className='no-check-family' />

            </div>

       
            <p className='full-name-text-accc-left-travel'>i. What countries have you visited – please provide the date you entered
   the country and the date you left and the reason for your visit*</p>
            <input type="text" className='input-full-name-acc-left-travel' placeholder='Type Address' />

            <p className='full-name-text-accc-left-travel'>ii. Country Visited*</p>
            <input type="text" className='input-full-name-acc-left-travel' placeholder='Name of Spouse*' />

            <p className='full-name-text-accc-left-travel'>iii. What date did you leave the UK?*</p>
            <input type="date" className='input-full-name-acc-left-travel' name="" id="" />

            <p className='full-name-text-accc-left-travel'>iv. What date did you return*</p>
            <input type="date" className='input-full-name-acc-left-travel' name="" id="" />

        
            <p className='full-name-text-accc-left-travel'>v. Reason for your visit*</p>
            <input type="text" className='input-full-name-acc-left-travel' placeholder='Type' />


            <p className='full-name-text-accc-left-travel'>2.Please list the last 5 visits to the UK – date entered/date left and the 
      reasons for your visit*</p>
            <input type="text" className='input-full-name-acc-left-travel' placeholder='Type Number' />



 
            <p className='full-name-text-accc-left-travel'>i. Date of Entry*</p>
            <input type="date" className='input-full-name-acc-left-travel' name="" id="" />

            <p className='full-name-text-accc-left-travel'>ii. Date of Departure*</p>
            <input type="date" className='input-full-name-acc-left-travel' name="" id="" />


            <p className='full-name-text-accc-left-travel'>iii. Reason for Visit*</p>
            <input type="text" className='input-full-name-acc-left-travel' placeholder='Type Text' />


            <p className='country-cnfrm-text-travel'>3.Have you ever entered the UK illegally?*</p>
            <div className='checkbox-travel'>
            <p className='yes-check-text-family'>Yes</p>
            <input type="checkbox" className='yes-check-family' />
            <p className='no-check-text-family'>No</p>
            <input type="checkbox" className='no-check-family' />

            </div>

            <p className='full-name-text-accc-left-travel'>i. please provide details*</p>
            <input type="text" className='input-full-name-acc-left-travel' placeholder='Type Text' />


            <p className='country-cnfrm-text-travel'>4.Have you ever stayed beyond the expiry date of your visa in the UK?*</p>
            <div className='checkbox-travel'>
            <p className='yes-check-text-family'>Yes</p>
            <input type="checkbox" className='yes-check-family' />
            <p className='no-check-text-family'>No</p>
            <input type="checkbox" className='no-check-family' />

            </div>

            <p className='full-name-text-accc-left-travel'>i. please provide details*</p>
            <input type="text" className='input-full-name-acc-left-travel' placeholder='Type Text' />

            <p className='full-name-text-accc-left-travel'>5.Have you ever been to the UK or any other country?</p>
            <input type="text" className='input-full-name-acc-left-travel' placeholder='Type Text' />

            <p className='country-cnfrm-text-travel'>6.Have you ever entered the UK illegally?*</p>
            <div className='checkbox-travel'>
            <p className='yes-check-text-family'>Yes</p>
            <input type="checkbox" className='yes-check-family' />
            <p className='no-check-text-family'>No</p>
            <input type="checkbox" className='no-check-family' />

            </div>

            <p className='full-name-text-accc-left-travel'>i. Please provide details*</p>
            <input type="text" className='input-full-name-acc-left-travel' placeholder='Type Text' />

            <p className='country-cnfrm-text-travel'>7.Have you ever stayed beyond the expiry date of your visa in the UK?*</p>
            <div className='checkbox-travel'>
            <p className='yes-check-text-family'>Yes</p>
            <input type="checkbox" className='yes-check-family' />
            <p className='no-check-text-family'>No</p>
            <input type="checkbox" className='no-check-family' />

            </div>

            <p className='full-name-text-accc-left-travel'>i. Please provide details*</p>
            <input type="text" className='input-full-name-acc-left-travel' placeholder='Type Text' />

            
            <p className='country-cnfrm-text-travel'>8.Have you ever breached the conditions of your leave?*</p>
            <div className='checkbox-travel'>
            <p className='yes-check-text-family'>Yes</p>
            <input type="checkbox" className='yes-check-family' />
            <p className='no-check-text-family'>No</p>
            <input type="checkbox" className='no-check-family' />

            </div>


          </div>

          <div className='right-side-acc-travel'>

        
       <button className='Download-button-travel'>Download</button>
      

          <p className='full-name-text-acc-right-travel'>iii. Location Name*</p>
            <input type="text" className='input-full-name-acc-right-travel' placeholder='Type County' />

            <p className='country-cnfrm-text-travel'>1.Are you (Employed/Self-Employed)?*</p>
            <div className='checkbox-travel'>
            <p className='yes-check-text-family'>Yes</p>
            <input type="checkbox" className='yes-check-family' />
            <p className='no-check-text-family'>No</p>
            <input type="checkbox" className='no-check-family' />

            </div>
            

            <p className='full-name-text-acc-right-travel'>i. Please provide details*</p>
            <input type="text" className='input-full-name-acc-right-travel' placeholder='Type County' />


            <p className='country-cnfrm-text-travel'>1.Are you (Employed/Self-Employed)?*</p>
            <div className='checkbox-travel'>
            <p className='yes-check-text-family'>Yes</p>
            <input type="checkbox" className='yes-check-family' />
            <p className='no-check-text-family'>No</p>
            <input type="checkbox" className='no-check-family' />

            </div>
            

            <p className='full-name-text-acc-right-travel'>iv. Location Code</p>
            <input type="text" className='input-full-name-acc-right-travel' placeholder='Type County' />

            
            <p className='country-cnfrm-text-travel'>9. Have you ever worked without permission?*</p>
            <div className='checkbox-travel'>
            <p className='yes-check-text-family'>Yes</p>
            <input type="checkbox" className='yes-check-family' />
            <p className='no-check-text-family'>No</p>
            <input type="checkbox" className='no-check-family' />

            </div>
            

            <p className='full-name-text-acc-right-travel'>i. Please provide details*</p>
            <input type="text" className='input-full-name-acc-right-travel' placeholder='Type County' />


            
            <p className='country-cnfrm-text-travel'>10. Have you ever received public funds?*</p>
            <div className='checkbox-travel'>
            <p className='yes-check-text-family'>Yes</p>
            <input type="checkbox" className='yes-check-family' />
            <p className='no-check-text-family'>No</p>
            <input type="checkbox" className='no-check-family' />

            </div>
            

            <p className='full-name-text-acc-right-travel'>i. Please provide details*</p>
            <input type="text" className='input-full-name-acc-right-travel' placeholder='Type County' />


            
            <p className='country-cnfrm-text-travel'>11.Have you ever given false information when applying for a visa?*</p>
            <div className='checkbox-travel'>
            <p className='yes-check-text-family'>Yes</p>
            <input type="checkbox" className='yes-check-family' />
            <p className='no-check-text-family'>No</p>
            <input type="checkbox" className='no-check-family' />

            </div>
            

            <p className='full-name-text-acc-right-travel'>i. Please provide details*</p>
            <input type="text" className='input-full-name-acc-right-travel' placeholder='Type County' />


            
            <p className='country-cnfrm-text-travel'>12.Have you ever used deception in a previous visa application?*</p>
            <div className='checkbox-travel'>
            <p className='yes-check-text-family'>Yes</p>
            <input type="checkbox" className='yes-check-family' />
            <p className='no-check-text-family'>No</p>
            <input type="checkbox" className='no-check-family' />

            </div>
            

            <p className='full-name-text-acc-right-travel'>i. Please provide details*</p>
            <input type="text" className='input-full-name-acc-right-travel' placeholder='Type County' />


            
            <p className='country-cnfrm-text-travel'>13.Have you ever breached any other immigration laws?*</p>
            <div className='checkbox-travel'>
            <p className='yes-check-text-family'>Yes</p>
            <input type="checkbox" className='yes-check-family' />
            <p className='no-check-text-family'>No</p>
            <input type="checkbox" className='no-check-family' />

            </div>
            

            <p className='full-name-text-acc-right-travel'>i. Please provide details*</p>
            <input type="text" className='input-full-name-acc-right-travel' placeholder='Type County' />



            
            <p className='country-cnfrm-text-travel'>14.Have you ever been refused a visa or refused entry at the border?*</p>
            <div className='checkbox-travel'>
            <p className='yes-check-text-family'>Yes</p>
            <input type="checkbox" className='yes-check-family' />
            <p className='no-check-text-family'>No</p>
            <input type="checkbox" className='no-check-family' />

            </div>
            

            <p className='full-name-text-acc-right-travel'>i. Please provide details*</p>
            <input type="text" className='input-full-name-acc-right-travel' placeholder='Type County' />



            
            <p className='country-cnfrm-text-travel'>15.Have you been refused permission to stay or remain ?*</p>
            <div className='checkbox-travel'>
            <p className='yes-check-text-family'>Yes</p>
            <input type="checkbox" className='yes-check-family' />
            <p className='no-check-text-family'>No</p>
            <input type="checkbox" className='no-check-family' />

            </div>
            

            <p className='full-name-text-acc-right-travel'>i. Please provide details*</p>
            <input type="text" className='input-full-name-acc-right-travel' placeholder='Type County' />



            
            <p className='country-cnfrm-text-travel'>16.Have you ever been refused asylum?*</p>
            <div className='checkbox-travel'>
            <p className='yes-check-text-family'>Yes</p>
            <input type="checkbox" className='yes-check-family' />
            <p className='no-check-text-family'>No</p>
            <input type="checkbox" className='no-check-family' />

            </div>
            

            <p className='full-name-text-acc-right-travel'>i. Please provide details*</p>
            <input type="text" className='input-full-name-acc-right-travel' placeholder='Type County' />

            <p className='country-cnfrm-text-travel'>17.Have you ever been deported, removed or been required to leave 
      any country?*</p>
            <div className='checkbox-travel'>
            <p className='yes-check-text-family'>Yes</p>
            <input type="checkbox" className='yes-check-family' />
            <p className='no-check-text-family'>No</p>
            <input type="checkbox" className='no-check-family' />

            </div>
            

            <p className='full-name-text-acc-right-travel'>i. Please provide details*</p>
            <input type="text" className='input-full-name-acc-right-travel' placeholder='Type County' />


            <p className='country-cnfrm-text-travel'>18.Have you been excluded or banned from any country?*</p>
            <div className='checkbox-travel'>
            <p className='yes-check-text-family'>Yes</p>
            <input type="checkbox" className='yes-check-family' />
            <p className='no-check-text-family'>No</p>
            <input type="checkbox" className='no-check-family' />

            </div>
            

            <p className='full-name-text-acc-right-travel'>i. Please provide details*</p>
            <input type="text" className='input-full-name-acc-right-travel' placeholder='Type County' />

                      
            <div className="All-button-containers">
            <Link to="/maintenance">
                 <button className='Back-butnnn'>Back</button>
                 </Link>
                 <Link to="">
                <button className='Save-btnn'>Save</button>
                </Link>
                <Link to="/character">
                <button className='Next-btnnnn'>Next</button>  
                </Link>     
                 </div>  
        
          </div>
        </form>
   
    </div>
</div>
  )
}

export default Travel