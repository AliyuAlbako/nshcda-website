const Opportunity = require("../models/Opportunity");

// ============================================
// GET ALL OPPORTUNITIES
// Public
// ============================================

const getOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: opportunities.length,
      data: opportunities,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// GET SINGLE OPPORTUNITY
// Public
// ============================================

const getOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: opportunity,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// CREATE OPPORTUNITY
// Admin only
// ============================================

const createOpportunity = async (req, res) => {
  try {
    const {
      title,
      type,
      organization,
      location,
      deadline,
      status,
      description,
      applyLink,
    } = req.body;

    const opportunity = await Opportunity.create({
      title,
      type,
      organization,
      location,
      deadline,
      status,
      description,
      applyLink,
    });

    return res.status(201).json({
      success: true,
      message: "Opportunity created successfully.",
      data: opportunity,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// UPDATE OPPORTUNITY
// Admin only
// ============================================

const updateOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Opportunity updated successfully.",
      data: opportunity,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// DELETE OPPORTUNITY
// Admin only
// ============================================

const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(
      req.params.id
    );

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found.",
      });
    }

    await opportunity.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Opportunity deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getOpportunities,
  getOpportunity,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
};