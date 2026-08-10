const express = require("express");
const protect = require("../middleware/authMiddleware");


const {
  createEmploymentProfile,
  getEmploymentProfiles,
  getEmploymentProfile,
  updateEmploymentProfile,
  deleteEmploymentProfile,
  getEmploymentProfileCount,
} = require("../controllers/employmentProfileController");

const upload = require("../middleware/uploadCV");

const router = express.Router();

// ================= Employment Profile Statistics =================
router.get("/stats/count", getEmploymentProfileCount);

// ================= Create & Get All Profiles =================
router
  .route("/")
  .post(
    upload.single("cv"),
    createEmploymentProfile
  )
  .get(getEmploymentProfiles);

// ================= Get, Update & Delete Single Profile =================
router
    .route("/:id")
    .get(getEmploymentProfile)
    .put(updateEmploymentProfile)
    .delete(protect, deleteEmploymentProfile);

module.exports = router;