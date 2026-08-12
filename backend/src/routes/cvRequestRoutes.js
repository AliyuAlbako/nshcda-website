const express = require("express");

const {
  createCVRequest,
  getCVRequests,
  updateCVRequestStatus,
} = require("../controllers/cvRequestController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ============================================
// PUBLIC
// ============================================

router.post("/", createCVRequest);

// ============================================
// ADMIN
// ============================================

router.get("/", protect, getCVRequests);

router.patch(
  "/:id/status",
  protect,
  updateCVRequestStatus
);

module.exports = router;