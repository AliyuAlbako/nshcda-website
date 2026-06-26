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

    if (
      !opportunity ||
      !fullName ||
      !email ||
      !phone ||
      !gender ||
      !lga ||
      !state ||
      !qualification ||
      !statement
    ) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "CV upload is required" });
    }

    const existingOpportunity = await Opportunity.findById(opportunity);

    if (!existingOpportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    if (existingOpportunity.applicationMode !== "internal") {
      return res.status(400).json({
        message:
          "This opportunity is managed externally and cannot accept applications here",
      });
    }

    if (existingOpportunity.status !== "Open") {
      return res.status(400).json({
        message: "This opportunity is closed",
      });
    }

    const existingApplication = await Application.findOne({
      opportunity,
      email,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this opportunity",
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

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("opportunity")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["Pending", "Reviewed", "Shortlisted", "Rejected"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid application status" });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      message: "Application status updated successfully",
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