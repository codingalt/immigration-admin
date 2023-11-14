import React, { useState } from 'react';
import SideNavbar from './SideNavbar'
import "../style/Invoice.css"
import banner from "../assests/billing-banner-img.png"
const Invoice = () => {

    const [client, setClient] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [nationality, setNationality] = useState('');

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

    <div className='invoice-main-container'>
    <SideNavbar/>
    <h1 className='invoice-heading'>Create Invoice</h1>
    <div className='Banner'>
    <img src={banner} alt="" className='billing-banner-img-2' />
  </div>
    <div className='Invoice-main'>
    <div className='Invoice-form'>
       <p className='Invoice-sub-heading'>Invoice</p>
    <form>
        <div className= 'Client-input-1'>
        <p className="client-label-1">Name</p>
          <input className='jhon-input-1'
            type="text"
            placeholder="Enter Name"
            value={client}
            onChange={handleClientChange}
          />
        </div>
        <div className='email-input-1'>
        <p className="email-label-1">Email</p>
          <input className='email-3'
            type="email"
            placeholder="email@email.com"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className='Phone-number-1'>
        <p className="contact-label-1">Contact</p>
          <input className='contact-1'
            type="tel"
            placeholder="(485)-845-8542658"
            value={contact}
            onChange={handleContactChange}
          />
        </div>
   
        <div className='Address-1'>
        <p className="address-label-1">Cost</p>
          <input className='Adress-3'
            type="text"
            placeholder="450 $"
            value={address}
            onChange={handleAddressChange}
          />
        </div>
        <div className='nationalty-input-1'>
        <p className="nationality-label-1">Address</p>
          <input className='nationalty-3'
            type="text"
            placeholder="Enter Address"
            value={nationality}
            onChange={handleNationalityChange}
          />
        </div>
      </form>

    
        <div className='invoice-form-2'>

        <p className='Invoice-sub-heading-2'>Invoice Details</p>
        <form>
        <div className='Date-input-1'>
        <p className="dob-label-1">Valid From</p>
        <input className='calender-3'
            type="date"
            placeholder=""
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
          />
        </div>
        <div className='Date-input-1'>
        <p className="dob-label-2">Valid Until</p>
        <input className='calender-3'
            type="date"
            placeholder=""
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
          />
        </div>
        </form>
        </div>
    
      </div>
    </div>
 
          <div className='button-container-invoice'>
      <button className='Create-invoice-button'>Create Invoice</button>
      <button className='cancel-button'>Cancel</button>
      </div>
    </div>

  )
}

export default Invoice