import React, { useEffect, useState } from "react";
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";
import "../style/prescreening.css";
import addqueue from "../assests/Add-application-icon.svg";
import addprofile from "../assests/add-group-icon.svg";
import books from "../assests/view-report-icon.svg";
import link from "../assests/Link-company-icon.svg";
import Message from "./Messagechatbox";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  useAddNotesMutation,
  useGetAllApplicationsQuery,
  useGetApplicationDataByIdQuery,
} from "../services/api/applicationApi";
import { format } from "date-fns";
import moment from "moment";
import {
  useAssignApplicationToCaseWorkerMutation,
  useGetCaseWorkerQuery,
} from "../services/api/caseworkerApi";
import { toastError, toastSuccess } from "./Toast";
import { useMemo } from "react";
import { useContext } from "react";
import MainContext from "./Context/MainContext";
import Loader from "./Loader";
import { useUpdateServiceMutation } from "../services/api/adminApi";
import Rejectpopup from "./Rejectpopup";
import { useReadMessagesByChatMutation } from "../services/api/chatApi";
import { useSelector } from "react-redux";
import { GiConfirmed } from "react-icons/gi";
import FinalConfirmationModal from "./FinalConfirmationModal";

const Prescreening = () => {
  const { socket } = useContext(MainContext);
  const { user } = useSelector((state) => state.user);
  const { isCaseWorker } = user ? user : "";
  const navigate = useNavigate();
  const [isReject, setIsReject] = useState(false);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [selectedCaseWorker, setSelectedCaseWorker] = useState({
    caseWorkerId: "",
    caseWorkerName: "",
  });

  const [getData, setGetData] = useState();

  const { applicationId } = useParams();

  const {
    data,
    refetch,
    isLoading: isLoadingApplication,
  } = useGetApplicationDataByIdQuery(applicationId);
  const { data: caseworkers } = useGetCaseWorkerQuery();

  const [assignApplicationToCaseWorker, res] =
    useAssignApplicationToCaseWorkerMutation();
  const { error, isSuccess, isLoading: assignCaseWorkerLoading } = res;

  const [addNotes, result] = useAddNotesMutation();
  const { isLoading } = result;

  const [updateService, updateRes] = useUpdateServiceMutation();
  const { isLoading: updateLoading } = updateRes;

  const [selectedCaseWorkerName, setSelectedCaseWorkerName] = useState(
    data?.application?.caseWorkerName
  );
  const [selectedApplicationType, setSelectedApplicationType] = useState(
    data?.application?.phase1?.applicationType
  );
  const [showSave, setShowSave] = useState(false);

  const { data: notesData } = useGetAllApplicationsQuery();

  useEffect(() => {
    if (data?.application?.caseWorkerName) {
      setSelectedCaseWorkerName(data.application.caseWorkerName);
    }
  }, [data]);

  useEffect(() => {
    if (data?.application) {
      setSelectedApplicationType(data?.application?.phase1?.applicationType);
    }
  }, [data]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleSubmit = async () => {
    if (name === "" || notes === "") {
      toastError("Please enter notes details");
      return;
    }
    const { data } = await addNotes({
      name: name,
      content: notes,
      applicationId: applicationId,
    });
    console.log("data", data);
    console.log("Result", result);
    if (data?.success) {
      toastSuccess("Notes Added Successfully");
      setName("");
      setNotes("");
    }
  };

  const handleCancel = () => {
    setName("");
    setNotes("");
  };

  const handleSelectChange = (e) => {
    const selectedName = e.target.value;
    const selectedId = e.target.selectedOptions[0].getAttribute("data-id");
    setSelectedCaseWorker({
      caseWorkerId: selectedId,
      caseWorkerName: selectedName,
    });
    setSelectedCaseWorkerName(selectedName);
  };

  const handleSelectApplicationType = (e) => {
    const selectedName = e.target.value;
    setSelectedApplicationType(selectedName);
    setTimeout(() => {
      setShowSave(true);
    }, 500);
  };

  const handleAssignCaseWorker = async () => {
    if (
      selectedCaseWorker.caseWorkerName === "" ||
      selectedCaseWorker.caseWorkerId === ""
    ) {
      toastError("Please Select Case Worker to assign");
      return;
    }
    const { data: res } = await assignApplicationToCaseWorker({
      applicationId: applicationId,
      caseWorkerId: selectedCaseWorker.caseWorkerId,
      caseWorkerName: selectedCaseWorker.caseWorkerName,
    });

    if (res.success) {
      console.log("Assigned data", res?.data);
      socket.emit("send noti to caseworker", {
        userId: data?.application?.userId,
        applicationId: applicationId,
        phase: data?.application?.phase,
        phaseSubmittedByClient: data?.application?.phaseSubmittedByClient,
        caseWorkerId: selectedCaseWorker.caseWorkerId,
      });
    }
  };

  useMemo(() => {
    if (error) {
      toastError(error?.data?.message);
    }
  }, [error]);

  useMemo(() => {
    if (isSuccess) {
      toastSuccess("Case Worker Assigned");
    }
  }, [isSuccess]);

  useMemo(() => {
    if (result?.data?.error) {
      toastError(result?.data?.error?.data?.message);
    }
  }, [error]);

  const birthDate = data
    ? format(new Date(data?.application?.phase1?.birthDate), "yyyy-MM-dd")
    : "";

  useEffect(() => {
    socket.on("phase data received", async (request) => {
      if (request) {
        console.log("Request Result", request);
        setGetData(request?.result);
      }
    });
  }, [getData]);

  useEffect(() => {
    if (getData) {
      refetch();
    }
  }, [getData]);

  const handleUpdateService = async () => {
    const { data: response } = await updateService({
      applicationId: applicationId,
      applicationType: selectedApplicationType,
    });

    if (response.success) {
      refetch();
    }
  };

  return (
    <div className="prescreening-container">
      {isReject && (
        <Rejectpopup
          applicationId={applicationId}
          show={isReject}
          setShow={setIsReject}
        />
      )}

      {/* Final Confirmation Modal  */}
      <FinalConfirmationModal
        confirmationModal={confirmationModal}
        setConfirmationModal={setConfirmationModal}
        applicationId={applicationId}
        userId={data?.application?.userId}
      />

      <SideNavbar />
      <div style={{ marginLeft: "11.8rem" }}>
        <TopNavbar />
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2
              className="changepassword-profile-heading"
              style={{ marginTop: 15 }}
            >
              Pre-Screening
            </h2>

            <div class="Pre-screening-texts">
              <div class="four-routes-image">
                <NavLink
                  style={{ paddingRight: 10, paddingLeft: 10 }}
                  to={`/add/phase1`}
                >
                  <div className="add-to-q-img">
                    {" "}
                    <img src={addqueue} alt="" className="add-to-queue" />{" "}
                    <p className="add-app-text">Add Application</p>{" "}
                  </div>
                </NavLink>

                <NavLink
                  style={{ paddingRight: 10, paddingLeft: 10 }}
                  to={`/report/${applicationId}`}
                >
                  <div className="books-img">
                    {" "}
                    <img src={books} alt="" className="books" />
                    <p className="add-report-text">View Report</p>{" "}
                  </div>
                </NavLink>
                <NavLink
                  style={{ paddingRight: 10, paddingLeft: 10 }}
                  to={`/admin/linkcompany/${applicationId}`}
                >
                  <div className="link-img">
                    {" "}
                    <img src={link} alt="" className="link-company" />
                    <p className="add-company-text">Link Company</p>{" "}
                  </div>
                </NavLink>

                {/* Final Authority Confirmation Button  */}
                {data?.application?.phase === 4 &&
                  data?.application?.phaseStatus === "approved" &&
                  !data?.application?.finalConfirmation && (
                    <div
                      style={{
                        paddingRight: 10,
                        paddingLeft: 10,
                        cursor: "pointer",
                      }}
                      onClick={() => setConfirmationModal(true)}
                    >
                      <div className="link-img">
                        {" "}
                        <GiConfirmed
                          style={{ fontSize: "1.1rem", color: "#fff" }}
                        />
                        <p className="add-company-text">Confirm Application</p>{" "}
                      </div>
                    </div>
                  )}

                {data?.application?.isManual &&
                  data?.application?.phase < 4 && (
                    <NavLink
                      style={{ paddingRight: 10, paddingLeft: 10 }}
                      to={`/add/phase1/filled/${applicationId}`}
                    >
                      <div
                        className="link-img"
                        style={{
                          left: "51rem",
                          padding: "0",
                          margin: "0",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <p
                          style={{
                            color: "#fff",
                            textAlign: "center",
                            margin: "0",
                          }}
                        >
                          Resume
                        </p>
                      </div>
                    </NavLink>
                  )}
                {showSave && (
                  <button
                    className="link-img"
                    style={{
                      left: "51rem",
                      padding: "0",
                      margin: "0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={handleUpdateService}
                  >
                    {updateLoading ? (
                      <Loader />
                    ) : (
                      <p
                        style={{
                          color: "#fff",
                          textAlign: "center",
                          margin: "0",
                        }}
                      >
                        Save Changes
                      </p>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 25,
              marginTop: 20,
            }}
          >
            <div className="preescreen-form-main">
              <div className="preescreen-form">
                <button
                  onClick={() => setIsReject(true)}
                  className="reject-btn"
                >
                  Reject Application
                </button>
                <form>
                  <div className="nationalty-input">
                    <p className="phase-1-nationalty">Select Service</p>

                    <select
                      placeholder="Select Country"
                      className="Select-service-input form-select"
                      value={selectedApplicationType}
                      onChange={handleSelectApplicationType}
                    >
                      {/* <option value="">Service</option> */}
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
                      <option value="Immigration Matter">
                        Immigration Matter
                      </option>
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
                  <div className="Id-input">
                    <p className="Id-label">ID Number</p>
                    <input
                      className="Text-input"
                      type="text"
                      placeholder="1234567890"
                      disabled={true}
                      value={data?.application?.caseId}
                    />
                  </div>
                  <div className="Name-input-2">
                    <p className="Name-label-2">Name</p>
                    <input
                      className="Name-3"
                      type="text"
                      placeholder="John Leo"
                      disabled={true}
                      value={data?.application?.phase1?.name}
                    />
                  </div>
                  <div className="email-main-2">
                    <p className="email-label-2">Email</p>
                    <input
                      className="email-4"
                      type="email"
                      placeholder="email@email.com"
                      disabled={true}
                      value={data?.application?.phase1?.email}
                    />
                  </div>
                  <div className="contact-input-5">
                    <p className="contact-label-2">Contact</p>
                    <input
                      className="contact-3"
                      type="tel"
                      placeholder="(485)-845-8542658"
                      disabled={true}
                      value={`+${data?.application?.phase1?.contact}`}
                    />
                  </div>
                  <div className="date-of-birth-2">
                    <p className="Dob-label-2">Date of Birth</p>
                    <input
                      className="calender-6"
                      type="date"
                      placeholder=""
                      disabled={true}
                      value={birthDate}
                    />
                  </div>
                  <div className="dependents-input">
                    <p className="dependents-label">Country</p>
                    <input
                      className="dependents-2"
                      type="text"
                      placeholder="Country"
                      disabled={true}
                      value={`${data?.application?.phase1?.country}`}
                    />
                  </div>
                </form>
                <NavLink
                  to={
                    data?.application?.isManual
                      ? `/add/phase1/filled/${applicationId}`
                      : `/admin/phase1/${applicationId}`
                  }
                >
                  <p className="veiw-information-text">
                    View Detail Information
                  </p>
                </NavLink>
              </div>
              <div className="preescreen-form-second">
                <table className="Table-2">
                  <thead>
                    <tr className="Table-heading-2">
                      <td>Application Type </td>
                      <td>Date Created</td>
                      <td>Case Owner</td>
                      <td>Date Completed</td>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.application?.service?.map((service, index) => {
                      if (index == 0) {
                        return (
                          <tr key={service._id} className="Table-heading-2">
                            <td>{service.serviceType}</td>
                            <td>
                              {data
                                ? format(
                                    new Date(service.dateTime),
                                    "yyyy-MM-dd"
                                  )
                                : ""}
                            </td>
                            <td>
                              {data?.application?.caseWorkerName
                                ? data?.application?.caseWorkerName
                                : "Admin"}
                            </td>
                            <td style={{ textTransform: "capitalize" }}>
                              {data?.application?.applicationStatus}
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>

              {/* Diplay all the notes section  */}
              <div className="display-notes">
                {data?.application?.notes.length > 0 &&
                  data?.application?.notes
                    ?.slice()
                    .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
                    .map((note) => (
                      <div key={note._id} className="notes-section-display">
                        <div className="notes-item">
                          <div className="notes-item-inner">
                            <div className="left-note">
                              <span>Name</span>
                              <span>{note.name}</span>
                            </div>
                          </div>
                          <div className="notes-item-inner">
                            <div className="left-note">
                              <span>Notes</span>
                              <span>{note.content}</span>
                            </div>
                          </div>
                          <div className="notes-item-inner">
                            <div className="left-note">
                              <span>Created at</span>
                              <span>
                                {moment(note.dateTime).format(
                                  "dddd, MMMM D, hh:mm a"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
              <div className="preescreen-form-third">
                <p className="Notes-heading">Notes</p>
                <div className="Notes-section">
                  <form>
                    <div className="borderline-notes-2"></div>
                    <div className="Name-notes">
                      <p className="Name-notes">Name</p>
                      <input
                        className="Name-4"
                        type="text"
                        placeholder="John Leo"
                        value={name}
                        onChange={handleNameChange}
                      />
                    </div>
                    <div className="Borderline-notes"></div>
                    <div className="Notes-1">
                      <p className="Notes-text">Notes</p>
                      <input
                        className="Notes-input"
                        type="text"
                        placeholder="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, "
                        value={notes}
                        onChange={handleNotesChange}
                      />
                    </div>
                  </form>
                </div>

                <button
                  style={{ cursor: "pointer" }}
                  className="Submit-btn"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Submit.." : "Submit"}
                </button>
                <button
                  style={{ cursor: "pointer" }}
                  className="Cancel-btn-2"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
            <div className="case-worker-selector">
              <p className="Case-worker-slector-heading">Case Worker</p>
              <div className="caseworker-selector-input">
                <select
                  className="case-selctor form-select"
                  value={selectedCaseWorkerName}
                  onChange={handleSelectChange}
                  disabled={isCaseWorker}
                >
                  <option value={""}>Select Case Worker</option>
                  {caseworkers?.caseWorker?.map((item) => (
                    <option
                      key={item._id}
                      value={item.name}
                      data-id={item.userId}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAssignCaseWorker}
                  disabled={isCaseWorker}
                >
                  {assignCaseWorkerLoading ? (
                    <Loader color={"#5D982E"} />
                  ) : (
                    "Assign"
                  )}
                </button>
              </div>
              {applicationId && <Message applicationId={applicationId} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescreening;
