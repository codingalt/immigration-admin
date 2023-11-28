import React from "react";
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";
import "../style/Caseworker.css";
import { Link, NavLink } from "react-router-dom"; // Import Link from react-router-dom
import vectorline from "../assests/Vector-line.png";
import { useGetCaseWorkerQuery } from "../services/api/caseworkerApi";
import Loader from "./Loader";

const Caseworker = () => {
   const {data,isLoading} = useGetCaseWorkerQuery();
   console.log(data);
  return (
    <div className="Caseworkerprofile-main-container">
      <div className="Topnavbar-caseworker-profile">
        {" "}
        <TopNavbar />
      </div>

      <SideNavbar />

      <div className="Caseworker-proile-border">
        <h2 className="Caseworker-profile-heading">Caseworker Profile</h2>

        <NavLink to="/admin/addcaseworker">
          <button className="caseworker-profile-addbtn">Add Case Worker</button>
        </NavLink>
        <div className="caseworkerproile-sub-container">
          <div className="All-boxes">
            <div className="Caseworker-prolie-boxes">
              {isLoading && (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "6rem",
                    marginLeft: "6.5rem",
                  }}
                >
                  <Loader width={35} color={"#5B952D"} />
                </div>
              )}

              {!isLoading && data?.caseWorker?.length === 0 && (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "3rem",
                    marginLeft: "11.5rem",
                  }}
                >
                  <p style={{fontSize:"1.06rem",fontWeight:"500",color:"red"}}>No Case Worker Profile!</p>
                </div>
              )}

              {}
              {!isLoading &&
                data?.caseWorker?.map((item) => (
                  <div key={item._id} className="Box-1">
                    <div className="Name">
                      <p
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {" "}
                        Case Worker{" "}
                        <img
                          src={vectorline}
                          alt=""
                          className="Vector-line"
                        />{" "}
                        <input
                          disabled
                          value={item.name}
                          type="text"
                          placeholder="Jhon leo"
                          className="Caseworker-inputs"
                        />
                      </p>
                    </div>
                    <div className="caseid">
                      <p>
                        {" "}
                        Worker ID{" "}
                        <img
                          src={vectorline}
                          alt=""
                          className="Vector-line"
                        />{" "}
                        <input
                          disabled
                          value={item.workerId}
                          type="text"
                          placeholder="00112"
                          className="Caseworker-inputs"
                        />
                      </p>
                    </div>
                    <div className="ApplicationType">
                      <p>
                        Email{" "}
                        <img src={vectorline} alt="" className="Vector-line" />{" "}
                        <input
                          disabled
                          value={`${item?.email}`}
                          type="text"
                          placeholder="Worker@gmail.com"
                          className="Caseworker-inputs"
                        />
                      </p>
                    </div>
                    <div className="Applicationstatus">
                      <p>
                        {" "}
                        Contact{" "}
                        <img
                          src={vectorline}
                          alt=""
                          className="Vector-line"
                        />{" "}
                        <input
                          disabled
                          value={item.contact}
                          type="text"
                          placeholder="(484)-845-58462584"
                          className="Caseworker-inputs"
                        />
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Caseworker;
