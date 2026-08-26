import { useEffect, useState } from "react";
import {
  FaPlus,
  FaTimes,
  FaFileAlt,
  FaTrash,
    FaEdit,
} from "react-icons/fa";

import API from "../../services/api";


function AdminPublications() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingPublication, setEditingPublication] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    year: new Date().getFullYear(),
    status: "Published",
  });

  const [documentFile, setDocumentFile] =
    useState(null);
    const [coverImage, setCoverImage] =
  useState(null);


  // ============================================
  // FETCH ADMIN PUBLICATIONS
  // ============================================

  const fetchPublications = async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("adminToken");

      const response = await API.get(
        "/publications/admin/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPublications(
        response.data.data || []
      );

    } catch (error) {
      console.error(
        "Failed to load publications:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load publications."
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchPublications();
  }, []);


  // ============================================
  // HANDLE INPUT CHANGE
  // ============================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // ============================================
  // SUBMIT PUBLICATION
  // ============================================

  // ============================================
// CREATE / UPDATE PUBLICATION
// ============================================

const handleSubmit = async (e) => {
  e.preventDefault();

  // A document is required only when creating
  if (!editingPublication && !documentFile) {
    alert("Please select a document.");
    return;
  }

  try {
    setSubmitting(true);

    const token =
      localStorage.getItem("adminToken");

    const data = new FormData();

    data.append("title", formData.title);
    data.append(
      "description",
      formData.description
    );
    data.append(
      "category",
      formData.category
    );
    data.append("year", formData.year);
    data.append(
      "status",
      formData.status
    );

    // Only append a document if the admin selected one
    if (documentFile) {
      data.append(
        "document",
        documentFile
      );
    }

    // Only append a cover image if selected
    if (coverImage) {
      data.append(
        "coverImage",
        coverImage
      );
    }

    // ============================================
    // UPDATE EXISTING PUBLICATION
    // ============================================

    if (editingPublication) {
      await API.put(
        `/publications/${editingPublication._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    // ============================================
    // CREATE NEW PUBLICATION
    // ============================================

    else {
      await API.post(
        "/publications",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    // ============================================
    // RESET FORM
    // ============================================

    setFormData({
      title: "",
      description: "",
      category: "",
      year: new Date().getFullYear(),
      status: "Published",
    });

    setDocumentFile(null);
    setCoverImage(null);
    setEditingPublication(null);
    setShowForm(false);

    await fetchPublications();

  } catch (error) {
    console.error(
      "Failed to save publication:",
      error
    );

    alert(
      error.response?.data?.message ||
        "Failed to save publication."
    );

  } finally {
    setSubmitting(false);
  }
};

  // ============================================
// EDIT PUBLICATION
// ============================================

const handleEdit = (publication) => {
  setEditingPublication(publication);

  setFormData({
    title: publication.title || "",
    description: publication.description || "",
    category: publication.category || "",
    year: publication.year || new Date().getFullYear(),
    status: publication.status || "Published",
  });

  // Don't require a new file when editing
  setDocumentFile(null);
  setCoverImage(null);

  setShowForm(true);
};

  // ============================================
  // DELETE PUBLICATION
  // ============================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this publication?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token =
        localStorage.getItem("adminToken");

      await API.delete(
        `/publications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchPublications();

    } catch (error) {
      console.error(
        "Failed to delete publication:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete publication."
      );
    }
  };

  const closeForm = () => {
  setShowForm(false);

  setEditingPublication(null);

  setDocumentFile(null);
  setCoverImage(null);

  setFormData({
    title: "",
    description: "",
    category: "",
    year: new Date().getFullYear(),
    status: "Published",
  });
};


  return (
    <section className="admin-page">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <div className="admin-page-header">

        <div>
          <h1>
            Publications & Documents
          </h1>

          <p>
            Upload and manage official NSHCDA
            publications and downloadable documents.
          </p>
        </div>


        <button
        type="button"
        className="admin-primary-btn"
        onClick={() => {
            setEditingPublication(null);
            setDocumentFile(null);
            setCoverImage(null);

            setFormData({
            title: "",
            description: "",
            category: "",
            year: new Date().getFullYear(),
            status: "Published",
            });

            setShowForm(true);
        }}
        >
        <FaPlus />
        Add Publication
</button>

      </div>


      {/* =====================================
          ERROR
      ===================================== */}

      {error && (
        <div className="admin-error">
          {error}
        </div>
      )}


      {/* =====================================
          LOADING
      ===================================== */}

      {loading && (
        <div className="admin-empty-state">
          Loading publications...
        </div>
      )}


      {/* =====================================
          PUBLICATIONS TABLE
      ===================================== */}

      {!loading &&
        !error &&
        publications.length === 0 && (

          <div className="admin-empty-state">

            <FaFileAlt />

            <h3>
              No Publications Yet
            </h3>

            <p>
              Upload the first official NSHCDA
              document to make it available for
              management.
            </p>

          </div>
        )}


      {!loading &&
        !error &&
        publications.length > 0 && (

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Year</th>
                  <th>File</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>


              <tbody>

                {publications.map(
                  (publication) => (

                    <tr
                      key={publication._id}
                    >

                      <td>
                        <strong>
                          {publication.title}
                        </strong>
                      </td>


                      <td>
                        {publication.category}
                      </td>


                      <td>
                        {publication.year}
                      </td>


                      <td>
                        {publication.document
                          ?.originalName ||
                          "Document"}
                      </td>


                      <td>

                        <span
                          className={`admin-status-badge ${
                            publication.status ===
                            "Published"
                              ? "active"
                              : "pending"
                          }`}
                        >
                          {publication.status}
                        </span>

                      </td>


                    <td>
                        <div className="publication-actions">

                            <button
                            type="button"
                            className="admin-edit-btn"
                            onClick={() =>
                                handleEdit(publication)
                            }
                            >
                            <FaEdit />
                            Edit
                            </button>

                            <button
                            type="button"
                            className="admin-delete-btn"
                            onClick={() =>
                                handleDelete(publication._id)
                                    }
                                    >
                                    <FaTrash />
                                    Delete
                                    </button>

                                </div>
                    </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>
        )}


      {/* =====================================
          ADD PUBLICATION MODAL
      ===================================== */}

      {showForm && (

        <div className="admin-modal-overlay">

          <div className="admin-modal publication-modal">

            <div className="admin-modal-header">

              <div>
                <h2>
                {editingPublication
                    ? "Edit Publication"
                    : "Add Publication"}
                </h2>

                <p>
                {editingPublication
                    ? "Update the publication details or replace the document."
                    : "Upload an official document for NSHCDA."}
                </p>
              </div>


              <button
                type="button"
                className="admin-modal-close"
                  onClick={closeForm}
              >
                <FaTimes />
              </button>

            </div>


            <form
              onSubmit={handleSubmit}
              className="admin-form"
            >

              <div className="admin-form-group">

                <label>
                  Document Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter document title"
                />

              </div>


              <div className="admin-form-group">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={handleChange}
                  rows="4"
                  placeholder="Brief description of this document"
                />

              </div>


              <div className="admin-form-row">

                <div className="admin-form-group">

                  <label>
                    Category
                  </label>

                  <select
                    name="category"
                    value={
                      formData.category
                    }
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select category
                    </option>

                    <option value="Annual Report">
                      Annual Report
                    </option>

                    <option value="Strategic Plan">
                      Strategic Plan
                    </option>

                    <option value="Policy Document">
                      Policy Document
                    </option>

                    <option value="Programme Report">
                      Programme Report
                    </option>

                    <option value="Guideline">
                      Guideline
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>


                <div className="admin-form-group">

                  <label>
                    Year
                  </label>

                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    min="2000"
                    max="2100"
                    required
                  />

                </div>

              </div>


              <div className="admin-form-group">

                <label>
                  Publication Status
                </label>

                <select
                  name="status"
                  value={formData.status}
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
                  Upload Document
                </label>

                <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={(e) =>
                    setDocumentFile(
                    e.target.files[0]
                    )
                }
                required={!editingPublication}
                />

               <small>
                {editingPublication
                    ? "Leave this empty to keep the current document. Upload a new file only if you want to replace it."
                    : "Supported formats: PDF, Word and Excel. Maximum size: 20MB."}
                </small>

              </div>

{/* =====================================
    COVER IMAGE
===================================== */}

        <div className="admin-form-group">

          <label>
            Upload Cover Image
          </label>

          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={(e) =>
              setCoverImage(
                e.target.files[0] || null
              )
            }
          />

          <small>
            {editingPublication
              ? "Leave this empty to keep the current cover image. Upload a new image only if you want to replace it."
              : "Optional. Supported formats: JPG, PNG and WEBP. This image will be displayed as the publication cover."}
          </small>

        </div>


              <div className="admin-form-actions">

                <button
                  type="button"
                  className="admin-secondary-btn"
                    onClick={closeForm}
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
                : editingPublication
                ? "Save Changes"
                : "Upload Publication"}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </section>
  );
}


export default AdminPublications;