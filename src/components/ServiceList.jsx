import React, { useRef, useState } from 'react';
import SideNavbar from './SideNavbar';
import TopNavbar from './TopNavbar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../style/CompanyList.css';

import sponserimg from '../assests/sponserr-img.png';
import certificateimg  from "../assests/certificate-img.png"
import certificatestudes from "../assests/certifacte-studies-img.png"
import clerance from "../assests/clearnce-img.png"
import leaveremain from "../assests/leave-remain-img.png"
import indefinite from "../assests/indefinite-img.png"
import naturalisation from "../assests/naturalisation-img.png"
import eues from "../assests/eeus-img.png"
import { toastError } from './Toast';

const ServiceList = () => {
  const {companyId} = useParams();
  const navigate = useNavigate();
  const [serviceType, setServiceType] = useState();

  const handleNext = () => {
    if (serviceType === "" || !serviceType) {
      toastError("Please Select Service Type");
      return;
    }
    navigate(`/groupadminphase1/${companyId}/${serviceType}`);
  };

    return (
      <div className="comapnayprofile-main-container">
        <div className="Addcompany-Topnavbar-client-profile-2">
          <TopNavbar />
        </div>

        <SideNavbar />

        <h2 className="addcompany-profile-heading">Select Group</h2>

        <div className="AddingcompanyList-sub-container">
          <div className="button-company-screen">
            <button
              type="button"
              onClick={handleNext}
              className="Next-btn-company-screen"
            >
              Next
            </button>
          </div>
          <div className="Main-title-heading">
            <p className="starts-new-client-heading">
              STARTS A NEW CLIENT PROFILE UNDER THE GROUP
            </p>
          </div>

          <div className="company-box-1">
            <Link to={"#"} onClick={() => setServiceType("Sponsor License")}>
              <div className="profile-box-1">
                <Link
                  to={"#"}
                  onClick={() => setServiceType("Sponsor License")}
                >
                  <div
                    className="sponser-li"
                    style={
                      serviceType === "Sponsor License"
                        ? { border: "1.5px solid #5d982e" }
                        : {}
                    }
                  >
                    <img src={sponserimg} alt="" className="company-imgss-1" />
                  </div>

                  <div className="title-space">
                    <p className="company-titles-1">Sponsor License</p>
                  </div>
                </Link>
              </div>
            </Link>

            <Link
              to={"#"}
              onClick={() => setServiceType("Certificate of Sponsorship")}
            >
              <div className="profile-box-2">
                <div
                  className="sponser-li-2"
                  style={
                    serviceType === "Certificate of Sponsorship"
                      ? { border: "1.5px solid #5d982e" }
                      : {}
                  }
                >
                  <img
                    src={certificateimg}
                    alt=""
                    className="company-imgss-2"
                  />
                </div>

                <div className="title-space-2">
                  <p className="company-titles-2">Certificate of Sponsorship</p>
                </div>
              </div>
            </Link>

            <Link
              to={`#`}
              onClick={() =>
                setServiceType("Certificate of Acceptance of Studies")
              }
            >
              <div className="profile-box-3">
                <div
                  className="sponser-li-3"
                  style={
                    serviceType === "Certificate of Acceptance of Studies"
                      ? { border: "1.5px solid #5d982e" }
                      : {}
                  }
                >
                  <img
                    src={certificatestudes}
                    alt=""
                    className="company-imgss-3"
                  />
                </div>

                <div className="title-space-3">
                  <p className="company-titles-3">
                    Certificate of Acceptance of Studies
                  </p>
                </div>
              </div>
            </Link>

            <Link to={`#`} onClick={() => setServiceType("Entry Clearance")}>
              <div className="profile-box-4">
                <div
                  className="sponser-li-4"
                  style={
                    serviceType === "Entry Clearance"
                      ? { border: "1.5px solid #5d982e" }
                      : {}
                  }
                >
                  <img src={clerance} alt="" className="company-imgss-4" />
                </div>

                <div className="title-space-4">
                  <p className="company-titles-4">Entry Clearance</p>
                </div>
              </div>
            </Link>

            <Link to={`#`} onClick={() => setServiceType("Leave to Remain")}>
              <div className="profile-box-1">
                <div
                  className="sponser-li"
                  style={
                    serviceType === "Leave to Remain"
                      ? { border: "1.5px solid #5d982e" }
                      : {}
                  }
                >
                  <img src={leaveremain} alt="" className="company-imgss-5" />
                </div>

                <div className="title-space">
                  <p className="company-titles-5">Leave to Remain</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="company-box-2">
            <Link
              to={`#`}
              onClick={() => setServiceType("Indefinite Leave to Remain")}
            >
              <div className="profile-box-2">
                <div
                  className="sponser-li-2"
                  style={
                    serviceType === "Indefinite Leave to Remain"
                      ? { border: "1.5px solid #5d982e" }
                      : {}
                  }
                >
                  <img src={indefinite} alt="" className="company-imgss-6" />
                </div>

                <div className="title-space-2">
                  <p className="company-titles-6">Indefinite Leave to Remain</p>
                </div>
              </div>
            </Link>

            <Link to={`#`} onClick={() => setServiceType("Naturalisation")}>
              <div className="profile-box-3">
                <div
                  className="sponser-li-3"
                  style={
                    serviceType === "Naturalisation"
                      ? { border: "1.5px solid #5d982e" }
                      : {}
                  }
                >
                  <img
                    src={naturalisation}
                    alt=""
                    className="company-imgss-7"
                  />
                </div>

                <div className="title-space-3">
                  <p className="company-titles-7">Naturalisation</p>
                </div>
              </div>
            </Link>

            <Link to={`#`} onClick={() => setServiceType("EEUS Settlement")}>
              <div className="profile-box-4">
                <div
                  className="sponser-li-4"
                  style={
                    serviceType === "EEUS Settlement"
                      ? { border: "1.5px solid #5d982e" }
                      : {}
                  }
                >
                  <img src={eues} alt="" className="company-imgss-8" />
                </div>

                <div className="title-space-4">
                  <p className="company-titles-8">EEUS Settlement</p>
                </div>
              </div>
            </Link>
            <Link to={`#`}>
              <div className="profile-box-1">
                <div
                  className="sponser-li"
                  onClick={() => toastError("Select other from dropdown below")}
                >
                  <img src={leaveremain} alt="" className="company-imgss-5" />
                </div>

                <select
                  className="title-space-option"
                  onChange={(e) => setServiceType(e.target.value)}
                >
                  <option value="">Others</option>
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

                {/* <div className="title-space">
                  <p className="company-titles-5">Others</p>
                </div> */}
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
}

export default ServiceList;