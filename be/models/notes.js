const mongoose = require('mongoose');
const {Schema } = mongoose;

const notesSchema = new Schema({
  title: String,
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  note: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  created_at: Date,
});

module.exports = mongoose.model('notes', notesSchema)