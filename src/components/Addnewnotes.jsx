import React from 'react'
import "../style/Addnewnotes.css"
import { useState } from 'react';
import { useAddNotesMutation } from '../services/api/applicationApi';
import { toastError, toastSuccess } from './Toast';
import { useMemo } from 'react';

const Addnewnotes = ({ onCancel, onSubmit, applicationId }) => {
  const handleCancel = () => {
    onCancel();
  };

  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  const [addNotes, result] = useAddNotesMutation();
  const { isLoading,error } = result;

  useMemo(() => {
    if (error) {
      toastError(error?.data?.message);
    }
  }, [error]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleSubmitNotes = async () => {
    if (name === "" || notes === "") {
      toastError("Please enter notes details");
      return;
    }
    console.log(applicationId);
    const { data } = await addNotes({
      name: name,
      content: notes,
      applicationId: applicationId,
    });
    console.log("data", data);
    console.log("Result", result);
    if (data?.success) {
      toastSuccess("Note Added Successfully");
      setName("");
      setNotes("");
      onSubmit();
    }
  };

  return (
    <div className="Addnewnotes">
      <div className="new-add-1">
        <div className="text-area-input-23">
          <p className="Name-text">Name</p>
          <div className="border-5"></div>
          <p className="Notes-text-45">Notes</p>
          <div className="border-1"></div>
          <input
            value={name}
            onChange={handleNameChange}
            type="text"
            placeholder="Jhon leo"
            className="jhon-name-input"
          />
          <textarea
            rows="4"
            cols="50"
            name="comment"
            form="usrform"
            className="textarea-1"
            value={notes}
            onChange={handleNotesChange}
          >
            Lorem ipsum dolor sit amen consectetur adipisicing elite. Culpa,
            vitae.
          </textarea>
          <button onClick={handleCancel} className="cncl-btn">
            Cancel
          </button>
          <button
            onClick={handleSubmitNotes}
            disabled={isLoading}
            className="submit-btn"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addnewnotes