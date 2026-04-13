const Application = require("../models/Application");
const Opportunity = require("../models/Opportunity");

const submitApplication = async (req, res) => {
  try {
    const {
      opportunity,
      fullName,
      email,
      phone,
      gender,
      lga,
      state,
      qualification,
      statement,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "CV upload is required" });
    }

    const existingOpportunity = await Opportunity.findById(opportunity);

    if (!existingOpportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    if (existingOpportunity.applicationMode !== "internal") {
      return res.status(400).json({
        message: "This opportunity is managed externally and cannot accept applications here",
      });
    }

    if (existingOpportunity.status !== "Open") {
      return res.status(400).json({
        message: "This opportunity is closed",
      });
    }

    const application = await Application.create({
      opportunity,
      fullName,
      email,
      phone,
      gender,
      lga,
      state,
      qualification,
      statement,
      cvUrl: req.file.path,
      cvPublicId: req.file.filename,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitApplication,
  getApplications,
  updateApplicationStatus,
};