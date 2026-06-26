const express = require("express");
const router = express.Router();

const {
  createOpportunity,
  getAllOpportunities,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
} = require("../controllers/opportunityController");

const protect = require("../middleware/authMiddleware");

// Public routes
router.get("/", getAllOpportunities);
router.get("/:id", getOpportunityById);

// Admin routes
router.post("/", protect, createOpportunity);
router.put("/:id", protect, updateOpportunity);
router.delete("/:id", protect, deleteOpportunity);

module.exports = router;