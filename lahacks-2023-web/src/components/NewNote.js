import React from "react";
import { useState } from "react";

const NewNote = ({setNoteToggle, setFormData}) => {
  const [notes, setNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    console.log("Submitted ", notes)
    setFormData(notes);
    setNote("");
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <form onSubmit={addNote}>
        <input value={notes} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <button onClick={() => setNoteToggle(false)} >Cancel</button>
    </div>
  );
};

export default NewNote; 
