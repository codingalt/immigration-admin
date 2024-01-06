import React, { useState } from 'react';
import "../style/Clientform.css"
import Formimg from "../assests/form-sideimg.png"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { format } from 'date-fns';

const ClientForm = () => {
    const { searchParams,user } = useSelector((state) => state.user);
    console.log("Search Params",searchParams);
    console.log("user",user);

  return (
    <div className="from-container">
      <div className="Form-main">
        <form>
          <div className="Client-input">
            <p className="client-label">Client Name</p>
            <input
              disabled
              className="jhon-input"
              type="text"
              placeholder={user?.name}
              value={user?.name}
            />
          </div>
          <div className="email-input">
            <p className="email-label">Email</p>
            <input
              disabled
              className="email-2"
              type="email"
              placeholder={user?.email}
              value={user?.email}
            />
          </div>
          <div className="Phone-number">
            <p className="contact-label">Contact</p>
            <input
              disabled
              className="contact"
              type="tel"
              placeholder={user?.contact}
              value={user?.contact}
            />
          </div>
          {/* <div className="Date-input">
            <p className="dob-label">Date of Birth</p>
            <input
              disabled
              className="calender-2"
              type="date"
              placeholder="Select Date"
              value={
                searchParams
                  ? format(
                      new Date(searchParams?.phase1?.birthDate),
                      "yyyy-MM-dd"
                    )
                  : ""
              }
            />
          </div>
          <div className="Address">
            <p className="address-label">Case ID</p>
            <input
              disabled
              className="Adress-2"
              type="text"
              placeholder="Type Address"
              value={searchParams?.caseId}
            />
          </div> */}
          <div className="nationalty-input">
            <p className="nationality-label">Country</p>
            <input
              disabled
              className="nationalty-2"
              type="text"
              placeholder="Country"
              value={
                searchParams?.phase1?.country
                  ? searchParams?.phase1?.country
                  : searchParams?.phase1?.nationality
              }
            />
          </div>
        </form>
      </div>
      <div className="SIdeform-img-main">
        <img src={Formimg} alt="" className="Sideform-img-33" />
      </div>
      {searchParams ? (
        <Link
          to={
            searchParams?.companyId
              ? `/admin/group/prescreening/${searchParams?._id}`
              : `/admin/prescreening/${searchParams?._id}`
          }
        >
          <p className="View-more-text">View More</p>
        </Link>
      ) : (
        <Link to={"#"}>
          <p className="View-more-text">View More</p>
        </Link>
      )}
    </div>
  );
};

export default ClientForm;
