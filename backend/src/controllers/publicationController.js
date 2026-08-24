const Publication = require("../models/Publication");

const {
  uploadPublicationDocument,
  deletePublicationDocument,
} = require("../services/cloudinaryService");


// =====================================================
// CREATE PUBLICATION
// Admin only
// =====================================================

const createPublication = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      year,
      status,
    } = req.body;


    // ================= VALIDATE FILE =================

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a document.",
      });
    }


    // ================= UPLOAD DOCUMENT =================

    const uploadedDocument =
      await uploadPublicationDocument(
        req.file,
        title
      );


    // ================= CREATE PUBLICATION =================

    const publication =
      await Publication.create({
        title,
        description,
        category,
        year,
        status: status || "Published",

        document: uploadedDocument,
      });


    return res.status(201).json({
      success: true,
      message:
        "Publication created successfully.",
      data: publication,
    });

  } catch (error) {

    console.error(
      "Create Publication Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// GET ALL PUBLICATIONS
// Public
// Only published documents
// =====================================================

const getPublications = async (req, res) => {
  try {

    const publications =
      await Publication.find({
        status: "Published",
      })
        .sort({
          year: -1,
          createdAt: -1,
        });


    return res.status(200).json({
      success: true,
      count: publications.length,
      data: publications,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// GET ALL PUBLICATIONS FOR ADMIN
// Admin only
// Includes Drafts
// =====================================================

const getAdminPublications = async (
  req,
  res
) => {
  try {

    const publications =
      await Publication.find()
        .sort({
          year: -1,
          createdAt: -1,
        });


    return res.status(200).json({
      success: true,
      count: publications.length,
      data: publications,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// GET SINGLE PUBLICATION
// Admin only
// =====================================================

const getPublication = async (req, res) => {
  try {

    const publication =
      await Publication.findById(
        req.params.id
      );


    if (!publication) {
      return res.status(404).json({
        success: false,
        message:
          "Publication not found.",
      });
    }


    return res.status(200).json({
      success: true,
      data: publication,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// UPDATE PUBLICATION
// Admin only
// =====================================================

const updatePublication = async (req, res) => {
  try {

    const {
      title,
      description,
      category,
      year,
      status,
    } = req.body;


    const publication =
      await Publication.findById(
        req.params.id
      );


    if (!publication) {
      return res.status(404).json({
        success: false,
        message:
          "Publication not found.",
      });
    }


    // Update basic information

    if (title !== undefined) {
      publication.title = title;
    }

    if (description !== undefined) {
      publication.description = description;
    }

    if (category !== undefined) {
      publication.category = category;
    }

    if (year !== undefined) {
      publication.year = year;
    }

    if (status !== undefined) {
      publication.status = status;
    }


    // ================= REPLACE DOCUMENT =================

    if (req.file) {

      // Delete old document first

      if (publication.document?.publicId) {
        await deletePublicationDocument(
          publication.document.publicId
        );
      }


      // Upload new document

      const uploadedDocument =
        await uploadPublicationDocument(
          req.file,
          title || publication.title
        );


      publication.document =
        uploadedDocument;
    }


    await publication.save();


    return res.status(200).json({
      success: true,
      message:
        "Publication updated successfully.",
      data: publication,
    });

  } catch (error) {

    console.error(
      "Update Publication Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// DELETE PUBLICATION
// Admin only
// =====================================================

const deletePublication = async (req, res) => {
  try {

    const publication =
      await Publication.findById(
        req.params.id
      );


    if (!publication) {
      return res.status(404).json({
        success: false,
        message:
          "Publication not found.",
      });
    }


    // ================= DELETE FROM CLOUDINARY =================

    if (publication.document?.publicId) {

      await deletePublicationDocument(
        publication.document.publicId
      );

    }


    // ================= DELETE FROM DATABASE =================

    await publication.deleteOne();


    return res.status(200).json({
      success: true,
      message:
        "Publication deleted successfully.",
    });

  } catch (error) {

    console.error(
      "Delete Publication Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createPublication,
  getPublications,
  getAdminPublications,
  getPublication,
  updatePublication,
  deletePublication,
};