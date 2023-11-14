import React, { useEffect, useRef, useState } from 'react'
import SideNavbar from './SideNavbar'
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome CSS
import "../style/Message.css"
import Messageprofileimg from "../assests/billing-table-img.png"
import Messagesvg from "../assests/message-svg.png"
import Threedot from "../assests/threedot-svg.png"
import Adminprofile from "../assests/admin-profile-img.png"
import emailedit from "../assests/email-edit.png"
import { useGetAllChatsQuery, useGetUserChatsQuery, useGetUserMessagesQuery, useSendMessageMutation } from '../services/api/chatApi';
import { format } from "timeago.js";
import io from "socket.io-client";
import { useSelector } from 'react-redux';
import moment from "moment";
import pdfimg from "../assests/pdf-img.png";
import downloadicon from "../assests/downloadicon.svg";
import InputEmoji from "react-input-emoji";
import userDefault from "../assests/user-default.png";
import ScrollableFeed from 'react-scrollable-feed';
import { useMemo } from 'react';
import { toastError } from './Toast';

var socket;

const Message = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState([]);
  const fileRef = useRef();
  const [newMessage, setNewMessage] = useState("");
  // const { data, refetch: refetchChats, isLoading: isLoadingChats } = useGetUserChatsQuery();
  const { data, refetch: refetchChats, isLoading: isLoadingChats } = useGetAllChatsQuery();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [name,setName] = useState();
  const [sendMessage, sendMsgRes] = useSendMessageMutation();
  const { isLoading: isLoadingSend, error: isSendMsgErr } = sendMsgRes;
  const [receiveMessage, setReceiveMessage] = useState(null);

  useMemo(() => {
    if (isSendMsgErr) {
      toastError(isSendMsgErr?.data?.message);
    }
  }, [isSendMsgErr]);
  
  // get messages
  const {
    data: messageData,
    isLoading: loading,
    refetch,
  } = useGetUserMessagesQuery(selectedChat?._id, { skip: selectedChat === undefined });

  // console.log("Messages", messages);

  // useEffect(() => {
  //   setMessages(messageData?.result);
  // }, [messageData, refetch]);

  useEffect(() => {
    socket = io(import.meta.env.VITE_URI);
    socket.emit("setup", user);
    socket.on("connected", () => {});
  }, []);

  useEffect(() => {
    if (data) {
      setChats(data?.chats);
    }
  }, [data,messages]);
  
  useEffect(()=>{
    if(selectedChat){
      setName(messageData?.name)
      setMessages(messageData?.result);
    }
  },[selectedChat,messageData])

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

   const chatContainerRef = useRef(null);

   const scrollToBottom = () => {
     if (chatContainerRef.current) {
       chatContainerRef.current.scrollTop =
         chatContainerRef.current.scrollHeight;
     }
   };
  //  console.log(messages);
  console.log("Chats",chats);
   const handleSendMessage = async () => {
     if (newMessage || files.length > 0) {
       setNewMessage("");
       let formData = new FormData();
       formData.append("chatId", selectedChat._id);
       formData.append("content", newMessage);
      formData.append("applicationId", selectedChat?.applicationId);
       console.log("selected files", files);
       for (let i = 0; i < files.length; i++) {
         formData.append("chatFile", files[i]);
       }
       const { data } = await sendMessage(formData);
       console.log(data?.result);
      //  setMessages([...messages, data]);
       socket.emit("new message", data?.result);
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


   useEffect(() => {
     scrollToBottom();
   }, [messages]);  

   const handleChange = (newMessage) => {
     setNewMessage(newMessage);
   };

  //  useEffect(() => {
  //    socket.on("message received", (newMessageReceived) => {
       
  //        const newMessage = newMessageReceived.result;
  //        console.log("message received admin side");
  //       //  if (!messages.some((message) => message === newMessage)) {
  //         if(!messages.includes(newMessageReceived)){
  //           setMessages((prevMessages) => [...prevMessages, newMessage]);
  //         }
  //       //    setReceiveMessage(newMessageReceived);
  //       //    refetchChats();
  //       //  }
  //    });
  //  }, []);

   useEffect(() => {
     socket.on("message received", async (newMessageReceived) => {
       // Give Notification 
       !isLoadingChats && refetchChats();
       !loading && refetch();
       
     });
     
   });

   const handleKeyDown = (event) => {
     if (event.key === "Enter") {
       handleSendMessage();
     }
   };
   const [searchInput, setSearchInput] = useState("");
   const handleSearch = () => {
    console.log(searchInput);
    if(searchInput === ""){
      setChats(data?.chats);
    }else{
      const filteredChats = chats?.filter((chat) =>
        chat.users[0].name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setChats(filteredChats);
    }
     
   };

   const handleKeyDownSearch = (event) => {
    if(searchInput === ""){
      setChats(data?.chats)
    }
    if (event.key === "Enter") {
      handleSearch();
    }
     if (event.key === "Backspace") {
       handleSearch();
     }
   };

   useEffect(()=>{
    if(searchInput === ""){
      handleSearch();
    }
   },[searchInput]);

   console.log("Selected chat", selectedChat);

  return (
    <div className="Main-message-container">
      <SideNavbar />

      <h2 className="Message-heading">Message</h2>
      <div className="Main-Message">
        <div className="container-message-box">
          <div
            className="row"
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              marginRight: "0",
            }}
          >
            <section className="discussions">
              <div className="discussion search">
                <h2 className="Inbox-heading">Inbox</h2>
                <img src={Messagesvg} alt="" className="Message-svg-img" />
                <img src={Threedot} alt="" className="Threedot-svg-img" />
                <div className="searchbar">
                  <i className="fa fa-search" aria-hidden="true" />
                  <input
                    onKeyDown={handleKeyDownSearch}
                    onChange={(e) => setSearchInput(e.target.value)}
                    type="text"
                    placeholder="Search..."
                  />
                </div>
              </div>
              {chats?.map((item) => (
                <div
                  key={item._id}
                  className={
                    item?._id === selectedChat?._id
                      ? "discussion message-active"
                      : "discussion"
                  }
                  onClick={() => handleChatClick(item)}
                >
                  <div className="photo">
                    <img
                      style={{
                        width: "2.3rem",
                        height: "2.3rem",
                        borderRadius: "50%",
                      }}
                      src={
                        item.users[0]?.profilePic
                          ? `${import.meta.env.VITE_IMG_URI}${
                              item.users[0]?.profilePic
                            }`
                          : Adminprofile
                      }
                      alt=""
                    />
                  </div>
                  <div className="desc-contact">
                    <p className="name">{item.users[0]?.name}</p>
                    <p className="message">
                      {item?.latestMessage?.slice(0, 48)}
                    </p>
                  </div>
                  <div className="timer">{format(item.updatedAt)}</div>
                </div>
              ))}
            </section>
            <section className="chat">
              {selectedChat ? (
                <>
                  <div className="header-chat">
                    <img
                      src={
                        selectedChat && selectedChat?.users[0]?.profilePic
                          ? `${import.meta.env.VITE_IMG_URI}${
                              selectedChat?.users[0]?.profilePic
                            }`
                          : Messageprofileimg
                      }
                      alt=""
                      className="Message-profile-img-2"
                    />
                    <div style={{display:"flex",flexDirection:"column",gap:"3px",marginLeft:"23px",justifyContent:"flex-start",alignItems:"flex-start"}}>
                      <p className="name">{selectedChat?.users[0]?.name}</p>
                      <p className="Gmail-text">
                        {selectedChat?.users[0]?.email}
                      </p>
                    </div>
                    <i
                      className="icon clickable fa fa-ellipsis-h right"
                      aria-hidden="true"
                    />
                  </div>
                </>
              ) : null}

              <div
                ref={chatContainerRef}
                className="messages-chat"
                style={{
                  height: "36rem",
                  overflowY: "auto",
                  overflowX: "hidden",
                  scrollBehavior: "smooth",
                }}
              >
                {/* <ScrollableFeed> */}
                {selectedChat ? (
                  messages?.map((item, index) => {
                    const isUserMessage = item?.sender?.toString() == user?._id;
                    return (
                      !loading && (
                        <div
                          className={
                            isUserMessage ? `admin-msg message` : `message`
                          }
                          key={item._id + index}
                        >
                          <div className="photo-2">
                            <img
                              style={{
                                borderRadius: "50%",
                                width: "2rem",
                                height: "2rem",
                              }}
                              src={
                                !loading &&
                                !isUserMessage &&
                                selectedChat?.users[0]?.profilePic
                                  ? `${import.meta.env.VITE_IMG_URI}${
                                      selectedChat?.users[0]?.profilePic
                                    }`
                                  : !isUserMessage &&
                                    !selectedChat?.users[0]?.profilePic
                                  ? `${Messageprofileimg}`
                                  : Adminprofile
                              }
                              alt=""
                              className="Second-profile-img-2"
                            />

                            <p className="Second-profile-name">
                              {!loading && isUserMessage
                                ? "Admin"
                                : selectedChat?.users[0]?.name}
                            </p>
                            <p
                              className="Message-date-time-second"
                              style={
                                !isUserMessage ? { marginLeft: "1.4rem" } : {}
                              }
                            >
                              {format(item?.createdAt)}
                            </p>
                            <p
                              className="Second-profile-message"
                              style={
                                item?.content?.includes("Apologies")
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
                                        <span className="Attach-file-text">
                                          Attached File
                                        </span>
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
                  })
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "25rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: "500",
                        color: "#67725D",
                        listStyle: "none",
                      }}
                    >
                      {" "}
                      Click on the chat to start a conversation
                    </p>
                  </div>
                )}
                {/* </ScrollableFeed> */}

                <p className="response-time time"> </p>
                <p className="time"></p>
              </div>

              {selectedChat ? (
                <div className="footer-chat">
                  <i
                    className="icon fa fa-paperclip clickable"
                    style={{ fontSize: "16pt" }}
                    aria-hidden="true"
                    onClick={() => fileRef.current.click()}
                  />
                  <InputEmoji
                    className="write-message-2"
                    value={newMessage}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    style={{ width: "80%" }}
                    placeholder={
                      files.length > 0
                        ? "Your Files are selected. Click send to send this files"
                        : "Type your message here"
                    }
                  />
                  <i
                    onClick={handleSendMessage}
                    className="icon send fa fa-paper-plane-o clickable"
                    aria-hidden="true"
                  />
                </div>
              ) : null}

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
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message