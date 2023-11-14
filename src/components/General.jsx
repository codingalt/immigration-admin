import React from 'react'
import { Link } from 'react-router-dom';
import editpen from "../assests/edit-pen.png"
import SideNavbar from './SideNavbar'
import "../style/Genral.css"

const General = () => {
  return (
    <div className='Phase-2-main-container'>
      <SideNavbar />
      <h2 className='Pre-screening-text'>Pre-Screening</h2>
      <img src={editpen} alt="" className='edit-pen' />
      <Link to="/prescreening">
            <button className='back-btn'>Back</button>
</Link>
      <Link to="/general">
        <p className='Phase-1-heading'>General</p>
    </Link>
    <Link to="/accommodation">
        <p className='Pre-phase-2-heading'>Accommodation</p>
    </Link>
      <Link to="/family">
        <p className='Phase-2-heading'>Family</p>
      </Link>


      <Link to="/prephase3" >
            <p className='Prephase-3-heading' >Pre-Phase 3</p>
            </Link>

            <Link to="/phase3">

            <p className='Phase3-heading'>Phase 3</p>
            </Link>

            <Link to="/phase4">
          <p className='Phase-4-heading'>Phase 4</p>
            </Link>

            <div className='Genral-' ></div>
            </div>
  )
}

export default General