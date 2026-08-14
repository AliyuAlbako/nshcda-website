const CVRequest = require("../models/CVRequest");
const EmploymentProfile = require("../models/EmploymentProfile");

const {sendCVToEmployer} = require("../services/emailService");
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


// =====================================================
// SEND CV TO EMPLOYER
// Admin
// =====================================================

const sendRequestedCV = async (req, res) => {
  try {
    // ============================================
    // FIND REQUEST
    // ============================================

    const request = await CVRequest.findById(
      req.params.id
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "CV request not found.",
      });
    }

    // ============================================
    // ONLY APPROVED REQUESTS CAN SEND CV
    // ============================================

    if (request.status !== "Approved") {
      return res.status(400).json({
        success: false,
        message:
          "Only approved CV requests can be processed.",
      });
    }

    // ============================================
    // GET CANDIDATE PROFILE
    // ============================================

    const profile =
      await EmploymentProfile.findById(
        request.profile
      );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message:
          "Candidate employment profile not found.",
      });
    }

    // ============================================
    // CHECK CV
    // ============================================

    if (!profile.cv?.url) {
      return res.status(400).json({
        success: false,
        message:
          "This candidate does not have a CV available.",
      });
    }

    // ============================================
    // SEND EMAIL
    // ============================================

    const candidateName =
      `${profile.firstName} ${profile.lastName}`;

    await sendCVToEmployer({
      candidateName,
      employerName: request.contactPerson,
      employerEmail: request.email,
      cvUrl: profile.cv.url,
    });

    // ============================================
    // MARK REQUEST COMPLETED
    // ============================================

    request.status = "Completed";
    request.cvSentAt = new Date();
    request.cvSentTo = request.email;
    request.processedAt = new Date();

    await request.save();

    return res.status(200).json({
      success: true,
      message:
        "Candidate CV has been sent successfully to the employer.",
      data: request,
    });

  } catch (error) {
    console.error(
      "Send Requested CV Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to send candidate CV.",
    });
  }
};


module.exports = {
  createCVRequest,
  getCVRequests,
  updateCVRequestStatus,
  sendRequestedCV,
};