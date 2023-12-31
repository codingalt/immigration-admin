import React, { useState, useEffect, useMemo, useContext } from 'react';
import SideNavbar from './SideNavbar'
import editpen from "../assests/edit-pen.png"
import { Link,NavLink, useNavigate, useParams } from 'react-router-dom';
import "../style/Phase3.css"
import pdfimg from "../assests/pdf-img.png"
import Editimgapp from "../assests/Edit-file-img.svg"
import Approvedimgapp from "../assests/Approved-img.svg"
import Rejectimgapp from "../assests/Delete-File-img.svg"
import { useApprovePhase3Mutation, useGetApplicationDataByIdQuery } from '../services/api/applicationApi';
import { toastError, toastSuccess } from './Toast';
import Loader from './Loader';
import MainContext from './Context/MainContext';
import RejectGroup from './RejectGroup';
import Rejectpopup from './Rejectpopup';

const Phase3 = () => {
  const [isReject, setIsReject] = useState();
  const [companyId, setCompanyId] = useState();
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const {
    data,
    refetch,
    isLoading: isLoadingApplication,
  } = useGetApplicationDataByIdQuery(applicationId,{refetchOnMountOrArgChange: true});
  const app = data?.application;
  console.log("Application data", app);
    const { socket } = useContext(MainContext);
    const [received, setReceived] = useState();

    const [isPhaseApproved, setIsPhaseApproved] = useState(false);

    useEffect(()=>{
      if(data){
        if(data?.application?.phase === 3 && data?.application?.phaseStatus === "approved"){
          setIsPhaseApproved(false);
        }else{
          setIsPhaseApproved(true);
        }
      }
    },[data]);


    useEffect(() => {
        socket.on("phase data received", (phaseData) => {
          if (phaseData) {
            setReceived(phaseData);
            console.log("phase data received", phaseData);
          }
        });
      
    }, [received]);

    useEffect(()=>{
      if(received){
        refetch();
      }
    },[received]);

        const links = [
          { to: "/phase1", label: "Phase 1" },
          { to: "/prephase2", label: "Pre-Phase 2" },
          { to: "/phase2", label: "Phase 2" },
          { to: "/prephase3", label: "Pre-Phase 3" },
          { to: "/phase3", label: "Phase 3" },
          { to: "/phase4", label: "Phase 4" },
      
          // Add more links as needed
      ];
      
      const [activeLink, setActiveLink] = useState("/phase3");
      
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

        const [approvePhase3, result] = useApprovePhase3Mutation();
        const {
          isLoading: approveLoading,
          isSuccess: approveSuccess,
          error: approveErr,
        } = result;

        const handleApprove = async () => {
          await approvePhase3({ applicationId: applicationId });
        };

        useMemo(() => {
          if (approveErr) {
            toastError(approveErr?.data?.message);
          }
        }, [approveErr]);

        useMemo(() => {
          if (approveSuccess) {
            socket.emit("phase notification", {
              userId: app?.userId,
              applicationId: applicationId,
              phase: 3,
              phaseStatus: "approved",
              phaseSubmittedByClient: app?.phaseSubmittedByClient,
            });
            toastSuccess("Phase 3 Approved");
            handleLinkClick("/phase4");
            navigate(`/admin/prescreening/${applicationId}`);
          }
        }, [approveSuccess]);

        const handleDeclineRequest = (applicationId, item) => {
          if (app?.phase1.fullNameAsPassport) {
            setCompanyId(true);
          } else {
            setCompanyId(false);
          }
          setIsReject(true);
        };

    return (
      <div className="Phase-2-main-container">
        {companyId
          ? isReject && (
              <RejectGroup
                applicationId={applicationId}
                show={isReject}
                setShow={setIsReject}
              />
            )
          : isReject && (
              <Rejectpopup
                applicationId={applicationId}
                show={isReject}
                setShow={setIsReject}
              />
            )}
        <SideNavbar />
        <h2 className="Pre-screening-text">Pre-Screening</h2>
        <div className="Buttons-preescreening">
          {/* <button className="Edit-appliction-btn">
            Edit <img src={Editimgapp} alt="" />
          </button> */}

          {isPhaseApproved &&
            app?.phaseSubmittedByClient >= 3 &&
            app?.applicationStatus != "rejected" && (
              <>
                <button
                  disabled={approveLoading}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    opacity: approveLoading ? 0.55 : 1,
                  }}
                  onClick={handleApprove}
                  className="Approved-appliction-btn"
                >
                  {approveLoading ? <Loader /> : "Approve"}{" "}
                  <img src={Approvedimgapp} alt="" />
                </button>
                <button
                  disabled={approveLoading}
                  style={{ cursor: "pointer" }}
                  onClick={handleDeclineRequest}
                  className="Reject-appliction-btn"
                >
                  {" "}
                  Reject <img src={Rejectimgapp} alt="" />
                </button>
              </>
            )}
        </div>
        <img src={editpen} alt="" className="edit-pen" />
        <button
          disabled={approveLoading}
          onClick={() => navigate(`/admin/prescreening/${applicationId}`)}
          className="back-btn"
        >
          Back
        </button>

        <div className="phase-4-all-phase">
          {app?.phase >= 1 && (
            <NavLink
              to={`/admin/phase1/${applicationId}`}
              className={`link-hover-effect ${
                activeLink === "/phase1" ? "link-active" : ""
              }`}
              onClick={() => handleLinkClick("/phase1")}
              style={{ width: "2.9rem" }}
            >
              <span className="routes-all">Phase 1</span>
            </NavLink>
          )}
          {app?.phase1?.status === "approved" && (
            <NavLink
              to={`/admin/prephase2/${applicationId}`}
              className={`link-hover-effect ${
                activeLink === "/prephase2" ? "link-active" : ""
              }`}
              onClick={() => handleLinkClick("/prephase2")}
              style={{ width: "4.4rem" }}
            >
              <span className="routes-all">Pre-Phase 2</span>
            </NavLink>
          )}
          {app?.phaseSubmittedByClient >= 2 && (
            <NavLink
              to={`/admin/phase2/${applicationId}`}
              className={`link-hover-effect ${
                activeLink === "/phase2" ? "link-active" : ""
              }`}
              onClick={() => {
                handleLinkClick("/phase2");
              }}
              style={{ width: "2.9rem" }}
            >
              <span className="routes-all">Phase 2</span>
            </NavLink>
          )}
          {app?.phase2?.status === "approved" && (
            <NavLink
              to={`/admin/prephase3/${applicationId}`}
              className={`link-hover-effect ${
                activeLink === "/prephase3" ? "link-active" : ""
              }`}
              onClick={() => {
                handleLinkClick("/prephase3");
              }}
              style={{ width: "4.4rem" }}
            >
              <span className="routes-all">Pre-Phase 3</span>
            </NavLink>
          )}
          {app?.phase >= 3 && (
            <NavLink
              to={`/admin/phase3/${applicationId}`}
              className={`link-hover-effect ${
                activeLink === "/phase3" ? "link-active" : ""
              }`}
              onClick={() => {
                handleLinkClick("/phase3");
              }}
              style={{ width: "2.9rem" }}
            >
              <span className="routes-all">Phase 3</span>
            </NavLink>
          )}
          {app?.phaseSubmittedByClient > 3 && (
            <NavLink
              to={`/admin/phase4/${applicationId}`}
              className={`link-hover-effect ${
                activeLink === "/phase4" ? "link-active" : ""
              }`}
              onClick={() => {
                handleLinkClick("/phase4");
              }}
              style={{ width: "2.9rem" }}
            >
              <span className="routes-all">Phase 4</span>
            </NavLink>
          )}
        </div>

        <div className="phase-3">
          <p className="evidence-payement-text">Evidence of Payment*</p>
          {app?.phase3?.isOnlinePayment ? (
            <Link to={app?.phase3?.onlinePaymentEvidence} target="_blank">
              <div
                className="pdf-17"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Click here to open PDF</span>

                <img
                  style={{ marginRight: "15px" }}
                  src={pdfimg}
                  alt=""
                  className="pdf-icon"
                />
              </div>
            </Link>
          ) : (
            <Link
              to={`${import.meta.env.VITE_IMG_URI}${
                app?.phase3?.paymentEvidence
              }`}
              target="_blank"
            >
              <div className="pdf-17">
                Click here to open PDF
                <img src={pdfimg} alt="" className="pdf-icon" />
              </div>
            </Link>
          )}

          {/* <button className="Download-btn-2">Download</button> */}
        </div>
      </div>
    );
}

export default Phase3