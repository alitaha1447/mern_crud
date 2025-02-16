const multer = require('multer');

// Configure multer storage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage: storage });

module.exports = {  upload };
