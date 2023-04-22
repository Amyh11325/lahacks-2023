const config = require("./utils/config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("express-async-errors");

const app = express();
mongoose.connect(config.MONGO_URI);
app.use(cors());
app.use(express.json());

module.exports = app;
