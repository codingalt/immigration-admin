import React, { useEffect, useState, useRef } from "react";
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";
import "../style/tablelistid.css";
import { Link, NavLink, useParams } from "react-router-dom";
import { useGetApplicationsByCompanyQuery } from "../services/api/companyApi";
import moment from "moment";
import Loader from "./Loader";

const Companydetail = () => {
  const { companyId, companyName } = useParams();
  const { data,isLoading,isSuccess,error } = useGetApplicationsByCompanyQuery(companyId,{refetchOnMountOrArgChange: true});

  return (
    <div className="comapnayprofile-main-container">
      <SideNavbar />

      <div style={{ marginLeft: "11.8rem" }}>
        <TopNavbar />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 className="changepassword-profile-heading">{companyName}</h2>

          <Link to={`/servicelist/${companyId}`} style={{ marginTop: 10 }}>
            <button className="Case-profile-addbtn" type="button">
              Create New Case
            </button>
          </Link>
        </div>

<<<<<<< HEAD
        <div
          className="table-list-sub-container table-list-cd">
        <div
          className="table-list-sub-container"
          style={{ position: "relative" }}
=======
        <div
          className="table-list-sub-container"
>>>>>>> 9e24335c8ad112d9e566d21005703b4740a2e97f
          id="table-list2"
        >
          <table>
            <thead>
              <tr className="Table-heading">
                <td>Case ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Application Type</td>
                <td>Date of Birth</td>
                <td>Nationality</td>
                <td>Action</td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={7} style={{ border: "none" }}>
                  {isLoading && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "1rem",
                      }}
                    >
                      <Loader color={"#5D982E"} width={34} />
                    </div>
                  )}
                </td>
              </tr>
              {!isLoading &&
                data?.applications?.map((item, index) => (
                  <tr key={item._id}>
                    <td>{item.caseId}</td>
                    <td>{item.phase1.fullNameAsPassport}</td>
                    <td>
                      {item.phase1.clientContact
                        ? item.phase1.clientContact
                        : item.phase1.companyContact}
                    </td>
                    <td>{item.phase1.applicationType}</td>
                    <td>
                      {moment(item?.phase1?.birthDate).format("ddd, MMM D")}
                    </td>
                    <td>{item.phase1.nationality}</td>
                    <td>
                      <Link to={`/admin/group/prescreening/${item._id}`}>
                        <button className="View-btn-tablelist">View</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              <tr>
                <td colSpan={7} style={{ border: "none" }}>
                  {!isLoading && data?.applications.length === 0 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "1rem",
                        color: "red",
                        fontWeight: "500",
                        fontSize: "1.05rem",
                      }}
                    >
                      No Applications Found
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Companydetail;
