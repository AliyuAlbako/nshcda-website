const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  createPublication,
  getPublications,
  getAdminPublications,
  getPublication,
  updatePublication,
  deletePublication,
} = require("../controllers/publicationController");

const upload = require("../middleware/uploadPublication");

const router = express.Router();


// =====================================================
// PUBLIC ROUTES
// =====================================================

// Get published publications only
router.get(
  "/",
  getPublications
);


// =====================================================
// ADMIN ROUTES
// =====================================================

// Get all publications including Drafts
router.get(
  "/admin/all",
  protect,
  getAdminPublications
);


// Create publication
router.post(
  "/",
  protect,
  upload.fields([
    {
      name: "document",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  createPublication
);

// Get single publication
router.get(
  "/:id",
  protect,
  getPublication
);


// Update publication
router.put(
  "/:id",
  protect,
  upload.fields([
    {
      name: "document",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  updatePublication
);

// Delete publication
router.delete(
  "/:id",
  protect,
  deletePublication
);


module.exports = router;