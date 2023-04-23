const express = require('express'); 
const noteRouter = express.Router();
const Note = require('../models/notes'); 
const User = require('../models/users');
const jwt = require('jsonwebtoken');


noteRouter.get('/', async (req, res) => {
  // await Note.deleteMany({})
	const notes = await Note.find({})
    res.status(200).json({ success: true, data: notes });
})


//bearer authentication  
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

noteRouter.post("/", async (req, res) => {

  try {
    const body = req.body;
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    
    const newNote = new Note({
      title: body.title,
      location: body.location,
      content: body.content,
      user_id: body._id,
      date_created: body.date_created,
    });
    console.log(newNote)

    savedNote = await newNote.save();
    
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    res.status(201).send(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = noteRouter