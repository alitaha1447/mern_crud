require("dotenv").config();
const express = require("express");
var cors = require("cors");
var multer = require("multer");
const app = express();
const apiRoute = require("./src/routes/index.route.js");

const connectDB = require("./src/config/config.js");
connectDB();

app.use(cors());
app.use(express.json());

app.use(express.static("./src/uploads"))
app.use("/api", apiRoute);

const PORT = 4000;

// image upload
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
//   },
// });

// var upload=multer({
//   storage:storage
// }).single('image')

app.get("/", (req, res) => {
  res.send("Machine Test");
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
