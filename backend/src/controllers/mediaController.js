const Media = require("../models/Media");

const createMedia = async (req, res) => {
  try {
    const {
      title,
      date,
      year,
      location,
      thematicArea,
      type,
      featured,
      videoUrl,
      description,
      fullDescription,
    } = req.body;

    if (
      !title ||
      !date ||
      !year ||
      !location ||
      !thematicArea ||
      !type ||
      !description ||
      !fullDescription
    ) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    let thumbnail = "";
    let mediaUrl = "";

    if (type === "image") {
      if (!req.file) {
        return res.status(400).json({ message: "Image upload is required" });
      }

      thumbnail = req.file.path;
      mediaUrl = req.file.path;
    }

    if (type === "video") {
      if (!videoUrl) {
        return res.status(400).json({ message: "Video URL is required" });
      }

      if (!req.file) {
        return res.status(400).json({
          message: "Video thumbnail image is required",
        });
      }

      thumbnail = req.file.path;
      mediaUrl = videoUrl;
    }

    const media = await Media.create({
      title,
      date,
      year,
      location,
      thematicArea,
      type,
      featured: featured === true || featured === "true",
      thumbnail,
      mediaUrl,
      description,
      fullDescription,
      createdBy: req.admin?._id,
    });

    res.status(201).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMedia = async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({ message: "Media item not found" });
    }

    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({ message: "Media item not found" });
    }

    const {
      title,
      date,
      year,
      location,
      thematicArea,
      type,
      featured,
      videoUrl,
      description,
      fullDescription,
    } = req.body;

    media.title = title ?? media.title;
    media.date = date ?? media.date;
    media.year = year ?? media.year;
    media.location = location ?? media.location;
    media.thematicArea = thematicArea ?? media.thematicArea;
    media.type = type ?? media.type;
    media.description = description ?? media.description;
    media.fullDescription = fullDescription ?? media.fullDescription;

    if (featured !== undefined) {
      media.featured = featured === true || featured === "true";
    }

    if (req.file) {
      media.thumbnail = req.file.path;

      if (media.type === "image") {
        media.mediaUrl = req.file.path;
      }
    }

    if (media.type === "video" && videoUrl) {
      media.mediaUrl = videoUrl;
    }

    await media.save();

    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({ message: "Media item not found" });
    }

    await media.deleteOne();

    res.status(200).json({ message: "Media item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMedia,
  getMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
};