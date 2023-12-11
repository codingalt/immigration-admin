import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import SideNavbar from './SideNavbar'
import "../style/Billing.css"
import Invoicepencile from "../assests/invoice-edit-pencile.png"
import Tableimg from "../assests/billing-table-img.png"
import banner from "../assests/billing-banner-img.png"
import 'font-awesome/css/font-awesome.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFilterInvoicesMutation } from '../services/api/adminApi';
import { useGetCaseWorkerQuery } from '../services/api/caseworkerApi';
import Search from "../assests/search-icon.svg";
import moment from 'moment';
import { useRef } from 'react';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import Loader from './Loader';

const Billing = () => {

  const [filterInvoices,res] = useFilterInvoicesMutation();
  const {isLoading,isSuccess,data: invoicesData} = res;
  const [invoices, setInvoices] = useState([]);

  const [name,setName] = useState("");
  const [applicationType, setApplicationType] = useState("");
  const [caseWorkerId, setCaseWorkerId] = useState("");
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const pdfRef = useRef(null);

  const [selectedCaseWorker, setSelectedCaseWorker] = useState({
    caseWorkerId: "",
    caseWorkerName: "",
  });
  const { data } = useGetCaseWorkerQuery();
  const [selectedCaseWorkerName, setSelectedCaseWorkerName] = useState();
   const handleFilterInvoices = async () => {
     const { data } = await filterInvoices({
       name: name,
       applicationType: applicationType,
       caseWorkerId: selectedCaseWorker.caseWorkerId,
       from: from,
       to: to,
     });
     console.log("Filtered", data);
   };

  const handleSelectChange = async(e) => {
    const selectedName = e.target.value;
    const selectedId = e.target.selectedOptions[0].getAttribute("data-id");
    setSelectedCaseWorker({
      caseWorkerId: selectedId,
      caseWorkerName: selectedName,
    });
    setSelectedCaseWorkerName(selectedName);
    const { data } = await filterInvoices({
      name: name,
      applicationType: applicationType,
      caseWorkerId: selectedId,
      from: from,
      to: to,
    });
  };

  const handleKeyDown = async(event) => {
    if (event.key === "Enter") {
      handleFilterInvoices();
    } else if (event.key === "Backspace") {
      setTimeout(() => {
        handleFilterInvoices();
      }, 1200);
    }
  };

  const handleSelectFilter = async(e)=>{
    setApplicationType(e.target.value);
    handleFilterInvoices();
  }

  useEffect(() => {
    if (invoicesData) {
      setInvoices(invoicesData?.result);
    }
  }, [invoicesData,isSuccess]);

  useEffect(()=>{
    const { data } = filterInvoices({
        name: name,
        applicationType: applicationType,
        caseWorkerId: selectedCaseWorker.caseWorkerId,
        from: from,
        to: to,
      });
      setInvoices(data?.result)
  },[]);

  const handleSelectFrom = (date)=>{
    setFrom(date);
  }

  const handleSelectTo = (date) => {
    setTo(date);
  };

  useEffect(() => {
    handleFilterInvoices();
  }, [from, to, selectedCaseWorker, selectedCaseWorkerName,applicationType]);

  const handleResetFilters = () => {
    setName("");
    setApplicationType("");
    setFrom("");
    setTo("");
    setSelectedCaseWorker({
      caseWorkerId: "",
      caseWorkerName: "",
    });
    setSelectedCaseWorkerName("");
  };

  // if(isSuccess && !isLoading && invoices?.length === 0){
  //   return (
  //     <div className="comapnayprofile-main-container">
  //       <div className="Addcompany-Topnavbar-client-profile-2"></div>

  //       <SideNavbar />

  //       <h2 className="Billing-profile-heading-2">Billings</h2>

  //       <div className="table-list-sub-container">
  //         <table>
  //           <p className="Invoice-detail-heading">Invoice Details</p>
  //           <div className="Billing-header">
  //             <div className="billing-details-data">
  //               <input
  //                 type="text"
  //                 className="Serach-bar"
  //                 placeholder="Search Name"
  //                 value={name}
  //                 onKeyDown={handleKeyDown}
  //                 onChange={(e) => setName(e.target.value)}
  //               />
  //               <div className="Date-picker-and-Dropdown">
  //                 <div>
  //                   <DatePicker
  //                     placeholderText="11/06/2023"
  //                     selected={from}
  //                     onChange={handleSelectFrom}
  //                     className="start-to-end"
  //                   />
  //                 </div>
  //                 <p className="To-between">To</p>
  //                 <div>
  //                   <DatePicker
  //                     placeholderText="12/08/2023"
  //                     selected={to}
  //                     onChange={handleSelectTo}
  //                     className="start-to-end-2"
  //                   />
  //                 </div>
  //                 <p className="border-line-betweennn"></p>
  //                 <select
  //                   value={selectedCaseWorkerName}
  //                   onChange={handleSelectChange}
  //                   className="Case-worker-billing-drop"
  //                 >
  //                   <option>Case Worker Name</option>
  //                   {data?.caseWorker?.map((item) => (
  //                     <option
  //                       key={item._id}
  //                       value={item.name}
  //                       data-id={item._id}
  //                     >
  //                       {item.name}
  //                     </option>
  //                   ))}
  //                 </select>
  //                 <p className="border-line-betweennn"></p>
  //                 <select
  //                   onChange={handleSelectFilter}
  //                   className="ApT-billing-drop"
  //                 >
  //                   <option>APT</option>
  //                   <option value={"University Placement"}>
  //                     University Placement
  //                   </option>
  //                   <option value={"Student Visa"}>Student Visa</option>
  //                   <option value={"Other"}>Other</option>
  //                 </select>
  //               </div>
  //               <div
  //                 style={{
  //                   width: "100%",
  //                   display: "flex",
  //                   justifyContent: "center",
  //                   alignItems: "center",
  //                   gap: "14px",
  //                 }}
  //               >
  //                 <button
  //                   style={{
  //                     width: "2.5rem",
  //                     height: "2.5rem",
  //                     display: "flex",
  //                     justifyContent: "center",
  //                     alignItems: "center",
  //                     borderRadius: "50%",
  //                     padding: "0",
  //                     cursor: "pointer",
  //                   }}
  //                   className="button-billing-deatil"
  //                 >
  //                   <img
  //                     src={Search}
  //                     alt="Search Icon"
  //                     onClick={handleFilterInvoices}
  //                     style={{ width: "1rem", height: "1rem" }}
  //                   />
  //                 </button>
  //                 <button
  //                   onClick={handleResetFilters}
  //                   style={{ cursor: "pointer" }}
  //                   className="button-billing-deatil"
  //                 >
  //                   Reset Filters{" "}
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //           <p
  //             style={{ color: "red", textAlign: "center", fontSize: "1.1rem" }}
  //           >
  //             No Record Found
  //           </p>
  //         </table>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="comapnayprofile-main-container">
      <div className="Addcompany-Topnavbar-client-profile-2"></div>

      <SideNavbar />

      <h2 className="Billing-profile-heading-2">Billings</h2>

      <div className="table-list-sub-container">
        <table style={{ maxHeight: "4rem" }}>
          <p className="Invoice-detail-heading">Invoice Details</p>
          <div className="Billing-header">
            <div className="billing-details-data">
              <input
                type="text"
                className="Serach-bar"
                placeholder="Search Name"
                value={name}
                onKeyDown={handleKeyDown}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="Date-picker-and-Dropdown">
                <div>
                  <DatePicker
                    placeholderText="11/06/2023"
                    selected={from}
                    onChange={handleSelectFrom}
                    className="start-to-end"
                  />
                </div>
                <p className="To-between">To</p>
                <div>
                  <DatePicker
                    placeholderText="12/08/2023"
                    selected={to}
                    onChange={handleSelectTo}
                    className="start-to-end-2"
                  />
                </div>
                <p className="border-line-betweennn"></p>
                <select
                  value={selectedCaseWorkerName}
                  onChange={handleSelectChange}
                  className="Case-worker-billing-drop"
                >
                  <option>Case Worker Name</option>
                  {data?.caseWorker?.map((item) => (
                    <option
                      key={item._id}
                      value={item.name}
                      data-id={item.userId}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
                <p className="border-line-betweennn"></p>
                <select
                  onChange={handleSelectFilter}
                  className="ApT-billing-drop"
                >
                  <option>APT</option>
                  <option value="Sponsor License">Sponsor License</option>
                  <option value="Certificate of Sponsorship">
                    Certificate of Sponsorship
                  </option>
                  <option value="Certificate of Acceptance of Studies">
                    Certificate of Acceptance of Studies
                  </option>
                  <option value="Entry Clearance">Entry Clearance</option>
                  <option value="Leave to Remain">Leave to Remain</option>
                  <option value="Indefinite Leave to Remain">
                    Indefinite Leave to Remain
                  </option>
                  <option value="Naturalisation">Naturalisation</option>
                  <option value="EEUS Settlement">EEUS Settlement</option>
                  <option value="University Placement">
                    University Placement
                  </option>
                  <option value="Immigration Matter">Immigration Matter</option>
                  <option value="AN1 – Naturalisation">
                    AN1 – Naturalisation{" "}
                  </option>
                  <option value="MN1 – Registration">
                    MN1 – Registration{" "}
                  </option>
                  <option value="ILR – Indefinite Leave to Remain">
                    ILR – Indefinite Leave to Remain
                  </option>
                  <option value="FLR – Further Leave to Remain">
                    FLR – Further Leave to Remain{" "}
                  </option>
                  <option value="FLR(FP)">FLR(FP)</option>
                  <option value="FLR(M)">FLR(M) </option>
                  <option value="SW – Skilled Worker">
                    SW – Skilled Worker{" "}
                  </option>
                  <option value="SL- Sponsor Licence">
                    SL- Sponsor Licence{" "}
                  </option>
                  <option value="Student">Student </option>
                  <option value="Student Child">Student Child</option>
                  <option value="Graduate Visa">Graduate Visa</option>
                  <option value="ECS- Entry Clearance Spouse">
                    ECS- Entry Clearance Spouse{" "}
                  </option>
                  <option value="ECV – Entry Clearance Visitor">
                    ECV – Entry Clearance Visitor{" "}
                  </option>
                  <option value="ECD – Entry Clearance Dependant">
                    ECD – Entry Clearance Dependant{" "}
                  </option>
                  <option value="PS – Pre Settled Status">
                    PS – Pre Settled Status
                  </option>
                  <option value="SS – Settled Status">
                    SS – Settled Status{" "}
                  </option>
                  <option value="Others">Others </option>
                </select>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <button
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    padding: "0",
                    cursor: "pointer",
                  }}
                  className="button-billing-deatil"
                >
                  <img
                    src={Search}
                    alt="Search Icon"
                    onClick={handleFilterInvoices}
                    style={{ width: "1rem", height: "1rem" }}
                  />
                </button>
                <button
                  onClick={handleResetFilters}
                  style={{ cursor: "pointer" }}
                  className="button-billing-deatil"
                >
                  Reset Filters{" "}
                </button>
              </div>
            </div>
          </div>

          <tr className="Table-heading">
            <td>Case ID</td>
            <td>Client Name</td>
            <td>Application Type</td>
            <td>Case Worker</td>
            <td>Invoice Create</td>
            <td>Cost</td>
            <td>Status</td>
            <td>Receipt</td>
          </tr>

          {isLoading && (
            <tr>
              <td colSpan={7} style={{ border: "none" }}>
                {isLoading && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "2.5rem",
                    }}
                  >
                    <Loader color={"#5D982E"} width={34} />
                  </div>
                )}
              </td>
            </tr>
          )}

          {!isLoading && invoices?.length === 0 && (
            <tr>
              <td colSpan={7} style={{ border: "none" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "2rem",
                  }}
                >
                  <span
                    style={{
                      textAlign: "center",
                      color: "red",
                      marginTop: "0rem",
                      fontWeight: "500",
                      fontSize: "1.05rem",
                    }}
                  >
                    No Invoice to show!
                  </span>
                </div>
              </td>
            </tr>
          )}

          {!isLoading &&
            invoices?.map((item) => (
              <tr key={item._id} ref={pdfRef}>
                <td>{item.caseId}</td>
                <td>
                  {item.phase1.name
                    ? item.phase1.name
                    : item.phase1.fullNameAsPassport}
                </td>
                <td>{item.phase1.applicationType}</td>
                <td>{item.caseWorkerName ? item.caseWorkerName : "Admin"}</td>
                <td>{moment(item.phase3.dateTime).format("dddd, MMMM Do")}</td>
                <td>{item.phase3.cost}</td>
                <td>{item.phase3.isPaid ? "Paid" : "Pending"}</td>
                <td>
                  {item?.phase3?.isOnlinePayment ? (
                    <Link
                      to={item?.phase3?.onlinePaymentEvidence}
                      target="_blank"
                    >
                      <i
                        className="fa fa-download clickable green-icon"
                        style={{ fontSize: "15pt" }}
                        aria-hidden="true"
                      ></i>
                    </Link>
                  ) : (
                    <Link
                      to={`${import.meta.env.VITE_IMG_URI}${
                        item?.phase3?.paymentEvidence
                      }`}
                      target="_blank"
                    >
                      <i
                        className="fa fa-download clickable green-icon"
                        style={{ fontSize: "15pt" }}
                        aria-hidden="true"
                      ></i>
                    </Link>
                  )}
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
}

export default Billing