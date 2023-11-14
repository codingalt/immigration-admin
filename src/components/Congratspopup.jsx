import React from 'react'
import congrats from "../assests/congrats-tick.svg"
import "../style/Rejectpopup copy.css";
import Addingprofile from "./Addingprofile"
import { useNavigate } from "react-router-dom"; 

const Congratspopup = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleOverlayClick = () => {
      // Close the popup and navigate to a defined route
      navigate("/companyprofile"); // Replace "/your-defined-route" with your desired route
  };

    return (
        <div>
      
        <Addingprofile/>
 
        <div className="overlay" onClick={handleOverlayClick}>
          <div className="popoup">
              <img src={congrats} alt="" className="cross-img" />
              <p className="Confermation-text-2">
              Congratulations!
              </p>
              <p className="form-submited-text">Profile Created Sccessfully</p>
            </div>
          </div>
       
        </div>
      );
    };

export default Congratspopup