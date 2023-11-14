import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";
import { useLocation } from "react-router-dom"; // Import Link from react-router-dom
import "../style/Companyprofile.css";
import vectorline from "../assests/Vector-line.png";
import "../style/Genral.css";
import { useGetAllCompaniesQuery } from "../services/api/companyApi";
const Companyprofile = () => {
  const {data} = useGetAllCompaniesQuery();
  console.log(data);
  const links = [
    { to: "/admin/clientprofiles", label: "Client Profile" },
    { to: "/admin/companyprofiles", label: "Company Profile" },
  ];

  const [activeLink, setActiveLink] = useState("/admin/companyprofiles");

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
    <div className="comapnayprofile-main-container">
      <div className="company-Topnavbar-client-profile-2">
        {" "}
        <TopNavbar />
      </div>

      <SideNavbar />

      <div className="company-proile-border">
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

        <Link to="/admin/addingprofile">
          <button className="company-profile-addbtn">
            Add Comapnay Profile
          </button>
        </Link>
        <div className="company-sub-container">
          <div className="company-All-boxes">
            <div className="company-prolie-boxes">
              <Link
                to="/companydetail"
                style={{ display: "flex", gap: "30px" }}
              >
                {data?.company?.map((item) => (
                  <div key={item._id} className="Box-10">
                    <div className="company-Name">
                      <p>
                        {" "}
                        Comapny Name{" "}
                        <img
                          src={vectorline}
                          alt=""
                          className="company-Vector-line"
                        />{" "}
                        <input
                          disabled
                          value={item.name}
                          type="text"
                          placeholder="Imigration1"
                          className="company-Client-inputs"
                        />
                      </p>
                    </div>
                    <div className="company-caseid">
                      <p>
                        {" "}
                        Email
                        <img
                          src={vectorline}
                          alt=""
                          className="company-Vector-line"
                        />{" "}
                        <input
                          disabled
                          value={item.email}
                          type="text"
                          placeholder="00112"
                          className="company-Client-inputs"
                        />
                      </p>
                    </div>
                    <div className="company-ApplicationType">
                      <p>
                        Full Name{" "}
                        <img
                          src={vectorline}
                          alt=""
                          className="company-Vector-line"
                        />{" "}
                        <input
                          disabled
                          type="text"
                          value={item.fullName}
                          placeholder="Set LR"
                          className="company-Client-inputs"
                        />
                      </p>
                    </div>
                    <div className="company-Applicationstatus">
                      <p>
                        {" "}
                        Telephone{" "}
                        <img
                          src={vectorline}
                          alt=""
                          className="company-Vector-line"
                        />{" "}
                        <input
                        disabled
                          type="text"
                          value={item.telephone}
                          placeholder="Approved"
                          className="company-Client-inputs"
                        />
                      </p>
                    </div>
                  </div>
                ))}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companyprofile;
