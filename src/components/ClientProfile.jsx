import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";
import "../style/CLientprofile.css";
import { useLocation } from "react-router-dom"; // Import Link from react-router-dom
import vectorline from "../assests/Vector-line.png";
import "../style/Genral.css";
import { useGetUsersQuery } from "../services/api/adminApi";
import { useGetAllApplicationsQuery } from "../services/api/applicationApi";
import Loader from "./Loader";
const ClientProfile = () => {
  const navigate = useNavigate();
  const [activeProfileLink, setActiveProfileLink] = useState("/client-profile");
  const location = useLocation();

  const { data, isLoading } = useGetAllApplicationsQuery();
  console.log(data);

  useEffect(() => {
    if (location.pathname === "/company-profile") {
      setActiveProfileLink("/company-profile");
    } else {
      setActiveProfileLink("/client-profile");
    }
  }, [location.pathname]);

  const links = [
    { to: "/admin/clientprofiles", label: "Client Profile" },
    { to: "/admin/companyprofiles", label: "Company Profile" },
  ];

  const [activeLink, setActiveLink] = useState("/admin/clientprofiles");

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
    <div className="Clientprofile-main-container">
      <div className="Topnavbar-client-profile">
        {" "}
        <TopNavbar />
      </div>

      <SideNavbar />

      <div className="Profile-routes">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={`link-hover-effect ${
              activeLink === link.label ? "link-active" : ""
            }`}
            onClick={() => handleLinkClick(link.label)}
            style={
              link.to === "/admin/clientprofiles"
                ? { width: "10rem" }
                : link.to === "/admin/companyprofiles"
                ? { width: "13rem" }
                : {
                    width: "14rem",
                  }
            }
          >
            <span className="routes-all">{link.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="Client-proile-border">
        <button
          onClick={() => navigate("/add/phase1")}
          className="client-profile-addbtn"
        >
          Add Profile
        </button>

        <div className="clientproile-sub-container">
          <div className="All-boxes All-box-client">
            <div className="CLient-prolie-boxes">
              {isLoading && (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "4rem",
                  }}
                >
                  <Loader width={35} color={"#5B952D"} />
                </div>
              )}
              {!isLoading &&
                data?.applications
                  ?.slice()
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((item) => (
                    <>
                      {" "}
                      <NavLink
                        key={item._id}
                        to={`/admin/prescreening/${item._id}`}
                        style={{
                          width: "360px",
                          cursor: "pointer",
                          zIndex: "10",
                        }}
                      >
                        <div
                          className="Box-1"
                          style={{ cursor: "pointer", left: "0" }}
                        >
                          <div className="Name">
                            <p>
                              {" "}
                              Name{" "}
                              <img
                                src={vectorline}
                                alt=""
                                className="Vector-line"
                              />{" "}
                              <input
                                disabled
                                value={item.user.name}
                                type="text"
                                placeholder="Jhon leo"
                                className="Client-inputs"
                              />
                            </p>
                          </div>
                          <div className="caseid">
                            <p>
                              {" "}
                              Case ID
                              <img
                                src={vectorline}
                                alt=""
                                className="Vector-line"
                              />{" "}
                              <input
                                disabled
                                value={item.caseId}
                                type="text"
                                placeholder="00112"
                                className="Client-inputs"
                              />
                            </p>
                          </div>
                          <div className="ApplicationType">
                            <p>
                              Application Type{" "}
                              <img
                                src={vectorline}
                                alt=""
                                className="Vector-line"
                              />{" "}
                              <input
                                disabled
                                value={item.phase1.applicationType}
                                type="text"
                                placeholder="Set LR"
                                className="Client-inputs"
                              />
                            </p>
                          </div>
                          <div className="Applicationstatus">
                            <p>
                              {" "}
                              Application Status{" "}
                              <img
                                src={vectorline}
                                alt=""
                                className="Vector-line"
                              />{" "}
                              <input
                                disabled
                                value={
                                  item.phase === 4 &&
                                  item.phaseStatus === "approved"
                                    ? "Approved"
                                    : item.applicationStatus === "pending"
                                    ? "Pending"
                                    : "Approved"
                                }
                                type="text"
                                placeholder="Approved"
                                className="Client-inputs"
                              />
                            </p>
                          </div>
                        </div>
                      </NavLink>
                    </>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
