const mongoose = require("mongoose");

const cvRequestSchema = new mongoose.Schema(
  {
    // ============================================
    // CANDIDATE
    // ============================================

    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmploymentProfile",
      required: true,
    },

    // ============================================
    // EMPLOYER INFORMATION
    // ============================================

    organization: {
      type: String,
      required: true,
      trim: true,
    },

    contactPerson: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    reason: {
      type: String,
      required: true,
      trim: true,
    },

    // ============================================
    // REQUEST STATUS
    // ============================================

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Completed",
      ],
      default: "Pending",
    },

    // ============================================
    // ADMIN NOTES
    // ============================================

    adminNote: {
      type: String,
      trim: true,
    },

    // ============================================
    // PROCESSING
    // ============================================

    processedAt: {
      type: Date,
    },

    cvSentAt: {
  type: Date,
    },

    cvSentTo: {
  type: String,
  lowercase: true,
  trim: true,
    },

  },

  
  {
    timestamps: true,
  }
);

// ============================================
// INDEXES
// ============================================

cvRequestSchema.index({ profile: 1 });
cvRequestSchema.index({ status: 1 });
cvRequestSchema.index({ email: 1 });
cvRequestSchema.index({ createdAt: -1 });

module.exports = mongoose.model(
  "CVRequest",
  cvRequestSchema
);