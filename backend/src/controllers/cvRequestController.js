const CVRequest = require("../models/CVRequest");
const EmploymentProfile = require("../models/EmploymentProfile");

// =====================================================
// CREATE CV REQUEST
// Public
// =====================================================

const createCVRequest = async (req, res) => {
  try {
    const {
      profile,
      organization,
      contactPerson,
      email,
      phone,
      reason,
    } = req.body;

    // ============================================
    // VALIDATION
    // ============================================

    if (
      !profile ||
      !organization ||
      !contactPerson ||
      !email ||
      !phone ||
      !reason
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required information.",
      });
    }

    // ============================================
    // CHECK PROFILE
    // ============================================

    const employmentProfile =
      await EmploymentProfile.findOne({
        _id: profile,
        status: "Active",
        talentPoolVisible: true,
      });

    if (!employmentProfile) {
      return res.status(404).json({
        success: false,
        message:
          "This talent profile is not available.",
      });
    }

    // ============================================
    // CHECK EXISTING REQUEST
    // ============================================

    const existingRequest =
      await CVRequest.findOne({
        profile,
        email: email.toLowerCase().trim(),
        status: {
          $in: ["Pending", "Approved"],
        },
      });

    if (existingRequest) {
      return res.status(409).json({
        success: false,
        message:
          "You already have an active CV request for this candidate.",
      });
    }

    // ============================================
    // CREATE REQUEST
    // ============================================

    const request = await CVRequest.create({
      profile,
      organization,
      contactPerson,
      email,
      phone,
      reason,
    });

    return res.status(201).json({
      success: true,
      message:
        "Your CV request has been submitted successfully.",
      data: request,
    });

  } catch (error) {
    console.error(
      "CV Request Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// GET ALL CV REQUESTS
// Admin
// =====================================================

const getCVRequests = async (req, res) => {
  try {
    const requests = await CVRequest.find()
      .populate(
        "profile",
        "firstName lastName primarySkill qualification fieldOfStudy"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });

  } catch (error) {
    console.error(
      "Get CV Requests Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// UPDATE CV REQUEST STATUS
// Admin
// =====================================================

const updateCVRequestStatus = async (
  req,
  res
) => {
  try {
    const {
      status,
      adminNote,
    } = req.body;

    const allowedStatuses = [
      "Pending",
      "Approved",
      "Rejected",
      "Completed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request status.",
      });
    }

    const request =
      await CVRequest.findByIdAndUpdate(
        req.params.id,
        {
          status,
          adminNote,
          ...(status !== "Pending"
            ? { processedAt: new Date() }
            : {}),
        },
        {
          returnDocument: "after",
          runValidators: true,
        }
      );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "CV request not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "CV request updated successfully.",
      data: request,
    });

  } catch (error) {
    console.error(
      "Update CV Request Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createCVRequest,
  getCVRequests,
  updateCVRequestStatus,
};