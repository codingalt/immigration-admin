import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";
import { useLocation } from "react-router-dom"; // Import Link from react-router-dom
import "../style/Companyprofile.css";
import vectorline from "../assests/Vector-line.png";
import "../style/Genral.css";
import { useGetAllCompaniesQuery } from "../services/api/companyApi";
import Loader from "./Loader";
const Companyprofile = () => {
  const { data, isLoading } = useGetAllCompaniesQuery();
  const navigate = useNavigate();
  console.log(data?.company);
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
      <SideNavbar />
      <div style={{ marginLeft: "11.8rem" }}>
        <TopNavbar />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/admin/addingprofile" style={{ marginTop: 10 }}>
            <button className="company-profile-addbtn">
              Add Company Profile
            </button>
          </Link>
        </div>

        <div className="company-proile-border">
          <div className="Profile-routes profile-route-cp">
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

          <div className="company-sub-container">
            <div className="company-All-boxes">
              <div className="company-prolie-boxes">
                {isLoading && (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "14rem",
                      marginLeft: "10rem",
                    }}
                  >
                    <Loader width={35} color={"#5B952D"} />
                  </div>
                )}

                {!isLoading && data?.company?.length === 0 && (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "7.5rem",
                      marginLeft: "10rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: "500",
                        color: "red",
                      }}
                    >
                      No Company Profile!
                    </p>
                  </div>
                )}

                {!isLoading &&
                  data?.company
                    .slice()
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map((item) => (
                      <div
                        style={{ cursor: "pointer" }}
                        key={item._id}
                        className="Box-10"
                        onClick={() =>
                          navigate(`/company/${item.name}/${item._id}`)
                        }
                      >
                        <div className="company-caseid">
                          <div className="companyCard-left-input">
                            {" "}
                            <span>Comapny Name</span>
                            <img
                              src={vectorline}
                              alt=""
                              className="company-Vector-line"
                            />{" "}
                          </div>
                          <div className="company-Client-inputs">
                            {item.name}
                          </div>
                        </div>
                        <div className="company-caseid">
                          <div className="companyCard-left-input">
                            {" "}
                            <span>Email</span>
                            <img
                              src={vectorline}
                              alt=""
                              className="company-Vector-line"
                            />{" "}
                          </div>
                          <div className="company-Client-inputs">
                            {item.email}
                          </div>
                        </div>
                        <div className="company-caseid">
                          <div className="companyCard-left-input">
                            <span>Full Name</span>{" "}
                            <img
                              src={vectorline}
                              alt=""
                              className="company-Vector-line"
                            />{" "}
                          </div>
                          <div className="company-Client-inputs">
                            {item.fullName}
                          </div>
                        </div>
                        <div className="company-caseid">
                          <div className="companyCard-left-input">
                            {" "}
                            <span>Telephone</span>
                            <img
                              src={vectorline}
                              alt=""
                              className="company-Vector-line"
                            />{" "}
                          </div>
                          <div className="company-Client-inputs">
                            {item.telephone}
                          </div>
                        </div>
                      </div>
                    ))}
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companyprofile;
