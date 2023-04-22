import mongoose from "mongoose";
const {Schema } = mongoose;
const notesSchema = new Schema({
    title: String,
    location: {
        type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
        },
        coordinates: {
        type: [Number],
        required: true
        }
    },
    note: String,
    user_id: ObjectId,
    created_at: Date,
});

module.exports = mongoose.model('notes', notesSchema)