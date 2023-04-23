const config = require("./utils/config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const upload = require("./controllers/img");
require("express-async-errors");

const notesRouter = require("./controllers/notes");
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')


const app = express();
const connect = mongoose.createConnection(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connect(config.MONGO_URI);

let gfs, gridfsBucket;
connect.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: 'photos'
  });
 
    gfs = Grid(connect.db, mongoose.mongo);
    gfs.collection('photos');
 })
app.use(cors());
app.use(express.json())

app.use("/api/img", upload);
app.get("/file/:filename", async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        res.send("not found");
    }
});

app.get("/metadatas", async (req, res) => {
    const cursor = gridfsBucket.find({});
    const docs = await cursor.toArray();
    const ids = docs.map((doc) => doc.filename);
    return res.json(ids);
});

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)




app.use(express.json());

module.exports = app;
