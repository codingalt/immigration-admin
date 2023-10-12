import React, { useEffect, useState, useRef } from 'react';
import Logo2 from '../Assets/Ukimmigration-logo.png';
import bellicon2 from "../Assets/bell-icon-svg.svg"
import profileimg from "../Assets/profile-img-svg.svg"
import dropdownicon from "../Assets/dropdown-icon-svg.svg"
import { NavLink } from 'react-router-dom';
import NotificationBox from './Notification';
import SettingBox from "./Settingbox"
import "../style/Phase4.css"
import "../style/Accomodation.css"

const Employement = () => {
    const [isNotificationBoxVisible, setIsNotificationBoxVisible] = useState(false);
    const [isSettingsBoxVisible, setIsSettingsBoxVisible] = useState(false);
    const notificationRef = useRef(null);
    const settingsRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target) &&
                settingsRef.current &&
                !settingsRef.current.contains(event.target)
            ) {
                setIsNotificationBoxVisible(false);
                setIsSettingsBoxVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleNotificationBox = () => {
        setIsNotificationBoxVisible(!isNotificationBoxVisible);
    };

    const toggleSettingsBox = () => {
        setIsSettingsBoxVisible(!isSettingsBoxVisible);
    };

    const handleSubmitClick = () => {
        // Handle form submission
    };


   

    const handleBackClick = () => {
        // Handle going back to the previous step or route
    };

    const handleNextClick = () => {
        // Handle going to the next step or route
    };

    const links = [
        { to: "/phase4", label: "General" },
        { to: "/Acomodation", label: "Accommodation" },
        { to: "/family", label: "Family" },
        { to: "/languageprofeciency", label: "Language Proficiency" },
        { to: "/education", label: "Education" },
        { to: "/employement", label: "Employement" },
        { to: "/Mainteance", label: "Mainteance" },
        { to: "/travel", label: "travel" },
        { to: "/character", label: "Character" },
        // Add more links as needed
    ];
    
    const [activeLink, setActiveLink] = useState(null);
    
    useEffect(() => {
        // Get the current path from window.location.pathname
        const currentPath = window.location.pathname;
    
        // Find the matching label from the links array based on the current path
        const matchedLink = links.find((link) => link.to === currentPath);
    
        if (matchedLink) {
            setActiveLink(matchedLink.label);
        }
    }, [links]);
    
    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
    };
    

    return (
        <div className="Container-forgetpassword-phase1">

            <div className='Header-topbar'>
                <div className='left-side-header' >
                    <img src={Logo2} alt="" />
                </div>
                <div className='right-side-header'>
                    <img
                        src={bellicon2}
                        alt=""
                        className='bell-icon-notification'
                        onClick={toggleNotificationBox}
                    />
                    <img src={profileimg} alt="" className='profile-img' />
                    <p className='Jhon-profile-text'>John Leo</p>
                    <p className='Admin-text'>Admin</p>
                    <div ref={settingsRef}>
                        <img
                            src={dropdownicon}
                            alt=""
                            className='dropdown'
                            onClick={toggleSettingsBox}
                        />
                    </div>
                </div>

                {/* Render NotificationBox conditionally */}
                {isNotificationBoxVisible && (
                    <div ref={notificationRef}>
                        <NotificationBox />
                    </div>
                )}
                {isSettingsBoxVisible &&

                    <SettingBox />

                }
            </div>
            <div className="Forgetpassword-sub-2">


                <div className="left-side-forget-password-2">
                    <p className='Required-data-text'>Required Data*</p>
                    <NavLink to="/filldata">
                    <button type="submit" className="back-button">back</button>
                    </NavLink>


       
                    <div className='phase-4-all-phase'>
        {links.map((link, index) => (
            <NavLink
                key={index}
                to={link.to}
                className={`link-hover-effect ${activeLink === link.label ? 'link-active' : ''}`}
                onClick={() => handleLinkClick(link.label)}
            >
                <span>{link.label}</span>
            </NavLink>
        ))}
    </div>


                    <div className='Main-form'>
                        <div className='left-side-phase'>
                            <form action="">

                                <p className='genral-text-left-side'>1.Are you (Employed/Self-Employed)?*</p>

                                <div className='checkbox-phase1'>
                                    <p className='yes-check-text'>Yes</p>
                                    <input type="checkbox" className='yes-check' />
                                    <p className='no-check-text'>No</p>
                                    <input type="checkbox" className='no-check' />
                                </div>

                                <p className='genral-text-left-side'>i. When did you start your job ?*</p>
                                <input type="date" className='genral-input-left-side' name="" id="" />


                                <p className='genral-text-left-side'>ii. What is the name of your employer ?*</p>
                                <input type="text" className='genral-input-left-side' placeholder='Type Address' />

                                <p className='genral-text-left-side'>iii. Telephone number of your employer*</p>
                                <input type="text" className='genral-input-left-side' placeholder='Name of Spouse*' />



                                <p className='genral-text-left-side'>iv. Email address of your employer*</p>
                                <input type="text" className='genral-input-left-side' placeholder='Type' />


                                <p className='genral-text-left-side'>v. What is your annual salary*</p>
                                <input type="text" className='genral-input-left-side' placeholder='Type Number' />



                                <p className='genral-text-left-side'>vi. What is your job title?*</p>
                                <input type="text" className='genral-input-left-side' placeholder='' />

                                <p className='provide-employe-address'>Please provide your employer's address</p>


                                <p className='genral-text-left-side'>i. Address 1*</p>
                                <input type="text" className='genral-input-left-side' placeholder='Type Text' />

                                <p className='genral-text-left-side'>ii. Address 2*</p>
                                <input type="text" className='genral-input-left-side' placeholder='Type Text' />

                                
                          
                            </form>
                        </div>


                        <div className='right-side-phase'>
                            <form action="">
                                <p className='genral-text-left-side'>iii. Location Name*</p>
                                <input type="text" className='genral-input-left-side' placeholder='Type County' />

                                <p className='genral-text-left-side'>iv. Location Code</p>
                                <input type="text" className='genral-input-left-side' placeholder='Type County' />

                                <p className='genral-text-left-side'>v. Town*</p>
                                <select class="form-select" placeholder='Select' className='genral-input-left-side-selector'  >
                                    <p className='select-country-11' >16.Select Country*</p>
                                    <option>Select</option>
                                    <option value="AF">Male</option>
                                    <option value="AX">female</option>
                                    <option value="AL">gay</option>
                                    <option value="DZ">others</option>


                                </select>

                                <p className='genral-text-left-side'>vi. County*</p>
                                <input type="text" className='genral-input-left-side' placeholder='Type County' />

                                <p className='genral-text-left-side'>vii. Post Code*</p>
                                <input type="text" className='genral-input-left-side' placeholder='Type County' />

                                <p className='genral-text-left-side'>viii. Country Prefix*</p>
                                <input type="text" className='genral-input-left-side' placeholder='Type County' />

                                <p className='genral-text-left-side'>ix. Country*</p>
                                <select class="form-select" placeholder='Select' className='genral-input-left-side-selector'  >
                                    <p className='select-country-11' >16.Select Country*</p>
                                    <option>Select</option>
                                    <option value="AF">Male</option>
                                    <option value="AX">female</option>
                                    <option value="AL">gay</option>
                                    <option value="DZ">others</option>


                                </select>

                                <p className='genral-text-left-side'>x. Select country*</p>
                                <select class="form-select" placeholder='Select' className='genral-input-left-side-selector'  >
                                    <p className='select-country-11' >16.Select Country*</p>
                                    <option>Select</option>
                                    <option value="AF">Male</option>
                                    <option value="AX">female</option>
                                    <option value="AL">gay</option>
                                    <option value="DZ">others</option>


                                </select>

                                <p className='genral-text-left-side'>xi. FAX</p>
                                <input type="text" className='genral-input-left-side' placeholder='Type County' />

                                <p className='genral-text-left-side'>xii. VAT Rate</p>
                                <input type="text" className='genral-input-left-side' placeholder='Type County' />
                                  
                                <NavLink to="/education">
                                <button type="button" className="back-button-accomodation" onClick={handleBackClick}>
                                        Back
                                    </button>
                                </NavLink>
                                <NavLink to="/Mainteance">
                                <button type="button" className="Next-button-acomodation" onClick={handleNextClick}>
                                        Next
                                    </button>
                                </NavLink>

                            </form>

                        </div>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default Employement