import React from 'react'
import "../style/Addnewnotes.css"
import { useState } from 'react';
import { useAddNotesMutation } from '../services/api/applicationApi';
import { toastError, toastSuccess } from './Toast';
import { useMemo } from 'react';
import { useAddNotesGroupMutation } from '../services/api/companyClient';

const Addnewnotes = ({ onCancel, onSubmit, applicationId, item }) => {
  const handleCancel = () => {
    onCancel();
  };

  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  const [addNotes, result] = useAddNotesMutation();
  const { isLoading, error } = result;

  const [addNotesGroup, res] = useAddNotesGroupMutation();
  const { isLoading: isLoadingGroupNote, error: isGroupNoteError } = res;

  useMemo(() => {
    if (error) {
      toastError(error?.data?.message);
    }
  }, [error]);

  useMemo(() => {
    if (isGroupNoteError) {
      toastError(isGroupNoteError?.data?.message);
    }
  }, [isGroupNoteError]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };
  console.log("Selected Note", item);
  const handleSubmitNotes = async () => {
    if (name === "" || notes === "") {
      toastError("Please enter notes details");
      return;
    }

    if(item.phase1.fullNameAsPassport){
      const { data } = await addNotesGroup({
        name: name,
        content: notes,
        applicationId: applicationId,
      });
      console.log("hey data",data);
      if (data.success) {
        toastSuccess("Note Added Successfully");
        setName("");
        setNotes("");
        onSubmit();
      }
    }else{
          const { data } = await addNotes({
            name: name,
            content: notes,
            applicationId: applicationId,
          });

          if (data?.success) {
            toastSuccess("Note Added Successfully");
            setName("");
            setNotes("");
            onSubmit();
          }
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