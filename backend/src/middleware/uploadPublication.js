const multer = require("multer");


// ============================================
// STORE FILES IN MEMORY FOR CLOUDINARY
// ============================================

const storage = multer.memoryStorage();


// ============================================
// FILE FILTER
// ============================================

const fileFilter = (req, file, cb) => {

  // Document types
  const allowedDocumentTypes = [
    "application/pdf",

    "application/msword",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    "application/vnd.ms-excel",

    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];


  // Image types for publication cover
  const allowedImageTypes = [
    "image/jpeg",

    "image/jpg",

    "image/png",

    "image/webp",
  ];


  // ============================================
  // DOCUMENT
  // ============================================

  if (file.fieldname === "document") {

    if (
      allowedDocumentTypes.includes(
        file.mimetype
      )
    ) {

      return cb(null, true);

    }

    return cb(
      new Error(
        "Only PDF, Word, and Excel documents are allowed."
      ),
      false
    );

  }


  // ============================================
  // COVER IMAGE
  // ============================================

  if (file.fieldname === "coverImage") {

    if (
      allowedImageTypes.includes(
        file.mimetype
      )
    ) {

      return cb(null, true);

    }

    return cb(
      new Error(
        "Only JPG, PNG, and WEBP images are allowed for the cover."
      ),
      false
    );

  }


  // ============================================
  // INVALID FIELD
  // ============================================

  return cb(
    new Error(
      "Invalid upload field."
    ),
    false
  );

};


// ============================================
// MULTER CONFIGURATION
// ============================================

const upload = multer({

  storage,

  fileFilter,

  limits: {

    fileSize: 20 * 1024 * 1024,

  },

});


module.exports = upload;