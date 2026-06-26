const Opportunity = require("../models/Opportunity");

const createOpportunity = async (req, res) => {
  try {
    const {
      title,
      category,
      thematicArea,
      location,
      deadline,
      status,
      featured,
      applicationMode,
      source,
      externalUrl,
      description,
      eligibility,
      requirements,
      benefits,
    } = req.body;

    if (!title || !category || !thematicArea || !location || !deadline) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    if (!applicationMode || !source) {
      return res
        .status(400)
        .json({ message: "Application mode and source are required" });
    }

    if (applicationMode === "external" && !externalUrl) {
      return res
        .status(400)
        .json({ message: "External URL is required for external opportunities" });
    }

    const opportunity = await Opportunity.create({
      title,
      category,
      thematicArea,
      location,
      deadline,
      status,
      featured,
      applicationMode,
      source,
      externalUrl: applicationMode === "external" ? externalUrl : "",
      description,
      eligibility,
      requirements,
      benefits,
      createdBy: req.admin?._id,
    });

    res.status(201).json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find().sort({ createdAt: -1 });
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOpportunityById = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    res.json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    const {
      title,
      category,
      thematicArea,
      location,
      deadline,
      status,
      featured,
      applicationMode,
      source,
      externalUrl,
      description,
      eligibility,
      requirements,
      benefits,
    } = req.body;

    if (applicationMode === "external" && !externalUrl) {
      return res
        .status(400)
        .json({ message: "External URL is required for external opportunities" });
    }

    opportunity.title = title ?? opportunity.title;
    opportunity.category = category ?? opportunity.category;
    opportunity.thematicArea = thematicArea ?? opportunity.thematicArea;
    opportunity.location = location ?? opportunity.location;
    opportunity.deadline = deadline ?? opportunity.deadline;
    opportunity.status = status ?? opportunity.status;
   if (featured !== undefined) {
  opportunity.featured =
    featured === true || featured === "true";
    }
    opportunity.applicationMode =
      applicationMode ?? opportunity.applicationMode;
    opportunity.source = source ?? opportunity.source;
    opportunity.externalUrl =
      opportunity.applicationMode === "external"
        ? externalUrl ?? opportunity.externalUrl
        : "";
    opportunity.description = description ?? opportunity.description;
    opportunity.eligibility = eligibility ?? opportunity.eligibility;
    opportunity.requirements = requirements ?? opportunity.requirements;
    opportunity.benefits = benefits ?? opportunity.benefits;

    await opportunity.save();

    res.json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    await opportunity.deleteOne();

    res.json({ message: "Opportunity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOpportunity,
  getAllOpportunities,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
};