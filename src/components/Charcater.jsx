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

const Charcater = () => {
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

                                <p className='genral-text-left-side'>1.Have you ever been charged with a criminal offence ?*</p>

                                <div className='checkbox-phase1'>
                                    <p className='yes-check-text'>Yes</p>
                                    <input type="checkbox" className='yes-check' />
                                    <p className='no-check-text'>No</p>
                                    <input type="checkbox" className='no-check' />
                                </div>


                                <p className='genral-text-left-side'>i. Please provide details*</p>
                                <input type="text" className='genral-input-left-side' placeholder='Type Text' />

                                <p className='genral-text-left-side'>2.Do you have any pending prosecutions ?*</p>

                                <div className='checkbox-phase1'>
                                    <p className='yes-check-text'>Yes</p>
                                    <input type="checkbox" className='yes-check' />
                                    <p className='no-check-text'>No</p>
                                    <input type="checkbox" className='no-check' />
                                </div>


                                <p className='genral-text-left-side'>i. Please provide details*</p>
                                <input type="text" className='genral-input-left-side' placeholder='Type Text' />


                                <p className='genral-text-left-side'>3.Have you ever had any terrorist views or charged with or been 
      questioned in relation to terrorist charges?*</p>

                                <div className='checkbox-phase1'>
                                    <p className='yes-check-text'>Yes</p>
                                    <input type="checkbox" className='yes-check' />
                                    <p className='no-check-text'>No</p>
                                    <input type="checkbox" className='no-check' />
                                </div>

                                <p className='genral-text-left-side'>i. Please provide details*</p>
                                <input type="text" className='genral-input-left-side' placeholder='Type Text' />




                                <p className='genral-text-left-side'>4.Have you ever worked for the (Judiciary/Security Services/Media/
      Intelligence Agencies/Armed Forces) of any country?*</p>

                                <div className='checkbox-phase1'>
                                    <p className='yes-check-text'>Yes</p>
                                    <input type="checkbox" className='yes-check' />
                                    <p className='no-check-text'>No</p>
                                    <input type="checkbox" className='no-check' />
                                </div>

                                <p className='genral-text-left-side'>i. Please provide details*</p>
                                <input type="text" className='genral-input-left-side' placeholder='Type Text' />

                                <NavLink to="/travel">
                                    <button type="button" className="back-button-new" onClick={handleBackClick}>
                                        Back
                                    </button>
                                </NavLink>
                                <NavLink to="/finaldataphase4">
                                    <button type="button" className="Next-button" onClick={handleNextClick}>
                                        Submit
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
export default Charcater