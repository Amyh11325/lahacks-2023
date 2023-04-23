const express = require('express'); 
const noteRouter = express.Router();
const Note = require('../models/notes'); 
const User = require('../models/users');

noteRouter.get('/', async (req, res) => {
	const notes = await Note.find({})
    res.status(200).json({ success: true, data: notes });
})

noteRouter.post("/", async (req, res) => {
  try {
    const { title, location, content, user_id, date_created } = req.body;
    const newNote = new Note({
      title,
      location,
      content,
      user_id,
      date_created,
    });
    savedNote = await newNote.save();
    
    const user = await User.findById(user_id)
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    res.status(201).send(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = noteRouter