const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");
const cloudinary=  require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "nshcda/cvs",
    resource_type: "raw",
  }),
});

const upload = multer({ storage });

module.exports = upload;