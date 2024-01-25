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
        <div class="Pre-screening-texts"><h2>Pre-Screening</h2>
          <div class="four-routes-image">
              <a class="" href="/add/phase1" style={{ paddingRight: 10, paddingLeft: 10}} >
                <div class="add-to-q-img">
                  <img src="/assets/Add-application-icon-c6d10e1d.svg" alt="" class="add-to-queue"/>
                  <p class="add-app-text">Add Application</p>
                </div>
              </a>
              <a class="" href="/report/view" style={{ paddingRight: 10, paddingLeft: 10}}>
                <div class="books-img"> 
                  <img src="/assets/view-report-icon-b9b82219.svg" alt="" class="books"/>
                  <p class="add-report-text">View Report</p>
                </div>
              </a>
              <a class="" href="/admin/linkcompany/view" style={{ paddingRight: 10, paddingLeft: 10}}>
                <div class="link-img">
                  <img src="/assets/Link-company-icon-6fba65b0.svg" alt="" class="link-company"/>
                  <p class="add-company-text">Link Company</p>
                </div>
              </a>
            </div>
          </div>
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