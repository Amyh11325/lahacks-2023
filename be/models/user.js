const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
//   array of notes
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'
  }]
});

module.exports = mongoose.model('User', notesSchema)