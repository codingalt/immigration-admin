import React from 'react'
import side from "../assests/side-img-.png"
// import googlepic from "../assests/google-pic.svg"
// import robort from "../assests/recaptcha-img.svg"
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import logo from "../assests/normal-removebg-preview 1.png"
import "../style/ottp.css"
import OTPGenerator from './OtpInput'

const Ottp = () => {

  const navigate = useNavigate(); // Create a navigate function using useNavigate

  const handleSignInNavigation = () => {
    navigate('/Dashboard'); // Navigate to the sign-in page when the button is clicked
  };

  return (
    <div className="container-3">
    <div className="min-3">
      <div className="logo-3">
        <img src={logo} alt="" />
      </div>
      <p className="welcome-text-3">
      OTP Verification
      </p>
      <div className="sub-container-3">
        <div className="login-form-3">
        
           <p className="forget-password-3">Check <span className='email'>Email </span>- Click on link to verify</p>
          <p className="question-3">Check <span className='Phone'> Mobile phone </span>- Enter 6 digit OTP</p>
          {/* <p className="sgn-up-heading-2">SIGN UP</p>  */}


          <OTPGenerator/>

          <p className='otp-not-recevied'>OTP Not Received? <span className='resend'>Resend</span></p>
 
          <button type="submit" className='ottp-button' onClick={handleSignInNavigation}>Submit</button>
           
 
        </div>
        <div className="side-img-4">
          <img src={side} className="side-img-5" alt=''/>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Ottp