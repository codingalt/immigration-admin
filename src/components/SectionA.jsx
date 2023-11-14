import React from 'react'
import "../style/SectionA.css"
import { NavLink } from 'react-router-dom'; // Import Link from react-router-dom
import calenderimg from '../assests/big-calender-pic.svg';
import Messagepic from "../assests/big-message-img.svg"
import prescreeningimg from "../assests/pre-screening-img.svg"
import Notesimg from "../assests/Reserve-img.png"
import Profileimg from '../assests/profile-img.svg';

const SectionA = () => {
  return (
    <div className="SectionA-container">
      <div className="calender">
        <NavLink to="/calender">
          <img src={calenderimg} alt="" className="calender-img" />
        </NavLink>
        <p className="calender-text">Calendar</p>
      </div>
      <div className="Message">
        <NavLink to="/admin/message">
          <img src={Messagepic} alt="" className="Message-img" />
        </NavLink>
        <p className="Message-text">Message</p>
      </div>
      <div className="Pre-screning">
        <NavLink to="/admin/prescreening/view">
          <img src={prescreeningimg} alt="" className="Prescrening-img" />
        </NavLink>
        <p className="pre-screening-text">Pre-Screening</p>
      </div>
      <div className="Notes">
        <NavLink to="/admin/notes">
          <img src={Notesimg} alt="" className="notes-img" />
          <p className="Notes-text-2">Notes</p>
        </NavLink>
      </div>

      <div className="Profile">
        <NavLink to="/admin/clientprofiles">
          <img src={Profileimg} alt="" className="profile-img" />
        </NavLink>
        <p className="profile-text">Profiles</p>
      </div>
    </div>
  );
}

export default SectionA