const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createMedia,
  getMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
} = require("../controllers/mediaController");

// Public routes
router.get("/", getMedia);
router.get("/:id", getMediaById);

// Admin routes
router.post("/", protect, upload.single("mediaFile"), createMedia);
router.put("/:id", protect, upload.single("mediaFile"), updateMedia);
router.delete("/:id", protect, deleteMedia);

module.exports = router;