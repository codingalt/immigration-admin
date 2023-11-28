import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import SideNavbar from "./SideNavbar";
import "../style/Report.css";
import reportprofile from "../assests/report-picture.png";
import { useGetApplicationDataByIdQuery } from "../services/api/applicationApi";
import moment from "moment";
import { useGetGroupClientAppByIdQuery } from "../services/api/companyClient";
const ReportGroup = () => {
  const navigate = useNavigate();
  const { applicationId } = useParams();
  const { data, isLoading } = useGetGroupClientAppByIdQuery(applicationId);
  console.log(data);
  return (
    <div className="Phase-1-main-container">
      <SideNavbar />
      <h2 className="Pre-screening-text-2">Report</h2>

      <button onClick={() => navigate(-1)} className="back-btn">
        Back
      </button>

      <div className="Report-1" style={{ flexDirection: "column" }}>
        {data?.application?.report.length === 0 && !isLoading && (
          <p
            style={{
              fontWeight: "500",
              fontSize: "1.05rem",
              textAlign: "center",
              margin: "auto",
              color: "#DD2025",
              fontFamily: "Poppins",
            }}
          >
            No Report available for now.
          </p>
        )}
        {data?.application?.report?.map((item) => (
          <div
            key={item._id}
            style={{
              display: "flex",
              width: "100%",
              height: "5.1rem",
              position: "relative",
            }}
          >
            <div className="left-report-side">
              <img src={reportprofile} alt="" />
              <p className="phases-report-heading">
                Phase {item.phase}
                <span className="Date-time-report-text">
                  {moment(item?.dateTime).format("dddd, MMMM D, hh:mm a")}
                </span>
              </p>
            </div>

            <div className="right-report-side">
              <button
                type="button"
                className={
                  item.status === "approved"
                    ? "aproved-report-btn"
                    : "Reject-report-btn"
                }
              >
                {item.status === "approved" ? "Approved" : "Rejected"}
              </button>
            </div>

            {item.status === "rejected" &&
              data?.application?.rejectPhaseReason && (
                <div className="report-reason">
                  <p className="reason-text">
                    {data?.application?.rejectPhaseReason}
                  </p>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportGroup;
