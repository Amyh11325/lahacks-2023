const express = require('express'); 
const noteRouter = express.Router();
const Note = require('../models/notes'); 

noteRouter.get('/', async (req, res) => {
	const notes = await Note.find({})
    res.status(200).json({ success: true, data: notes });
})

noteRouter.post("/", async (req, res) => {
  try {
    const { title, location, note, user_id, created_at } = req.body;
    const newNote = new Notes({
      title,
      location,
      note,
      user_id,
      created_at,
    });
    await newNote.save();
    res.status(201).send(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = noteRouter