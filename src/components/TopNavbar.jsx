import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons'; // Import the calendar icon from Font Awesome
import '../style/Topnavbar.css';
import Search from '../assests/search-icon.svg';
import { Link, NavLink, useNavigate,useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchParams } from '../services/redux/userSlice';

const TopNavbar = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const datePickerRef = useRef();
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [caseId, setCaseId] = useState();
  const [country, setCountry] = useState();
  const [birthDate, setBirthDate] = useState();
  const handleSearchClick = () => {
  const searchParams = new URLSearchParams();
   name && searchParams.set("name", name);
   caseId && searchParams.set("caseId", caseId);
   birthDate && searchParams.set("birthDate", new Date(birthDate));
   country && searchParams.set("country", country);
    navigate(`/admin/search?${searchParams.toString()}`);
  };

  const handleCalendarClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick()
    }
  };

  return (
    <div className="TopNavbar-main-conatiner">
      <div className="topnavbar-container">
        <div className="detail">
          <input
            type="text"
            placeholder="Case Id"
            className="Case-id"
            value={caseId}
            onKeyDown={handleKeyDown}
            onChange={(e) => setCaseId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by Name"
            className="Search-by-name"
            value={name}
            onKeyDown={handleKeyDown}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by Nationality "
            className="search-by-nationality"
            value={country}
            onKeyDown={handleKeyDown}
            onChange={(e) => setCountry(e.target.value)}
          />

          {/* Date Picker */}
          <div className="dob">
            <span className="dob-text">DOB </span>
            {/* <input
              type="date"
              className="Date-selctor"
              placeholderText="Select a date"
              onKeyDown={handleKeyDown}
              onChange={(e) => setBirthDate(e.target.value)}
            /> */}
            <DatePicker
              selected={birthDate}
              onChange={(date) => setBirthDate(date)}
              placeholderText="Select a date" // Add the placeholder here
              className="Date-selctor"
              onKeyDown={handleKeyDown}
              ref={datePickerRef}
              value={birthDate}
              popperModifiers={{
                preventOverflow: {
                  enabled: true,
                  escapeWithReference: false,
                  boundariesElement: "viewport",
                },
              }}
            />

            {/* Calendar SVG Icon from Font Awesome */}
            <span className="calendar-icon" onClick={handleCalendarClick}>
              <FontAwesomeIcon icon={faCalendar} />
            </span>
          </div>
          <div
            className="search"
            style={{ cursor: "pointer" }}
            onClick={handleSearchClick}
          >
            <img
              src={Search}
              alt="Search Icon"
              className="search-icon"
              onClick={handleSearchClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;



