const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.notes = require("./notes.js");
db.user = require("./user.js");


module.exports = db;