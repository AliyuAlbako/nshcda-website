import { useEffect, useState } from "react";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

import API from "../../services/api";


function AdminNewsHighlights() {
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingItem, setEditingItem] =
    useState(null);

  const [thumbnailFile, setThumbnailFile] =
    useState(null);

  const [submitting, setSubmitting] =
    useState(false);


  // ============================================
  // FORM DATA
  // ============================================

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "highlight",
    featured: false,
    description: "",
    fullDescription: "",
    date: "",
    location: "",
    type: "image",
    mediaUrl: "",
    status: "Published",
  });


  // ============================================
  // FETCH NEWS & HIGHLIGHTS
  // ============================================

  const fetchNewsHighlights = async () => {
    try {
      setLoading(true);

      setError("");

      const token =
        localStorage.getItem("adminToken");

      const response = await API.get(
        "/news-highlights?admin=true",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItems(
        response.data.data || []
      );

    } catch (error) {

      console.error(
        "Failed to load news and highlights:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load news and highlights."
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchNewsHighlights();

  }, []);


  // ============================================
  // AUTO GENERATE SLUG
  // ============================================

  const generateSlug = (title) => {

    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  };


  // ============================================
  // HANDLE INPUT CHANGE
  // ============================================

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;


    if (name === "title") {

      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: generateSlug(value),
      }));

      return;
    }


    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

  };


  // ============================================
  // OPEN ADD FORM
  // ============================================

  const openAddForm = () => {

    setEditingItem(null);

    setThumbnailFile(null);

    setFormData({
      title: "",
      slug: "",
      category: "highlight",
      featured: false,
      description: "",
      fullDescription: "",
      date: "",
      location: "",
      type: "image",
      mediaUrl: "",
      status: "Published",
    });

    setShowForm(true);

  };


  // ============================================
  // OPEN EDIT FORM
  // ============================================

  const openEditForm = (item) => {

    setEditingItem(item);

    setThumbnailFile(null);

    setFormData({
      title: item.title || "",
      slug: item.slug || "",
      category:
        item.category || "highlight",
      featured:
        item.featured || false,
      description:
        item.description || "",
      fullDescription:
        item.fullDescription || "",
      date: item.date || "",
      location:
        item.location || "",
      type: item.type || "image",
      mediaUrl:
        item.mediaUrl || "",
      status:
        item.status || "Published",
    });

    setShowForm(true);

  };


  // ============================================
  // SUBMIT FORM
  // ============================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSubmitting(true);

      const token =
        localStorage.getItem("adminToken");


      const data = new FormData();


      Object.entries(formData).forEach(
        ([key, value]) => {

          data.append(key, value);

        }
      );


      if (thumbnailFile) {

        data.append(
          "thumbnail",
          thumbnailFile
        );

      }


      if (editingItem) {

        await API.put(
          `/news-highlights/${editingItem._id}`,
          data,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      } else {

        await API.post(
          "/news-highlights",
          data,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      }


      await fetchNewsHighlights();

      setShowForm(false);

      setEditingItem(null);

      setThumbnailFile(null);


    } catch (error) {

      console.error(
        "Failed to save news/highlight:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to save news or highlight."
      );

    } finally {

      setSubmitting(false);

    }

  };


  // ============================================
  // DELETE ITEM
  // ============================================

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this item?"
      );


    if (!confirmed) {
      return;
    }


    try {

      const token =
        localStorage.getItem("adminToken");


      await API.delete(
        `/news-highlights/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      await fetchNewsHighlights();


    } catch (error) {

      console.error(
        "Failed to delete item:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete item."
      );

    }

  };


  return (

    <section className="admin-page">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <div className="admin-page-header">

        <div>

          <h1>
            News & Highlights
          </h1>

          <p>
            Manage agency news, activities,
            announcements and highlights.
          </p>

        </div>


        <button
          type="button"
          className="admin-primary-btn"
          onClick={openAddForm}
        >

          <FaPlus />

          Add News / Highlight

        </button>

      </div>


      {/* =====================================
          LOADING
      ===================================== */}

      {loading && (

        <div className="admin-empty-state">

          Loading news and highlights...

        </div>

      )}


      {/* =====================================
          ERROR
      ===================================== */}

      {!loading && error && (

        <div className="admin-error">

          {error}

        </div>

      )}


      {/* =====================================
          EMPTY STATE
      ===================================== */}

      {!loading &&
        !error &&
        items.length === 0 && (

          <div className="admin-empty-state">

            <h3>
              No News or Highlights Yet
            </h3>

            <p>
              Add agency news, activities,
              announcements and highlights.
            </p>

          </div>

        )}


      {/* =====================================
          TABLE
      ===================================== */}

      {!loading &&
        !error &&
        items.length > 0 && (

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>Title</th>

                  <th>Category</th>

                  <th>Type</th>

                  <th>Featured</th>

                  <th>Status</th>

                  <th>Date</th>

                  <th>Actions</th>

                </tr>

              </thead>


              <tbody>

                {items.map((item) => (

                  <tr key={item._id}>

                    <td>

                      <strong>
                        {item.title}
                      </strong>

                    </td>


                    <td>

                      {item.category}

                    </td>


                    <td>

                      {item.type}

                    </td>


                    <td>

                      {item.featured
                        ? "Yes"
                        : "No"}

                    </td>


                    <td>

                      <span
                        className={`admin-status-badge ${item.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >

                        {item.status}

                      </span>

                    </td>


                    <td>

                      {item.date}

                    </td>


                    <td>

                      <div className="publication-actions">

                        <button
                          type="button"
                          className="admin-edit-btn"
                          onClick={() =>
                            openEditForm(item)
                          }
                        >

                          <FaEdit />

                          Edit

                        </button>


                        <button
                          type="button"
                          className="admin-delete-btn"
                          onClick={() =>
                            handleDelete(item._id)
                          }
                        >

                          <FaTrash />

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


      {/* =====================================
          ADD / EDIT MODAL
      ===================================== */}

      {showForm && (

        <div className="admin-modal-overlay">

          <div className="admin-modal publication-modal">

            {/* HEADER */}

            <div className="admin-modal-header">

              <div>

                <h2>

                  {editingItem
                    ? "Edit News / Highlight"
                    : "Add News / Highlight"}

                </h2>

                <p>

                  Create and manage agency news,
                  activities and highlights.

                </p>

              </div>


              <button
                type="button"
                className="admin-modal-close"
                onClick={() =>
                  setShowForm(false)
                }
              >

                <FaTimes />

              </button>

            </div>


            {/* FORM */}

            <form
              className="admin-form"
              onSubmit={handleSubmit}
            >


              {/* TITLE */}

              <div className="admin-form-group">

                <label>
                  Title *
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* SLUG */}

              <div className="admin-form-group">
  <label htmlFor="slug">
    Slug
  </label>

  <input
    type="text"
    id="slug"
    name="slug"
    value={formData.slug}
    onChange={handleChange}
    placeholder="e.g. yrfs-akwanga-disbursement"
    required
  />

  <small>
    Use lowercase letters and hyphens only. Example:
    <strong> youth-empowerment-programme-2026</strong>
  </small>
</div>

              {/* CATEGORY + TYPE */}

              <div className="admin-form-row">

                <div className="admin-form-group">

                  <label>
                    Category *
                  </label>

                  <select
                    name="category"
                    value={
                      formData.category
                    }
                    onChange={handleChange}
                  >

                    <option value="news">
                      News
                    </option>

                    <option value="highlight">
                      Highlight
                    </option>

                  </select>

                </div>


                <div className="admin-form-group">

                  <label>
                    Media Type *
                  </label>

                  <select
                    name="type"
                    value={
                      formData.type
                    }
                    onChange={handleChange}
                  >

                    <option value="image">
                      Image
                    </option>

                    <option value="video">
                      Video
                    </option>

                  </select>

                </div>

              </div>


              {/* DATE + LOCATION */}

              <div className="admin-form-row">

                <div className="admin-form-group">

                  <label>
                    Date *
                  </label>

                  <input
                    type="text"
                    name="date"
                    placeholder="e.g. April 2026"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="admin-form-group">

                  <label>
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={
                      formData.location
                    }
                    onChange={handleChange}
                  />

                </div>

              </div>


              {/* THUMBNAIL */}

              <div className="admin-form-group">

                <label>
                  Thumbnail Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setThumbnailFile(
                      e.target.files[0]
                    )
                  }
                />

                {editingItem?.thumbnail?.url && (
                  <small>
                    Leave empty to keep the
                    current thumbnail.
                  </small>
                )}

              </div>


              {/* VIDEO URL */}

              {formData.type === "video" && (

                <div className="admin-form-group">

                  <label>
                    Video URL
                  </label>

                  <input
                    type="url"
                    name="mediaUrl"
                    placeholder="https://www.youtube.com/embed/..."
                    value={
                      formData.mediaUrl
                    }
                    onChange={handleChange}
                  />

                </div>

              )}


              {/* DESCRIPTION */}

              <div className="admin-form-group">

                <label>
                  Short Description *
                </label>

                <textarea
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={handleChange}
                  required
                />

              </div>


              {/* FULL DESCRIPTION */}

              <div className="admin-form-group">

                <label>
                  Full Story *
                </label>

                <textarea
                  name="fullDescription"
                  value={
                    formData.fullDescription
                  }
                  onChange={handleChange}
                  required
                />

              </div>


              {/* FEATURED + STATUS */}

              <div className="admin-form-row">

                <div className="admin-form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={
                      formData.status
                    }
                    onChange={handleChange}
                  >

                    <option value="Published">
                      Published
                    </option>

                    <option value="Draft">
                      Draft
                    </option>

                  </select>

                </div>


                <div className="admin-form-group">

                  <label>
                    Featured Story
                  </label>

                  <label className="admin-checkbox-label">

                    <input
                      type="checkbox"
                      name="featured"
                      checked={
                        formData.featured
                      }
                      onChange={handleChange}
                    />

                    <span>
                      Make this the featured story
                    </span>

                  </label>

                </div>

              </div>


              {/* ACTIONS */}

              <div className="admin-form-actions">

                <button
                  type="button"
                  className="admin-secondary-btn"
                  onClick={() =>
                    setShowForm(false)
                  }
                  disabled={submitting}
                >

                  Cancel

                </button>


                <button
                  type="submit"
                  className="admin-primary-btn"
                  disabled={submitting}
                >

                  {submitting
                    ? "Saving..."
                    : editingItem
                    ? "Update"
                    : "Create"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </section>

  );
}


export default AdminNewsHighlights;