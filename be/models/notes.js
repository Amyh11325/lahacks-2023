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
  content: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  date_created: Date,
});

module.exports = mongoose.model('notes', notesSchema)