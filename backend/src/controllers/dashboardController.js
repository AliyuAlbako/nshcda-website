const Application = require("../models/Application");
const Opportunity = require("../models/Opportunity");

const getDashboardStats = async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments();
    const pendingApplications = await Application.countDocuments({
      status: "Pending",
    });
    const shortlistedApplications = await Application.countDocuments({
      status: "Shortlisted",
    });
    const totalOpportunities = await Opportunity.countDocuments();
    const openOpportunities = await Opportunity.countDocuments({
      status: "Open",
    });

    res.status(200).json({
      totalApplications,
      pendingApplications,
      shortlistedApplications,
      totalOpportunities,
      openOpportunities,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };