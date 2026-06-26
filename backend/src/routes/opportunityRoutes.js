const express = require("express");
const router = express.Router();

const {
  getAllOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
} = require("../controllers/opportunityController");

const protect = require("../middleware/authMiddleware");

// PUBLIC
router.get("/", getAllOpportunities);
router.get("/:id", getOpportunityById);

// ADMIN
router.post("/", protect, createOpportunity);
router.put("/:id", protect, updateOpportunity);
router.delete("/:id", protect, deleteOpportunity);

module.exports = router;