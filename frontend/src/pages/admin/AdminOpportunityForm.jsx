import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  createOpportunity,
  getOpportunity,
  updateOpportunity,
} from "../../services/adminOpportunityService";

function AdminOpportunityForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    organization: "",
    location: "",
    deadline: "",
    description: "",
    applyLink: "",
    status: "Open",
  });

  const [loading, setLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ============================
  // Load opportunity for editing
  // ============================

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    const loadOpportunity = async () => {
      try {
        const response = await getOpportunity(id);

        const opportunity = response.data;

        setFormData({
          title: opportunity.title || "",
          type: opportunity.type || "",
          organization: opportunity.organization || "",
          location: opportunity.location || "",
          deadline: opportunity.deadline || "",
          description: opportunity.description || "",
          applyLink: opportunity.applyLink || "",
          status: opportunity.status || "Open",
        });
      } catch (error) {
        console.error(
          "Failed to load opportunity:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load opportunity."
        );
      } finally {
        setLoading(false);
      }
    };

    loadOpportunity();
  }, [id, isEditMode]);

  // ============================
  // Handle form changes
  // ============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================
  // Submit
  // ============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      if (isEditMode) {
        await updateOpportunity(id, formData);

        alert("Opportunity updated successfully.");
      } else {
        await createOpportunity(formData);

        alert("Opportunity published successfully.");
      }

      navigate("/admin/opportunities");
    } catch (error) {
      console.error(
        "Failed to save opportunity:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to save opportunity."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================
  // Loading
  // ============================

  if (loading) {
    return (
      <section className="admin-page">

        <div className="admin-page-header">
          <h1>Edit Opportunity</h1>

          <p>
            Loading opportunity details...
          </p>
        </div>

      </section>
    );
  }

  return (
    <section className="admin-page">

      <div className="admin-page-header">

        <h1>
          {isEditMode
            ? "Edit Opportunity"
            : "Post Opportunity"}
        </h1>

        <p>
          {isEditMode
            ? "Update the published opportunity."
            : "Publish an opportunity for citizens to discover."}
        </p>

      </div>

      <div className="admin-form-card">

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <form
          className="admin-opportunity-form"
          onSubmit={handleSubmit}
        >

          <div className="admin-form-grid">

            {/* Title */}

            <div className="full-width">

              <label htmlFor="title">
                Opportunity Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. NAQS Recruitment 2026"
                required
              />

            </div>

            {/* Type */}

            <div>

              <label htmlFor="type">
                Type
              </label>

              <input
                id="type"
                name="type"
                type="text"
                value={formData.type}
                onChange={handleChange}
                placeholder="e.g. Job, Internship, Scholarship"
                required
              />

            </div>

            {/* Organization */}

            <div>

              <label htmlFor="organization">
                Organization
              </label>

              <input
                id="organization"
                name="organization"
                type="text"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Organization offering the opportunity"
                required
              />

            </div>

            {/* Location */}

            <div>

              <label htmlFor="location">
                Location
              </label>

              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Nigeria"
                required
              />

            </div>

            {/* Deadline */}

            <div>

              <label htmlFor="deadline">
                Application Deadline
              </label>

              <input
                id="deadline"
                name="deadline"
                type="text"
                value={formData.deadline}
                onChange={handleChange}
                placeholder="e.g. 10 August 2026"
                required
              />

            </div>

            {/* Description */}

            <div className="full-width">

              <label htmlFor="description">
                Short Description
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a short summary of the opportunity."
                required
              />

            </div>

            {/* Application Link */}

            <div className="full-width">

              <label htmlFor="applyLink">
                Official Application Link
              </label>

              <input
                id="applyLink"
                name="applyLink"
                type="url"
                value={formData.applyLink}
                onChange={handleChange}
                placeholder="https://example.com/apply"
                required
              />

            </div>

            {/* Status */}

            <div>

              <label htmlFor="status">
                Status
              </label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >

                <option value="Open">
                  Open
                </option>

                <option value="Closed">
                  Closed
                </option>

              </select>

            </div>

          </div>

          <div
            className="details-actions"
            style={{ marginTop: "1.5rem" }}
          >

            <button
              type="submit"
              className="btn"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : isEditMode
                ? "Save Changes"
                : "Publish Opportunity"}
            </button>

            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={() =>
                navigate("/admin/opportunities")
              }
              disabled={isSubmitting}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </section>
  );
}

export default AdminOpportunityForm;