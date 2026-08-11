const express = require("express");

const {
  getOpportunities,
  getOpportunity,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
} = require("../controllers/opportunityController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ============================================
// PUBLIC
// ============================================

router
  .route("/")
  .get(getOpportunities)
  .post(protect, createOpportunity);

// ============================================
// SINGLE OPPORTUNITY
// ============================================

router
  .route("/:id")
  .get(getOpportunity)
  .put(protect, updateOpportunity)
  .delete(protect, deleteOpportunity);

module.exports = router;