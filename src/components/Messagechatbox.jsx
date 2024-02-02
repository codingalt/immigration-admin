import React, { useMemo } from 'react'
import SideNavbar from './SideNavbar'
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome CSS
import "../style/Messagesimple.css"
import Messageprofileimg from "../assests/billing-table-img.png"
import Messagesvg from "../assests/message-svg.png"
import Threedot from "../assests/threedot-svg.png"
import Adminprofile from "../assests/admin-profile-img.png"
import emailedit from "../assests/email-edit.png"
import { useGetChatByApplicationIdQuery, useGetUserChatsQuery, useGetUserMessagesQuery, useReadMessagesByChatMutation, useSendMessageMutation } from '../services/api/chatApi';
import userDefault from "../assests/user-default.png"
import InputEmoji from "react-input-emoji";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import moment from "moment";
import pdfimg from "../assests/pdf-img.png";
import downloadicon from "../assests/downloadicon.svg";
import io from "socket.io-client";
import { toastError } from './Toast';
import defaultImg from "../assests/user-default.png";

var socket;

const Message = ({applicationId}) => {
  const {data: chat} = useGetChatByApplicationIdQuery(applicationId);
  const { user } = useSelector((state) => state.user);

  const [socketConnected, setSocketConnected] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState([]);
  const fileRef = useRef();
  const [readMessagesByChat] = useReadMessagesByChatMutation();

  useEffect(() => {
    socket = io(import.meta.env.VITE_URI);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
  }, []);

  const navigate = useNavigate();
  // const { data, isLoading } = useGetUserChatsQuery();
  const chatId = chat?.result[0]?._id;

  // get messages
  const {
    data: messageData,
    isLoading: loading,
    refetch,
  } = useGetUserMessagesQuery(chatId, {
    skip: chatId === undefined,
    refetchOnMountOrArgChange: true,
  });

  useEffect(()=>{
    if(chatId){
      refetch();
    }
  },[chatId]);

  const [sendMessage, sendMsgRes] = useSendMessageMutation();
  const { isLoading: isLoadingSend, error: isSendMsgErr } = sendMsgRes;

  useMemo(() => {
    if(isSendMsgErr){
      toastError(isSendMsgErr?.data?.message);
    }
  }, [isSendMsgErr]);

  useEffect(() => {
    setMessages(messageData?.result);
  }, [messageData, refetch]);

  const handleSendMessage = async () => {
    if (newMessage || files.length > 0) {
      setNewMessage("");
      let formData = new FormData();
      formData.append("chatId", chatId);
      formData.append("content", newMessage);
      formData.append("applicationId", applicationId);
      console.log("selected files", files);
      for (let i = 0; i < files.length; i++) {
        formData.append("chatFile", files[i]);
      }
      const { data } = await sendMessage(formData);
      console.log(data?.result);
      socket.emit("new message", data?.result);
      setMessages([...messages, data?.result?.result]);
      setFiles([]);
    }
  };

   const openFile = (e) => {
     const files = e.target.files;
     console.log(files);
     const filePaths = [];
     for (let i = 0; i < files.length; i++) {
       const file = files[i];
       filePaths.push(file);
     }
     setFiles(filePaths);
   };

   const chatContainerRef = useRef(null);

   const scrollToBottom = () => {
     if (chatContainerRef.current) {
       chatContainerRef.current.scrollTop =
         chatContainerRef.current.scrollHeight;
     }
   };

   useEffect(() => {
     scrollToBottom();
   }, [messages]);

   const handleChange = (newMessage) => {
     console.log(newMessage);
     setNewMessage(newMessage);
   };

   useEffect(() => {
     socket.on("message received", async (newMessageReceived) => {
    setMessages([...messages, newMessageReceived.result]);
    // readMessagesByChat(newMessageReceived?.result?.chatId);
     });
     
   });

   const handleKeyDown = (event) => {
     if (event.key === "Enter") {
       handleSendMessage();
     }
   };

  return (
    // <div className="Main-message-container-2">
    //   <div className="Main-Message-2">
        <div className="container-message-box-2">
          <div className="row" style={{ height: "100%" }}>
            <section className="chat-2" style={{ height: "94%" }}>
              <div className="header-chat-2">
                {chat?.result[0]?.users[0]?.googleId ? (
                  <img
                    style={{
                      width: "2.3rem",
                      height: "2.3rem",
                      borderRadius: "50%",
                    }}
                    src={
                      chat?.result[0]?.users[0]?.profilePic
                        ? chat?.result[0]?.users[0]?.profilePic
                        : userDefault
                    }
                    alt=""
                    className="Message-profile-img-2"
                  />
                ) : (
                  <img
                    style={{
                      width: "2.3rem",
                      height: "2.3rem",
                      borderRadius: "50%",
                    }}
                    src={
                      chat?.result[0]?.users[0]?.profilePic
                        ? `${import.meta.env.VITE_IMG_URI}${
                            chat?.result[0]?.users[0]?.profilePic
                          }`
                        : Messageprofileimg
                    }
                    alt=""
                    className="Message-profile-img-2"
                  />
                )}

                <div className="header-name-email">
                  <p className="name">{chat?.result[0]?.users[0]?.name}</p>
                  <p className="Gmail-text-2">
                    {chat?.result[0]?.users[0]?.email}
                  </p>
                </div>
                <p className="Date-time-text-2"></p>
              </div>
              <div className="messages-chat-2" ref={chatContainerRef}>
                {messages?.map((item) => {
                  const isUserMessage = item?.sender?.toString() != chat?.result[0]?.clientId;
                  return (
                    !loading && (
                      <div
                        className={
                          !isUserMessage ? `message` : `message admin-msg`
                        }
                        key={item._id}
                      >
                        <div className="photo-2">
                          {chat?.result[0]?.users[0]?.googleId ? (
                            <img
                              style={{
                                borderRadius: "50%",
                                width: "2rem",
                                height: "2rem",
                              }}
                              src={
                                isUserMessage
                                  ? user?.profilePic
                                    ? import.meta.env.VITE_IMG_URI +
                                      user.profilePic
                                    : Adminprofile
                                  : !isUserMessage &&
                                    chat?.result[0]?.users[0]?.profilePic
                                  ? chat?.result[0]?.users[0]?.profilePic
                                  : Messageprofileimg
                              }
                              alt=""
                              className="Second-profile-img-2"
                            />
                          ) : (
                            <img
                              style={{
                                borderRadius: "50%",
                                width: "2rem",
                                height: "2rem",
                              }}
                              src={
                                isUserMessage
                                  ? user?.profilePic
                                    ? import.meta.env.VITE_IMG_URI +
                                      user.profilePic
                                    : Adminprofile
                                  : !isUserMessage &&
                                    chat?.result[0]?.users[0]?.profilePic
                                  ? `${import.meta.env.VITE_IMG_URI}${
                                      chat?.result[0]?.users[0]?.profilePic
                                    }`
                                  : Messageprofileimg
                              }
                              alt=""
                              className="Second-profile-img-2"
                            />
                          )}

                          <p className="Second-profile-name">
                            {isUserMessage
                              ? "Admin"
                              : chat?.result[0]?.users[0]?.name}
                          </p>
                          <p
                            className="Message-date-time-second"
                            style={!isUserMessage ? { marginLeft: "25px" } : {}}
                          >
                            {moment(item?.createdAt).format(
                              "dddd, MMMM Do hh:mm a"
                            )}
                          </p>
                          <p
                            className="Second-profile-message message-content"
                            style={
                              item?.isPhaseMessage
                                ? { color: "red" }
                                : item?.isPhaseApprovedMessage
                                ? {
                                    color: "#5cb85c",
                                  }
                                : {}
                            }
                          >
                            {item?.content}
                            {item?.files && item?.files?.length > 0 && (
                              <div className="one-pdf-file">
                                {item?.files?.map((file) => (
                                  <div className="pdf-file-send" key={file}>
                                    <img
                                      src={pdfimg}
                                      alt=""
                                      className="file-attach-pdf-icon"
                                    />
                                    <div>
                                      <p className="Attach-file-text">
                                        Attached File
                                      </p>
                                    </div>
                                    <a
                                      href={`${
                                        import.meta.env.VITE_IMG_URI
                                      }${file}`}
                                      download
                                    >
                                      <img
                                        src={downloadicon}
                                        alt=""
                                        className="pdf-file-downloadicon"
                                      />
                                    </a>
                                  </div>
                                ))}
                              </div>
                            )}
                          </p>
                        </div>
                      </div>
                    )
                  );
                })}

                <p className="response-time time"> </p>
                <p className="time"></p>
              </div>
              {/* Select file hidden input  */}
              <input
                ref={fileRef}
                type="file"
                id="filemsg"
                multiple
                name="filemsg"
                accept=".pdf"
                onChange={openFile}
                style={{ display: "none" }}
              />
              <div className="footer-chat-2">
                <i
                  onClick={() => fileRef.current.click()}
                  className="icon fa fa-paperclip clickable"
                  style={{ fontSize: "16pt" }}
                  aria-hidden="true"
                />
                <InputEmoji
                  className="write-message-2"
                  value={newMessage}
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  placeholder={
                    files.length > 0
                      ? "Your Files are selected. Click send to send this files"
                      : "Type your message here"
                  }
                />
                <i
                  style={{ fontSize: "1.1rem" }}
                  onClick={handleSendMessage}
                  className="icon send fa fa-paper-plane-o clickable"
                  aria-hidden="true"
                />
              </div>
            </section>
          </div>
        </div>
    //   </div>
    // </div>
  );
}

export default Message