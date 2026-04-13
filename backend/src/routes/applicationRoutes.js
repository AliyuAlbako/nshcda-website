const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  submitApplication,
  getApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

router.post("/", upload.single("cv"), submitApplication);
router.get("/", getApplications);
router.patch("/:id/status", updateApplicationStatus);

module.exports = router;