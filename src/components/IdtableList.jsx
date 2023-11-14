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
  const {isLoading, error, isSuccess,data} = res;
  console.log("Filtered Data", data);

  useEffect(()=>{
    filterApplication({name, country, caseId, birthDate});
  },[name,caseId,country,birthDate]);

  const handleView = (item)=>{
    dispatch(setSearchParams(item));
    navigate("/admin/dashboard")
  }

  if (data?.result.length === 0){
    return (
      <div className="comapnayprofile-main-container">
        <div className="Addcompany-Topnavbar-client-profile-2">
          <TopNavbar />
        </div>

        <SideNavbar />

        <h2 className="changepassword-profile-heading">Search Results</h2>

        <div className="table-list-sub-container" style={{display:"flex",justifyContent:"center"}}>
          <span style={{textAlign:"center",color:"red",marginTop:"3rem",fontWeight:"600",fontSize:"1.1rem"}}>No Results found with your query</span>
        </div>

        </div>
    )
  }
    return (
      <div className="comapnayprofile-main-container">
        <div className="Addcompany-Topnavbar-client-profile-2">
          <TopNavbar />
        </div>

        <SideNavbar />

        <h2 className="changepassword-profile-heading">Search Results</h2>

        <div className="table-list-sub-container">
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
              {data?.result?.map((item) => (
                <tr key={item._id} style={{}}>
                  <td>{item.caseId}</td>
                  <td>{item.phase1.name}</td>
                  <td>{item.phase1.email}</td>
                  <td>{item.phase1.contact}</td>
                  <td>{moment(item.phase1.birthDate).format("MMMM D, YYYY")}</td>
                  <td>{item.phase1.country}</td>
                  <td>
                      <button onClick={()=>handleView(item)} className="View-btn-tablelist">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default IdtableList;
