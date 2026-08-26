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


/**
 * Delete CV from Cloudinary
 */
const deleteCV = async (publicId) => {
    if (!publicId) {
        return;
    }

    return await cloudinary.uploader.destroy(publicId, {
        resource_type: "raw",
    });
};

//  document upload support, Upload publication document

/**
 * Upload Publication Document to Cloudinary
 */
const uploadPublicationDocument = async (
  file,
  title
) => {
  return new Promise((resolve, reject) => {

    // Preserve original extension
    const extension = path.extname(
      file.originalname
    );

    // Clean title for filename
    const cleanTitle = title
      .replace(/[^a-zA-Z0-9]/g, "-")
      .replace(/-+/g, "-")
      .toLowerCase();

    // Generate unique filename
    const publicId = `${cleanTitle}_${uuidv4()}${extension}`;

    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder: "nshcda/publications",

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
// delete document

const deletePublicationDocument = async (
  publicId
) => {
  try {
    await cloudinary.uploader.destroy(
      publicId,
      {
        resource_type: "raw",
      }
    );

  } catch (error) {
    console.error(
      "Cloudinary Publication Delete Error:",
      error
    );

    throw error;
  }
};

/**
 * Upload News & Highlight Thumbnail
 */
/**
 * Upload News & Highlight Thumbnail
 */
const uploadNewsHighlightThumbnail = async (
  file,
  title
) => {
  return new Promise((resolve, reject) => {

    const publicId =
      `${Date.now()}-${title}`
        .replace(/[^a-zA-Z0-9]/g, "-")
        .toLowerCase();


    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder: "nshcda/news-highlights",

          resource_type: "image",

          public_id: publicId,

          overwrite: false,
        },

        (error, result) => {

          if (error) {

            console.error(
              "Cloudinary News/Highlight Upload Error:",
              error
            );

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


/**
 * Delete News & Highlight Thumbnail
 */
const deleteNewsHighlightThumbnail = async (
  publicId
) => {
  try {

    if (!publicId) {
      return;
    }

    await cloudinary.uploader.destroy(
      publicId,
      {
        resource_type: "image",
      }
    );

  } catch (error) {

    console.error(
      "Cloudinary News/Highlight Delete Error:",
      error
    );

    throw error;
  }
};


/**
 * Upload Publication Cover Image
 */
const uploadPublicationCoverImage = async (
  file,
  title
) => {
  return new Promise((resolve, reject) => {

    // Clean title for filename
    const cleanTitle = title
      .replace(/[^a-zA-Z0-9]/g, "-")
      .replace(/-+/g, "-")
      .toLowerCase();


    // Generate unique filename
    const publicId =
      `cover-${cleanTitle}-${uuidv4()}`;


    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder: "nshcda/publications/covers",

          resource_type: "image",

          public_id: publicId,

          overwrite: false,
        },

        (error, result) => {

          if (error) {

            console.error(
              "Cloudinary Publication Cover Upload Error:",
              error
            );

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


/**
 * Delete Publication Cover Image
 */
const deletePublicationCoverImage = async (
  publicId
) => {
  try {

    if (!publicId) {
      return;
    }


    await cloudinary.uploader.destroy(
      publicId,
      {
        resource_type: "image",
      }
    );

  } catch (error) {

    console.error(
      "Cloudinary Publication Cover Delete Error:",
      error
    );

    throw error;
  }
};


module.exports = {
  uploadCV,
  deleteCV,

  uploadPublicationDocument,
  deletePublicationDocument,

  uploadPublicationCoverImage,
  deletePublicationCoverImage,

  uploadNewsHighlightThumbnail,
  deleteNewsHighlightThumbnail,
};