const cloudinary = require("../config/cloudinary");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

/**
 * Upload CV to Cloudinary
 */
const uploadCV = async (file) => {
  return new Promise((resolve, reject) => {

    // Preserve the original extension (.pdf, .doc, .docx)
    const extension = path.extname(file.originalname);

    // Generate a unique filename
    const publicId = `cv_${uuidv4()}${extension}`;

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "nshcda/employment-profiles/cvs",

        resource_type: "raw",

        public_id: publicId,

        overwrite: false,
      },

      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          originalName: file.originalname,
          fileSize: file.size,
          fileType: file.mimetype,
        });
      }
    );

    uploadStream.end(file.buffer);

  });
};

module.exports = {
  uploadCV,
};