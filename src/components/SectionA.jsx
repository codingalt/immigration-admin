import React from 'react'
import "../style/SectionA.css"
import { NavLink, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import calenderimg from "../assests/calendar.png";
import Messagepic from "../assests/MessageDashboard.png";
import prescreeningimg from "../assests/Prescreening.png";
import Notesimg from "../assests/Reserve-img.png"
import Profileimg from "../assests/profiledashb.png";
import { TbMessage } from "react-icons/tb";
import { RxCalendar } from "react-icons/rx";
import { FiClipboard } from "react-icons/fi";
import { LuClipboardSignature } from "react-icons/lu";
import { CgUserList } from "react-icons/cg";
import { PiUserListBold } from "react-icons/pi";
import { LuClipboardEdit } from "react-icons/lu";

const SectionA = () => {
  const navigate = useNavigate();
  return (
    <div className="SectionA-container">
      {/* <NavLink to="/calender"> */}
      <div className="calender" onClick={() => navigate("/calender")}>
        <RxCalendar style={{ fontSize: "4.7rem", color: "#5D982E" }} />
        {/* <img src={calenderimg} alt="" className="calender-img" /> */}
        <p className="calender-text">Calendar</p>
      </div>
      {/* </NavLink> */}
      <div className="Message" onClick={() => navigate("/admin/message")}>
        {/* <img src={Messagepic} alt="" className="Message-img" /> */}
        <TbMessage
          className="Message-img"
          style={{ fontSize: "4.7rem", color: "#5D982E" }}
        />
        <p className="Message-text">Message</p>
      </div>
      <div
        className="Pre-screning"
        onClick={() => navigate("/admin/prescreening/view")}
      >
        <FiClipboard style={{ fontSize: "4.7rem", color: "#5D982E" }} />
        {/* <img src={prescreeningimg} alt="" className="Prescrening-img" /> */}
        <p className="pre-screening-text">Pre-Screening</p>
      </div>
      <div className="Notes" onClick={() => navigate("/admin/notes")}>
        <LuClipboardEdit style={{ fontSize: "4.7rem", color: "#5D982E" }} />
        {/* <img src={Notesimg} alt="" className="notes-img" /> */}
        <p className="Notes-text-2">Notes</p>
      </div>

      <div
        className="Profile"
        onClick={() => navigate("/admin/clientprofiles")}
      >
        <PiUserListBold style={{ fontSize: "4.7rem", color: "#5D982E" }} />
        {/* <img src={Profileimg} alt="" className="profile-img" /> */}
        <p className="profile-text">Profiles</p>
      </div>
    </div>
  );
}

export default SectionA