const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema(
  {
    // ================= BASIC INFORMATION =================

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
    },

    // ================= DOCUMENT FILE =================

    document: {
      url: {
        type: String,
        required: true,
      },

      publicId: {
        type: String,
        required: true,
      },

      originalName: {
        type: String,
      },

      fileSize: {
        type: Number,
      },

      fileType: {
        type: String,
      },
    },

    // ================= COVER IMAGE =================

    coverImage: {
      url: {
        type: String,
        default: "",
      },

      publicId: {
        type: String,
        default: "",
      },

      originalName: {
        type: String,
      },

      fileSize: {
        type: Number,
      },

      fileType: {
        type: String,
      },
    },

    // ================= PUBLICATION STATUS =================

    status: {
      type: String,
      enum: ["Published", "Draft"],
      default: "Published",
    },
  },
  {
    timestamps: true,
  }
);


// ================= INDEXES =================

publicationSchema.index({
  category: 1,
});

publicationSchema.index({
  year: -1,
});

publicationSchema.index({
  status: 1,
});


module.exports = mongoose.model(
  "Publication",
  publicationSchema
);