const mongoose = require("mongoose");

const newsHighlightSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    category: {
      type: String,
      enum: ["news", "highlight"],
      required: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    fullDescription: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      trim: true,
    },

    type: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },

    thumbnail: {
      url: {
        type: String,
      },

      publicId: {
        type: String,
      },
    },

    mediaUrl: {
      type: String,
    },

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

module.exports = mongoose.model(
  "NewsHighlight",
  newsHighlightSchema
);