const cloudinary = require("../config/cloudinary");

/**
 * Upload CV to Cloudinary
 */
const uploadCV = async (file) => {
    return new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "nshcda/employment-profiles/cvs",
                resource_type: "raw",
                use_filename: true,
                unique_filename: true,
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