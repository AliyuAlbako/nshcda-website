const multer = require("multer");


// Store files in memory for Cloudinary upload
const storage = multer.memoryStorage();


// Allow supported document types
const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    "application/pdf",

    "application/msword",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    "application/vnd.ms-excel",

    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];


  if (allowedTypes.includes(file.mimetype)) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Only PDF, Word, and Excel documents are allowed."
      ),
      false
    );

  }

};


// Maximum file size: 20MB
const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});


module.exports = upload;