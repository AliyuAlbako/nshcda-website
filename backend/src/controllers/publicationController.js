const Publication = require("../models/Publication");

const {
  uploadPublicationDocument,
  deletePublicationDocument,
  uploadPublicationCoverImage,
  deletePublicationCoverImage,
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


    // =================================================
    // GET UPLOADED FILES
    // =================================================

    const documentFile =
      req.files?.document?.[0];

    const coverImageFile =
      req.files?.coverImage?.[0];


    // =================================================
    // VALIDATE DOCUMENT
    // =================================================

    if (!documentFile) {

      return res.status(400).json({
        success: false,
        message: "Please upload a document.",
      });

    }


    // =================================================
    // UPLOAD DOCUMENT
    // =================================================

    const uploadedDocument =
      await uploadPublicationDocument(
        documentFile,
        title
      );


    // =================================================
    // UPLOAD COVER IMAGE
    // Optional
    // =================================================

    let uploadedCoverImage = null;

    if (coverImageFile) {

      uploadedCoverImage =
        await uploadPublicationCoverImage(
          coverImageFile,
          title
        );

    }


    // =================================================
    // CREATE PUBLICATION
    // =================================================

    const publication =
      await Publication.create({
        title,
        description,
        category,
        year,
        status: status || "Published",

        document: uploadedDocument,

        coverImage: uploadedCoverImage,
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


    // =================================================
    // UPDATE BASIC INFORMATION
    // =================================================

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


    // =================================================
    // GET UPLOADED FILES
    // =================================================

    const documentFile =
      req.files?.document?.[0];

    const coverImageFile =
      req.files?.coverImage?.[0];


    // =================================================
    // REPLACE DOCUMENT
    // =================================================

    if (documentFile) {

      // Delete old document

      if (publication.document?.publicId) {

        await deletePublicationDocument(
          publication.document.publicId
        );

      }


      // Upload new document

      const uploadedDocument =
        await uploadPublicationDocument(
          documentFile,
          title || publication.title
        );


      publication.document =
        uploadedDocument;

    }


    // =================================================
    // REPLACE COVER IMAGE
    // =================================================

    if (coverImageFile) {

      // Delete old cover image

      if (publication.coverImage?.publicId) {

        await deletePublicationCoverImage(
          publication.coverImage.publicId
        );

      }


      // Upload new cover image

      const uploadedCoverImage =
        await uploadPublicationCoverImage(
          coverImageFile,
          title || publication.title
        );


      publication.coverImage =
        uploadedCoverImage;

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


    // =================================================
    // DELETE DOCUMENT FROM CLOUDINARY
    // =================================================

    if (publication.document?.publicId) {

      await deletePublicationDocument(
        publication.document.publicId
      );

    }


    // =================================================
    // DELETE COVER IMAGE FROM CLOUDINARY
    // =================================================

    if (publication.coverImage?.publicId) {

      await deletePublicationCoverImage(
        publication.coverImage.publicId
      );

    }


    // =================================================
    // DELETE FROM DATABASE
    // =================================================

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