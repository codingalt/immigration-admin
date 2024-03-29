import React from "react";
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";
import "../style/tablelistid.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFilterApplicationMutation } from "../services/api/applicationApi";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setSearchParams } from "../services/redux/userSlice";
import Loader from "./Loader";
const IdtableList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");
  const caseId = searchParams.get("caseId");
  const country = searchParams.get("country");
  const birthDate = searchParams.get("birthDate");

  const [filterApplication, res] = useFilterApplicationMutation();
  const { isLoading, error, isSuccess, data } = res;
  console.log("Filtered Data", data);

  useEffect(() => {
    filterApplication({ name, country, caseId, birthDate });
  }, [name, caseId, country, birthDate]);

  const handleView = (item) => {
    dispatch(setSearchParams(item));

    if (item.phase1.fullNameAsPassport) {
      navigate(`/admin/group/prescreening/${item._id}`);
    } else {
      navigate(`/admin/prescreening/${item._id}`);
    }
  };

  if (data?.result.length === 0) {
    return (
      <div className="comapnayprofile-main-container">
        <SideNavbar />
        <div style={{ marginLeft: "11.8rem" }}>
          <TopNavbar />
          <div>
            <h2 className="changepassword-profile-heading">Search Results</h2>

            <div className="table-list-sub-container search-record">
              <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
                <span
                  style={{
                    textAlign: "center",
                    color: "red",
                    marginTop: "3rem",
                    fontWeight: "500",
                    fontSize: "1.06rem",
                  }}
                >
                  No Results found with your query
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="comapnayprofile-main-container">
      <SideNavbar />
      <div style={{ marginLeft: "11.8rem" }}>
        <TopNavbar />
        <div>
          <h2 className="changepassword-profile-heading">Search Results</h2>

          <div className="table-list-sub-container search-record">
            <table>
              <thead>
                <tr className="Table-heading">
                  <td>Case ID</td>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Contact</td>
                  <td>Date of Birth</td>
                  <td>Country</td>
                  <td>Action</td>
                </tr>
              </thead>

              <tbody>
                {isLoading && (
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
                )}

                {!isLoading &&
                  data?.result?.map((item) => (
                    <tr key={item._id} style={{}}>
                      <td>{item.caseId}</td>
                      <td>
                        {item.phase1.name
                          ? item.phase1.name
                          : item.phase1.fullNameAsPassport}
                      </td>
                      <td>
                        {item.phase1.email
                          ? item.phase1.email
                          : item.phase1.companyContact
                          ? item.phase1.companyContact
                          : item.phase1.clientContact}
                      </td>
                      <td>
                        {item.phase1.contact ? item.phase1.contact : "..."}
                      </td>
                      <td>
                        {moment(item.phase1.birthDate).format("MMMM D, YYYY")}
                      </td>
                      <td>
                        {item.phase1.country
                          ? item.phase1.country
                          : item.phase1.nationality}
                      </td>
                      <td>
                        <button
                          onClick={() => handleView(item)}
                          className="View-btn-tablelist"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdtableList;
