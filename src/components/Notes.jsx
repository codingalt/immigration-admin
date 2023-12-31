import React, { useState } from "react";
import "../style/notes.css";
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";
import Addnewnotes from "./Addnewnotes";
import {
  useGetAllApplicationNotesQuery,
  useGetAllApplicationsQuery,
} from "../services/api/applicationApi";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import moment from "moment";

const Notes = () => {
  const [selectedNote, setSelectedNote] = useState();
  const [showAddNewNote1, setShowAddNewNote1] = useState();

  const { user } = useSelector((state) => state.user);

  const { data, isLoading } = useGetAllApplicationNotesQuery();
  console.log(data);

  const [applicationId, setApplicationId] = useState("");

  const handleCancel1 = () => {
    setShowAddNewNote1(false);
    setSelectedNote(null);
  };

  const handleSubmit = () => {
    setShowAddNewNote1(false);
  };

  // Define a variable to track whether any notes are found
  let notesFound = false;

  return (
    <div className="Notes-main-container">
      <div className="topnavbar-prescreen">
        <TopNavbar />
      </div>
      <SideNavbar />
      <h2 className="Notes-text-5">Notes</h2>
      <div className="Notes-main-section">
        {isLoading && (
          <div
            style={{
              marginTop: "4rem",
              display:"flex",
              justifyContent:"center"
            }}
          >
            <Loader color={"#5D982E"} width={35} />
          </div>
        )}

        {!isLoading &&
          data?.applications?.map((item) => {
            // Check if notes are present
            if (item.notes.length === 0) {
              // No notes found for this application
              return null;
            }

            // Notes found for this application
            notesFound = true; // Set the variable to true

            return (
              <div key={item._id} className="Notes-box-1">
                <div className="all-notes-data">
                  <h4 className="Notes-name-text">Name</h4>
                  <p className="Name-text-8">{item.phase1.name}</p>
                  <h4 className="Notes-caseid-text">Case Id </h4>
                  <p className="Number-text-4">{item.caseId}</p>
                  <h4 className="Notes-Application-text">Application Type</h4>
                  <p className="Set-lr-text-1">{item.phase1.applicationType}</p>
                  <h4 className="Notes-Apllication-status-text">
                    Apllication status
                  </h4>
                  <p className="Approved-text-1">
                    {item.applicationStatus === "approved"
                      ? "Approved"
                      : "Pending"}
                  </p>
                </div>
                <div className="all-textarea">
                  {item.notes?.map((note) => (
                    <div
                      key={note._id}
                      className="dummy-data"
                      style={{ position: "relative",paddingTop:"18px" }}
                    >
                      <p>{note.name}</p>
                      <p>{note.content}</p>
                      <p style={{position:"absolute",top:"7px",right:"20px",color:"#222",fontWeight:"500"}}>
                        {moment(note?.dateTime).format("dddd, MMMM D, hh:mm a")}
                      </p>
                    </div>
                  ))}

                  {selectedNote == item ? (
                    <Addnewnotes
                      onCancel={handleCancel1}
                      onSubmit={handleSubmit}
                      applicationId={applicationId}
                    />
                  ) : (
                    <button
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setShowAddNewNote1(true);
                        setSelectedNote(item);
                        setApplicationId(item._id);
                      }}
                      className="add-button"
                    >
                      Add Notes
                    </button>
                  )}
                </div>
              </div>
            );
          })}

        {!isLoading && !notesFound && (
          <p
            style={{
              color: "red",
              fontSize: "1rem",
              fontWeight: "500",
              textAlign: "center",
              marginTop: "3rem",
            }}
          >
            No Notes Found!
          </p>
        )}
      </div>
    </div>
  );
};

export default Notes;
