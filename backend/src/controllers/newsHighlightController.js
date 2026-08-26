const NewsHighlight = require(
  "../models/NewsHighlight"
);

const {
  uploadNewsHighlightThumbnail,
  deleteNewsHighlightThumbnail,
} = require("../services/cloudinaryService");


// ============================================
// CREATE NEWS / HIGHLIGHT
// ============================================

const createNewsHighlight = async (req, res) => {
  try {

    const {
      title,
      slug,
      category,
      featured,
      description,
      fullDescription,
      date,
      location,
      type,
      mediaUrl,
      status,
    } = req.body;


    // ============================================
    // CHECK FOR EXISTING SLUG
    // ============================================

    const existingItem =
      await NewsHighlight.findOne({
        slug,
      });


    if (existingItem) {
      return res.status(409).json({
        success: false,
        message:
          "A news or highlight item with this slug already exists.",
      });
    }


    // ============================================
    // UPLOAD THUMBNAIL
    // ============================================

    let uploadedThumbnail = null;


    if (req.file) {

      uploadedThumbnail =
        await uploadNewsHighlightThumbnail(
          req.file,
          title
        );

    }


    // ============================================
    // FEATURED STORY LOGIC
    // Only one item should be featured
    // ============================================

    const isFeatured =
      featured === true ||
      featured === "true";


    if (isFeatured) {

      await NewsHighlight.updateMany(
        {
          featured: true,
        },
        {
          featured: false,
        }
      );

    }


    // ============================================
    // CREATE ITEM
    // ============================================

    const newsHighlight =
      await NewsHighlight.create({
        title,
        slug,
        category: category?.toLowerCase(),
        featured: isFeatured,
        description,
        fullDescription,
        date,
        location,
        type,
        thumbnail: uploadedThumbnail,
        mediaUrl,
        status,
      });


    return res.status(201).json({
      success: true,
      message:
        "News or highlight created successfully.",
      data: newsHighlight,
    });

  } catch (error) {

    console.error(
      "Create News/Highlight Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ============================================
// GET ALL NEWS & HIGHLIGHTS
// ============================================

const getNewsHighlights = async (req, res) => {
  try {
    const query = {};

    // Public users only see published items
    if (req.query.admin !== "true") {
      query.status = "Published";
    }

    const newsHighlights = await NewsHighlight.find(query)
      .sort({
        featured: -1,
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: newsHighlights.length,
      data: newsHighlights,
    });
  } catch (error) {
    console.error(
      "Get News/Highlights Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// GET SINGLE NEWS / HIGHLIGHT BY SLUG
// ============================================

const getNewsHighlightBySlug =
  async (req, res) => {

    try {

      const newsHighlight =
        await NewsHighlight.findOne({
          slug: req.params.slug,
          status: "Published",
        });


      if (!newsHighlight) {

        return res.status(404).json({
          success: false,
          message:
            "News or highlight not found.",
        });

      }


      return res.status(200).json({
        success: true,
        data: newsHighlight,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };


// ============================================
// GET SINGLE NEWS / HIGHLIGHT BY ID
// ADMIN
// ============================================

const getNewsHighlightById =
  async (req, res) => {

    try {

      const newsHighlight =
        await NewsHighlight.findById(
          req.params.id
        );


      if (!newsHighlight) {

        return res.status(404).json({
          success: false,
          message:
            "News or highlight not found.",
        });

      }


      return res.status(200).json({
        success: true,
        data: newsHighlight,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };


// ============================================
// UPDATE NEWS / HIGHLIGHT
// ============================================

const updateNewsHighlight =
  async (req, res) => {

    try {

      const newsHighlight =
        await NewsHighlight.findById(
          req.params.id
        );


      if (!newsHighlight) {

        return res.status(404).json({
          success: false,
          message:
            "News or highlight not found.",
        });

      }


      // ============================================
      // HANDLE FEATURED STATUS
      // ============================================

      const isFeatured =
        req.body.featured === true ||
        req.body.featured === "true";


      if (isFeatured) {

        await NewsHighlight.updateMany(
          {
            _id: {
              $ne: newsHighlight._id,
            },
            featured: true,
          },
          {
            featured: false,
          }
        );

      }


      // ============================================
      // HANDLE NEW THUMBNAIL
      // ============================================

      if (req.file) {

        // Delete old thumbnail first
        if (
          newsHighlight.thumbnail?.publicId
        ) {

          await deleteNewsHighlightThumbnail(
            newsHighlight.thumbnail.publicId
          );

        }


        const uploadedThumbnail =
          await uploadNewsHighlightThumbnail(
            req.file,
            req.body.title ||
              newsHighlight.title
          );


        newsHighlight.thumbnail =
          uploadedThumbnail;

      }


      // ============================================
      // UPDATE FIELDS
      // ============================================

      const allowedFields = [
        "title",
        "slug",
        "category",
        "description",
        "fullDescription",
        "date",
        "location",
        "type",
        "mediaUrl",
        "status",
      ];


      allowedFields.forEach((field) => {

        if (
          req.body[field] !== undefined
        ) {

          if (
            field === "category"
          ) {

            newsHighlight[field] =
              req.body[field].toLowerCase();

          } else {

            newsHighlight[field] =
              req.body[field];

          }

        }

      });


      if (
        req.body.featured !== undefined
      ) {

        newsHighlight.featured =
          isFeatured;

      }


      await newsHighlight.save();


      return res.status(200).json({
        success: true,
        message:
          "News or highlight updated successfully.",
        data: newsHighlight,
      });

    } catch (error) {

      console.error(
        "Update News/Highlight Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };


// ============================================
// DELETE NEWS / HIGHLIGHT
// ============================================

const deleteNewsHighlight =
  async (req, res) => {

    try {

      const newsHighlight =
        await NewsHighlight.findById(
          req.params.id
        );


      if (!newsHighlight) {

        return res.status(404).json({
          success: false,
          message:
            "News or highlight not found.",
        });

      }


      // Delete thumbnail from Cloudinary
      if (
        newsHighlight.thumbnail?.publicId
      ) {

        await deleteNewsHighlightThumbnail(
          newsHighlight.thumbnail.publicId
        );

      }


      await newsHighlight.deleteOne();


      return res.status(200).json({
        success: true,
        message:
          "News or highlight deleted successfully.",
      });

    } catch (error) {

      console.error(
        "Delete News/Highlight Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };


module.exports = {
  createNewsHighlight,
  getNewsHighlights,
  getNewsHighlightBySlug,
  getNewsHighlightById,
  updateNewsHighlight,
  deleteNewsHighlight,
};