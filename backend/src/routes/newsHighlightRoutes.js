const express = require("express");

const protect = require("../middleware/authMiddleware");

const upload = require(
  "../middleware/uploadNewsHighlight"
);

const {
  createNewsHighlight,
  getNewsHighlights,
  getNewsHighlightBySlug,
  getNewsHighlightById,
  updateNewsHighlight,
  deleteNewsHighlight,
} = require(
  "../controllers/newsHighlightController"
);


const router = express.Router();


// ============================================
// PUBLIC ROUTES
// ============================================

// Get all published news & highlights
router.get(
  "/",
  getNewsHighlights
);


// Get single published item by slug
router.get(
  "/slug/:slug",
  getNewsHighlightBySlug
);


// ============================================
// ADMIN ROUTES
// ============================================

// Get single news/highlight item by ID
router.get(
  "/:id",
  protect,
  getNewsHighlightById
);


// Create news / highlight
router.post(
  "/",
  protect,
  upload.single("thumbnail"),
  createNewsHighlight
);


// Update news / highlight
router.put(
  "/:id",
  protect,
  upload.single("thumbnail"),
  updateNewsHighlight
);


// Delete news / highlight
router.delete(
  "/:id",
  protect,
  deleteNewsHighlight
);


module.exports = router;