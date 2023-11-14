import React from 'react'
import { Link } from 'react-router-dom';
import editpen from "../assests/edit-pen.png"
import SideNavbar from './SideNavbar'
import "../style/Memberships.css"

const Membership = () => {
  return (
    <div className='Phase-2-main-container'>
    <SideNavbar />
    <h2 className='Pre-screening-text'>Pre-Screening</h2>
    <img src={editpen} alt="" className='edit-pen' />
    <Link to="/phase1">
            <button className='back-btn'>Back</button>
</Link>

 
    <Link to="/phase4">
        <p className='General-heading'>General</p>
      </Link>
      <Link to="/accommodation">
        <p className='Accommodation-heading'>Accommodation</p>
      </Link>
      <Link to="/family">
        <p className='Family-heading'>Family</p>
      </Link>

      <Link to="/languageproficiency">
      <p className='Language-profeciency-heading'>Language proficiency </p>
</Link>

      <Link to="/education" >
        <p className='Education-heading' >Education</p>
      </Link>


      <Link to="/employment">

        <p className='Employment-heading'>Employment</p>
      </Link>


     <Link to="/membership" >
      <p className='Membership-heading'>Membership</p>
      </Link>

      
      <Link to="/maintenance">
     <p className='Maintenance-heading'>Maintenance</p>
</Link>

<Link to="/travel">
<p className='travel-heading'>Travel</p>
</Link>

<Link to="/character">
<p className='Character-heading'>Character</p>
</Link>


      <div className='Membership-main '>
        <form action="">
          <div className='left-side-general-family'>

            <p className='full-name-text-accc-left-mem'>1.Membership Type*</p>
            <input type="text" className='input-full-name-acc-left-mem' placeholder='Type Address' />

            <p className='full-name-text-accc-left-mem'>2.Membership Name*</p>
            <input type="text" className='input-full-name-acc-left-mem' placeholder='Type Address' />


    
            <p className='full-name-text-accc-left-mem'>3.Issued Date*</p>
            <input type="date" className='input-full-name-acc-left-mem' name="" id="" />

            <p className='full-name-text-accc-left-mem'>4.Expiry Date*</p>
            <input type="date" className='input-full-name-acc-left-mem' name="" id="" />




          </div>

          <div className='right-side-lgpro'>
       <button className='Download-button-membership'>Download</button>
       </div>
       
        </form>
      </div>
</div>
  )
}

export default Membership