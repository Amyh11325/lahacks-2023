const config = require("./utils/config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("express-async-errors");

const notesRouter = require("./controllers/notes");
const usersRouter = require('./controllers/users')

const app = express();
mongoose.connect(config.MONGO_URI);
app.use(cors());
app.use(express.json())

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)




app.use(express.json());

module.exports = app;
