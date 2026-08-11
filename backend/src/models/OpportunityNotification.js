const mongoose = require("mongoose");

const opportunityNotificationSchema = new mongoose.Schema(
  {
    // The opportunity that triggered this notification
    opportunity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opportunity",
      required: true,
    },

    // The registered employment profile receiving the notification
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmploymentProfile",
      required: true,
    },

    // Store the email independently of the profile
    // so the notification remains traceable even if
    // the profile is later changed.
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    // Queue status
    status: {
      type: String,
      enum: ["pending", "processing", "sent", "failed"],
      default: "pending",
      index: true,
    },

    // Number of delivery attempts
    attempts: {
      type: Number,
      default: 0,
    },

    // Last time the worker attempted delivery
    lastAttemptAt: {
      type: Date,
      default: null,
    },

    // When the email was successfully delivered
    sentAt: {
      type: Date,
      default: null,
    },

    // Store the most recent error for troubleshooting
    lastError: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate notifications for the same
// opportunity and employment profile.
opportunityNotificationSchema.index(
  { opportunity: 1, profile: 1 },
  { unique: true }
);

// Helps the worker efficiently find pending jobs.
opportunityNotificationSchema.index({
  status: 1,
  createdAt: 1,
});

module.exports = mongoose.model(
  "OpportunityNotification",
  opportunityNotificationSchema
);