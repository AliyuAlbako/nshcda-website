const express = require("express");

const {
    createEmploymentProfile,
    getEmploymentProfiles,
    getEmploymentProfile,
    updateEmploymentProfile,
    deleteEmploymentProfile,
} = require("../controllers/employmentProfileController");

const upload = require("../middleware/uploadCV");

const router = express.Router();

// Create & Get All Profiles
router
    .route("/")
    .post(
        upload.single("cv"),
        createEmploymentProfile
    )
    .get(getEmploymentProfiles);

// Get, Update & Delete Single Profile
router
    .route("/:id")
    .get(getEmploymentProfile)
    .put(updateEmploymentProfile)
    .delete(deleteEmploymentProfile);

module.exports = router;