import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import "../style/Sidenavbar.css";
import Logo from "../assests/normal-removebg-preview 1.png"
import Dp from "../assests/dp-img.png"
import NotificationIcon from "../assests/notification-icon.svg"
import Message from "../assests/message-icon.svg"
import Calender from "../assests/Celender-icon.svg"
import Billing from "../assests/Billing-icon.svg"
import caseworker from "../assests/Case Worker Profile.png"
import setting from "../assests/setting-icon.png"
import Home from "../assests/Home-icon.png"
import logoutImg from "../assests/Log-out-icon.png"
import { useLogoutMutation } from '../services/api/userApi';
import { useMemo } from 'react';
import { toastError } from './Toast';
import { useSelector } from 'react-redux';
import { useGetNotificationCountAdminQuery } from '../services/api/applicationApi';

const SideNavbar = ({ getData }) => {
  const [logout, result] = useLogoutMutation();
  const { error, isSuccess } = result;
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { name, profilePic } = user ? user : "";

  const { data, refetch: refetchCount } =
    useGetNotificationCountAdminQuery();
    console.log("count",data);
  useMemo(() => {
    if (error) {
      toastError(error?.data?.message);
    }
  }, [error]);

  useMemo(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  useMemo(() => {
    if (getData) {
      console.log("Side nav get data");
      refetchCount();
    }
  }, [getData]);

  const handleLogout = async () => {
    await logout();
  };
  return (
    <div className="sidenavbar-Container">
      <div className="profile-logo">
        <img src={Logo} alt="" className="Logo" />

        <img
          style={{
            width: "42px",
            borderRadius: "9px",
            height: "42px",
            objectFit: "cover",
          }}
          src={profilePic ? `${import.meta.env.VITE_IMG_URI}${profilePic}` : Dp}
          alt=""
          className="dp-img"
        />
      </div>

      <div className="Icons">
        <Link to="/admin/dashboard">
          <img src={Home} alt="" className="Home-icon" />
        </Link>

        <Link to="/admin/notification">
          <img src={NotificationIcon} alt="" className="Notification-icon" />
          {
            data?.count > 0 ? 
              <div className="icon-badge">
            <span>{data?.count}</span>
          </div> : null
          }        
        </Link>

        <Link to="/admin/message">
          <img src={Message} alt="" className="Message-icon" />
        </Link>

        <Link to="/calender">
          <img src={Calender} alt="" className="Calender-icon" />
        </Link>

        <Link to="/admin/caseworker">
          <img src={caseworker} alt="" className="Caseworker-icon" />
        </Link>
        <Link to="/admin/billing">
          <img src={Billing} alt="" className="billing-icon" />
        </Link>

        <Link to="/admin/profile">
          <img src={setting} alt="" className="Setting-icon" />
        </Link>

        <Link to="#" onClick={handleLogout}>
          <img src={logoutImg} alt="" className="Logout-icon" />
        </Link>
      </div>
    </div>
  );
};

export default SideNavbar;





