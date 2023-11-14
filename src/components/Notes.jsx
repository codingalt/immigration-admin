import React, { useState } from "react";
import "../style/notes.css"
import SideNavbar from './SideNavbar'
import TopNavbar from './TopNavbar'
import Addnewnotes from "./Addnewnotes";
import { useGetAllApplicationsQuery } from "../services/api/applicationApi";

const Notes = () => {
    const [showAddNewNote1, setShowAddNewNote1] = useState(false);
    const [showAddNewNote2, setShowAddNewNote2] = useState(false);
    const [showAddNewNote3, setShowAddNewNote3] = useState(false);

    const [selectedNote, setSelectedNote] = useState();

    const {data} = useGetAllApplicationsQuery();
    console.log(data);

    const [applicationId, setApplicationId] = useState("")

    const handleCancel1 = () => {
        setShowAddNewNote1(false);
        setSelectedNote(null);
    };

    const handleSubmit = ()=>{
        setShowAddNewNote1(false);
    }
    return (
      <div className="Notes-main-container">
        <div className="topnavbar-prescreen">
          <TopNavbar />
        </div>
        <SideNavbar />
        <h2 className="Notes-text-5">Notes</h2>
        <div className="Notes-main-section">
          {data?.applications?.map((item) => (
            <div key={item._id} className="Notes-box-1">
              <div className="all-notes-data">
                <h4 className="Notes-name-text">Name</h4>
                <p className="Name-text-8">{item.phase1.name}</p>
                <h4 className="Notes-caseid-text">Case Id</h4>
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
                  <div key={note._id} className="dummy-data">
                    <p>{note.name}</p>
                    <p>
                      {note.content}
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
                  style={{cursor: 'pointer'}}
                    onClick={() => {setShowAddNewNote1(true); setSelectedNote(item); setApplicationId(item._id)}}
                    className="add-button"
                  >
                    Add Notes
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default Notes