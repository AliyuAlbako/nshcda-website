const Application = require("../models/Application");
const Opportunity = require("../models/Opportunity");
const EmploymentProfile = require("../models/EmploymentProfile");

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

    const totalEmploymentProfiles =  await EmploymentProfile.countDocuments();

    res.status(200).json({
      totalEmploymentProfiles,
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