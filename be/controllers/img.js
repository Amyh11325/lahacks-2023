const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();

router.post("/", upload.single("file"), async (req, res) => {
    console.log(req.file);
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:3001/file/${req.file.filename}`;
    return res.send(imgUrl);
});

// router.get("/file/:filename", async (req, res) => {
//     // try {
//     //     console.log("1");
//         const file = await gfs.files.findOne({ filename: req.params.filename });
//         const readStream = gfs.createReadStream(file.filename);
//         readStream.pipe(res);
//     // } catch (error) {
//     //     res.send(error);
//     // }
// });

module.exports = router;