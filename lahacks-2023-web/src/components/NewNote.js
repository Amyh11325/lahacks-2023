import React from "react";
import { useState } from "react";

import '../styles/newnote.css'

const NewNote = ({setNoteToggle, setFormData, setButtonPressed}) => {
  const [notes, setNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    console.log("Submitted ", notes)
    setFormData(notes);
    setButtonPressed(true);
    setNote("");
    setNoteToggle(false);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  return (
    <div id="formholder">
      <div id="newnote">
        <h1 className="robotoheavy">New note</h1>
        <p className="robotolight">Add a new note describing this location.</p>
        <textarea
          id="newinput"
          type="text"
          className="robotomedium"
          value={notes}
          onChange={handleNoteChange}
        />
        <div id="inputbuttons" classNae="robotomedium">
          <button className="formbutton robotomedium" onClick={addNote}>
            Save
          </button>
          <button
            className="formbutton robotomedium"
            onClick={() => setNoteToggle(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewNote; 
