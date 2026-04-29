import { useEffect, useState } from "react";
import axios from "axios";

const initialForm = {
  title: "",
  date: "",
  year: "",
  location: "",
  thematicArea: "",
  type: "image",
  featured: false,
  videoUrl: "",
  description: "",
  fullDescription: "",
  mediaFile: null,
};

function AdminMedia() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [mediaItems, setMediaItems] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("adminToken");

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/media`);
      setMediaItems(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load media items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "mediaFile") {
      const file = files?.[0] || null;
      setFormData((prev) => ({ ...prev, mediaFile: file }));
      setSelectedFileName(file ? file.name : "");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId(null);
    setSelectedFileName("");
    setError("");
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title || "",
      date: item.date || "",
      year: item.year || "",
      location: item.location || "",
      thematicArea: item.thematicArea || "",
      type: item.type || "image",
      featured: item.featured || false,
      videoUrl: item.type === "video" ? item.mediaUrl : "",
      description: item.description || "",
      fullDescription: item.fullDescription || "",
      mediaFile: null,
    });

    setSelectedFileName("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this media item?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/api/media/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMediaItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete media item");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingId && !formData.mediaFile) {
      setError(
        formData.type === "video"
          ? "Please upload a thumbnail image for the video."
          : "Please upload an image."
      );
      return;
    }

    if (formData.type === "video" && !formData.videoUrl) {
      setError("Please provide the video URL.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = new FormData();

      payload.append("title", formData.title);
      payload.append("date", formData.date);
      payload.append("year", formData.year);
      payload.append("location", formData.location);
      payload.append("thematicArea", formData.thematicArea);
      payload.append("type", formData.type);
      payload.append("featured", formData.featured);
      payload.append("videoUrl", formData.videoUrl);
      payload.append("description", formData.description);
      payload.append("fullDescription", formData.fullDescription);

      if (formData.mediaFile) {
        payload.append("mediaFile", formData.mediaFile);
      }

      if (editingId) {
        const response = await axios.put(
          `${API_URL}/api/media/${editingId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setMediaItems((prev) =>
          prev.map((item) => (item._id === editingId ? response.data : item))
        );
      } else {
        const response = await axios.post(`${API_URL}/api/media`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        setMediaItems((prev) => [response.data, ...prev]);
      }

      resetForm();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to save media item");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="admin-page">
      <div className="admin-page-header">
        <h1>Events & Programs Media</h1>
        <p>Upload and manage images, video links, and historical program records.</p>
      </div>

      <div className="card admin-form-card">
        <h2>{editingId ? "Edit Media Item" : "Upload Media Item"}</h2>

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit} className="admin-opportunity-form">
          <div className="admin-form-grid">
            <div>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Date</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="e.g. March 2026"
                required
              />
            </div>

            <div>
              <label>Year</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="e.g. 2026"
                required
              />
            </div>

            <div>
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Thematic Area</label>
              <select
                name="thematicArea"
                value={formData.thematicArea}
                onChange={handleChange}
                required
              >
                <option value="">Select Thematic Area</option>
                <option value="Health & Nutrition">Health & Nutrition</option>
                <option value="Youth">Youth</option>
                <option value="Education">Education</option>
                <option value="Social Development">Social Development</option>
                <option value="Labour Force">Labour Force</option>
                <option value="Local Government & Community Development">
                  Local Government & Community Development
                </option>
              </select>
            </div>

            <div>
              <label>Media Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>

            {formData.type === "video" && (
              <div className="full-width">
                <label>Video URL</label>
                <input
                  type="url"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  placeholder="https://www.youtube.com/embed/VIDEO_ID"
                  required
                />
              </div>
            )}

            <div className="full-width">
              <label>
                {formData.type === "video"
                  ? "Upload Video Thumbnail"
                  : "Upload Image"}
              </label>
              <input
                type="file"
                name="mediaFile"
                accept="image/*"
                onChange={handleChange}
                required={!editingId}
              />
              {selectedFileName && (
                <small className="file-name">Selected: {selectedFileName}</small>
              )}
            </div>

            <div className="checkbox-wrap">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                Mark as Featured
              </label>
            </div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <label>Short Description</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <label>Full Description</label>
            <textarea
              name="fullDescription"
              rows="5"
              value={formData.fullDescription}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="details-actions" style={{ marginTop: "1.5rem" }}>
            <button type="submit" className="btn" disabled={saving}>
              {saving
                ? "Saving..."
                : editingId
                ? "Update Media"
                : "Upload Media"}
            </button>

            {editingId && (
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-page-header" style={{ marginTop: "2rem" }}>
        <h2>Uploaded Media</h2>
      </div>

      {loading ? (
        <div className="card">
          <p>Loading media...</p>
        </div>
      ) : mediaItems.length === 0 ? (
        <div className="card">
          <p>No media items found.</p>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Preview</th>
                <th>Title</th>
                <th>Type</th>
                <th>Thematic Area</th>
                <th>Year</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {mediaItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="admin-media-thumb"
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.type}</td>
                  <td>{item.thematicArea}</td>
                  <td>{item.year}</td>
                  <td>{item.featured ? "Yes" : "No"}</td>
                  <td>
                    <div className="admin-action-buttons">
                      <button
                        className="admin-small-btn"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>

                      <button
                        className="admin-small-btn danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AdminMedia;