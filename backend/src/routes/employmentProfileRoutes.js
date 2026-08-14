const express = require("express");
const protect = require("../middleware/authMiddleware");


const {
  createEmploymentProfile,
  getEmploymentProfiles,
  getEmploymentProfile,
  updateEmploymentProfile,
  deleteEmploymentProfile,
  getEmploymentProfileCount,
  getTalentPool,
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
  .get(protect, getEmploymentProfiles);

  // ================= Public Talent Pool =================
router.get("/talent-pool", getTalentPool);

// ================= Get, Update & Delete Single Profile =================
router
    .route("/:id")
    .get(protect, getEmploymentProfile)
    .put(protect, updateEmploymentProfile)
    .delete(protect, deleteEmploymentProfile);

module.exports = router;