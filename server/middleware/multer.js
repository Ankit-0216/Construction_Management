const multer = require("multer");

//specify the storage engine of multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); // Set the destination folder for uploaded files
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Set the filename for the uploaded file
  },
});

//file validation
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    //prevent the upload
    cb({ message: "Unsupported File Format" }, false);
  }
};

//Create the multer middleware with the specified configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: fileFilter, // Specify the file validation function
});

module.exports = upload; // Export the multer middleware
