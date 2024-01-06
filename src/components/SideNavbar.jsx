import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import "../style/Sidenavbar.css";
import Logo from "../assests/normal-removebg-preview 1.png"
import Dp from "../assests/dp-img.png"
import logoutImg from "../assests/Log-out-icon.png"
import { useLogoutMutation } from '../services/api/userApi';
import { useMemo } from 'react';
import { toastError } from './Toast';
import { useSelector } from 'react-redux';
import { useGetNotificationCountAdminQuery } from '../services/api/applicationApi';
import MainContext from "./Context/MainContext";
import { useChatNotificationsMutation, useGetAllChatsQuery } from '../services/api/chatApi';
import { useState } from 'react';
import { IoNotificationsOutline } from "react-icons/io5";
import { TbMessage } from "react-icons/tb";
import { MdOutlineHome } from "react-icons/md";
import { FiCalendar } from "react-icons/fi";
import { LuUserCog2 } from "react-icons/lu";
import { HiOutlineClipboardList } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";

const SideNavbar = () => {
  const { socket } = useContext(MainContext);
  const [chatNotifications, resp] = useChatNotificationsMutation();
  const {data: respCount} = resp;
  const [logout, result] = useLogoutMutation();
  const { error, isSuccess } = result;
  const navigate = useNavigate();
  const { user,count,isRead } = useSelector((state) => state.user);
  const [unread,setUnread] = useState();
  const [receiveNoti, setReceiveNoti] = useState();
  const [getCount, setGetCount] = useState();

  const {
    data,
    refetch: refetchChats,
    isLoading: isLoadingChats,
  } = useGetAllChatsQuery(null,{refetchOnMountOrArgChange: true});

  useEffect(() => {
    if (data) {
      let countVal = 0;
      data?.chats?.map((item) => {
        if (item.unseen > 0) {
          countVal = countVal + 1;
        }
      });

      if(countVal > 0) {
        setUnread(true);
      }else{
        setUnread(false);
      }
    }
  }, [data]);

  useEffect(() => {
    if (receiveNoti) {
      refetchChats();
    }
  }, [receiveNoti,isRead]);

  const { isCaseWorker, profilePic } = user ? user : "";

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

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("ukimmigration_token");
    window.location.reload(false);
  };

  useEffect(()=>{
    if(getCount){
      chatNotifications(getCount?.chatId);
    }
  },[getCount]);

  useEffect(() => {
    socket?.on("message received", async (newMessageReceived) => {
        setReceiveNoti(newMessageReceived.result);
        setGetCount(newMessageReceived.result);
    });
  });

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

      <div className="icons-sidebar">
        <Link to="/admin/dashboard">
          <MdOutlineHome style={{ fontSize: "1.9rem", color: "#000" }} />
        </Link>

        <Link to="/admin/notification">
          <IoNotificationsOutline
            style={{ fontSize: "1.9rem", color: "#000" }}
          />
          {count > 0 ? (
            <div className="icon-badge">
              <span>{count}</span>
            </div>
          ) : null}
        </Link>

        <Link to="/admin/message">
          <TbMessage style={{ fontSize: "1.9rem", color: "#000" }} />
          {unread ? (
            <div className="icon-badge-message">
              <span></span>
            </div>
          ) : null}
        </Link>

        <Link to="/calender">
          <FiCalendar style={{ fontSize: "1.9rem", color: "#000" }} />
        </Link>

        {!isCaseWorker && (
          <Link to="/admin/caseworker">
            <LuUserCog2 style={{ fontSize: "1.9rem", color: "#000" }} />
          </Link>
        )}

        <Link to="/admin/billing">
          <HiOutlineClipboardList
            style={{ fontSize: "1.9rem", color: "#000" }}
          />
        </Link>

        <Link to="/admin/profile">
          <MdOutlineSettings style={{ fontSize: "1.9rem", color: "#000" }} />
        </Link>

        <Link to="#" onClick={handleLogout}>
          <img src={logoutImg} alt="" className="Logout-icon" />
        </Link>
      </div>
    </div>
  );
};

export default SideNavbar;





