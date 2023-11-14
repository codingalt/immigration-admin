import React, { useState } from 'react';
import "../style/Clientform.css"
import Formimg from "../assests/form-sideimg.png"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { format } from 'date-fns';

const ClientForm = () => {
  const [client, setClient] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [nationality, setNationality] = useState('');

    const { searchParams } = useSelector((state) => state.user);
    console.log("Search Params",searchParams);

  const handleClientChange = (e) => {
    setClient(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
  };

  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleNationalityChange = (e) => {
    setNationality(e.target.value);
  };

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
              placeholder="John Leo"
              value={searchParams?.phase1.name}
            />
          </div>
          <div className="email-input">
            <p className="email-label">Email</p>
            <input
              disabled
              className="email-2"
              type="email"
              placeholder="email@email.com"
              value={searchParams?.phase1.email}
            />
          </div>
          <div className="Phone-number">
            <p className="contact-label">Contact</p>
            <input
              disabled
              className="contact"
              type="tel"
              placeholder="(485)-845-8542658"
              value={searchParams?.phase1.contact}
            />
          </div>
          <div className="Date-input">
            <p className="dob-label">Date of Birth</p>
            <input
              disabled
              className="calender-2"
              type="date"
              placeholder="Select Date"
              value={searchParams ? format(
                new Date(searchParams?.phase1?.birthDate),
                "yyyy-MM-dd"
              ) : ""}
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
          </div>
          <div className="nationalty-input">
            <p className="nationality-label">Country</p>
            <input
              disabled
              className="nationalty-2"
              type="text"
              placeholder="Search Country"
              value={searchParams?.phase1.country}
            />
          </div>
        </form>
      </div>
      <div className="SIdeform-img-main">
        <img src={Formimg} alt="" className="Sideform-img-33" />
      </div>
      {searchParams ? (
        <Link to={`/admin/prescreening/${searchParams?._id}`}>
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
