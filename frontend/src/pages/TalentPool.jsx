import { useEffect, useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaTimes,
} from "react-icons/fa";
import API from "../services/api";

function TalentPool() {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================
  // CV REQUEST STATE
  // ============================

  const [selectedProfile, setSelectedProfile] =
    useState(null);

  const [requestSubmitting, setRequestSubmitting] =
    useState(false);

  const [requestSuccess, setRequestSuccess] =
    useState("");

  const [requestError, setRequestError] =
    useState("");

  const [formData, setFormData] = useState({
    organization: "",
    contactPerson: "",
    email: "",
    phone: "",
    reason: "",
  });

  // ============================
  // LOAD TALENT POOL
  // ============================

  useEffect(() => {
    const loadTalentPool = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get(
          "/employment-profiles/talent-pool"
        );

        setProfiles(response.data.data || []);
      } catch (error) {
        console.error(
          "Failed to load talent pool:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load talent pool."
        );
      } finally {
        setLoading(false);
      }
    };

    loadTalentPool();
  }, []);

  // ============================
  // SEARCH
  // ============================

  const filteredProfiles = profiles.filter((profile) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) return true;

    return [
      profile.firstName,
      profile.lastName,
      profile.primarySkill,
      profile.fieldOfStudy,
      profile.qualification,
      profile.lga,
      profile.preferredLocation,
      profile.professionalSkills,
      profile.employmentStatus,
    ]
      .filter(Boolean)
      .some((value) =>
        value.toLowerCase().includes(searchText)
      );
  });

  // ============================
  // OPEN REQUEST MODAL
  // ============================

  const openRequestModal = (profile) => {
    setSelectedProfile(profile);

    setRequestSuccess("");
    setRequestError("");

    setFormData({
      organization: "",
      contactPerson: "",
      email: "",
      phone: "",
      reason: "",
    });
  };

  // ============================
  // CLOSE REQUEST MODAL
  // ============================

  const closeRequestModal = () => {
    if (requestSubmitting) return;

    setSelectedProfile(null);
    setRequestSuccess("");
    setRequestError("");
  };

  // ============================
  // FORM INPUT
  // ============================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ============================
  // SUBMIT CV REQUEST
  // ============================

  const handleSubmitRequest = async (e) => {
    e.preventDefault();

    if (!selectedProfile) return;

    try {
      setRequestSubmitting(true);
      setRequestError("");
      setRequestSuccess("");

      const response = await API.post(
        "/cv-requests",
        {
          profile: selectedProfile._id,
          ...formData,
        }
      );

      setRequestSuccess(
        response.data.message ||
          "Your CV request has been submitted successfully."
      );

      setFormData({
        organization: "",
        contactPerson: "",
        email: "",
        phone: "",
        reason: "",
      });

    } catch (error) {
      console.error(
        "Failed to submit CV request:",
        error
      );

      setRequestError(
        error.response?.data?.message ||
          "Failed to submit your CV request. Please try again."
      );
    } finally {
      setRequestSubmitting(false);
    }
  };

  return (
    <section className="page-section talent-pool-page">
      <div className="container">

        {/* ============================
            HEADER
        ============================ */}

        <div className="talent-pool-header">
          <span className="section-badge">
            NSHCDA Talent Pool
          </span>

          <h1>Find Skilled Talent</h1>

          <p>
            Explore employment profiles of individuals who
            have made their profiles available to employers
            through the NSHCDA Talent Pool.
          </p>
        </div>

        {/* ============================
            SEARCH
        ============================ */}

        <div className="talent-pool-search">
          <FaSearch />

          <input
            type="text"
            placeholder="Search by name, skill, qualification, or LGA..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {/* ============================
            LOADING
        ============================ */}

        {loading && (
          <div className="talent-pool-message">
            <p>Loading available talent...</p>
          </div>
        )}

        {/* ============================
            ERROR
        ============================ */}

        {!loading && error && (
          <div className="talent-pool-message">
            <h3>Unable to Load Talent Pool</h3>
            <p>{error}</p>
          </div>
        )}

        {/* ============================
            RESULTS
        ============================ */}

        {!loading && !error && (
          <>
            <div className="talent-pool-results-header">
              <div>
                <h2>Available Talent</h2>

                <p>
                  {filteredProfiles.length}{" "}
                  {filteredProfiles.length === 1
                    ? "candidate"
                    : "candidates"}{" "}
                  available
                </p>
              </div>
            </div>

            {filteredProfiles.length > 0 ? (
              <div className="talent-pool-grid">

                {filteredProfiles.map((profile) => (
                  <article
                    className="talent-card"
                    key={profile._id}
                  >

                    {/* Card Header */}
                    <div className="talent-card-header">

                      <div className="talent-avatar">
                        {profile.firstName?.charAt(0)}
                        {profile.lastName?.charAt(0)}
                      </div>

                      <div>
                        <h3>
                          {profile.firstName}{" "}
                          {profile.lastName}
                        </h3>

                        <span className="talent-skill">
                          {profile.primarySkill}
                        </span>
                      </div>

                    </div>

                    {/* Details */}
                    <div className="talent-card-details">

                      {profile.qualification && (
                        <div>
                          <FaGraduationCap />

                          <span>
                            {profile.qualification}

                            {profile.fieldOfStudy
                              ? ` – ${profile.fieldOfStudy}`
                              : ""}
                          </span>
                        </div>
                      )}

                      {profile.employmentStatus && (
                        <div>
                          <FaBriefcase />

                          <span>
                            {profile.employmentStatus}
                          </span>
                        </div>
                      )}

                      {(profile.preferredLocation ||
                        profile.lga) && (
                        <div>
                          <FaMapMarkerAlt />

                          <span>
                            {profile.preferredLocation ||
                              profile.lga}
                          </span>
                        </div>
                      )}

                    </div>

                    {/* Skills */}
                    {profile.professionalSkills && (
                      <div className="talent-card-skills">
                        <span>
                          {profile.professionalSkills}
                        </span>
                      </div>
                    )}

                    {/* Action */}
                    <button
                      type="button"
                      className="talent-request-btn"
                      onClick={() =>
                        openRequestModal(profile)
                      }
                    >
                      Request CV
                    </button>

                  </article>
                ))}

              </div>
            ) : (
              <div className="talent-pool-message">
                <h3>No Talent Found</h3>

                <p>
                  No employment profiles match your
                  search.
                </p>
              </div>
            )}
          </>
        )}

      </div>

      {/* =====================================================
          CV REQUEST MODAL
      ===================================================== */}

      {selectedProfile && (
        <div
          className="cv-request-overlay"
          onClick={closeRequestModal}
        >

          <div
            className="cv-request-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Modal Header */}
            <div className="cv-request-header">

              <div>
                <span>
                  CV Request
                </span>

                <h2>
                  Request Candidate CV
                </h2>
              </div>

              <button
                type="button"
                className="cv-request-close"
                onClick={closeRequestModal}
                aria-label="Close"
              >
                <FaTimes />
              </button>

            </div>

            {/* Candidate */}
            <div className="cv-request-candidate">

              <div className="talent-avatar">
                {selectedProfile.firstName?.charAt(0)}
                {selectedProfile.lastName?.charAt(0)}
              </div>

              <div>
                <strong>
                  {selectedProfile.firstName}{" "}
                  {selectedProfile.lastName}
                </strong>

                <span>
                  {selectedProfile.primarySkill}
                </span>
              </div>

            </div>

            {/* Success */}
            {requestSuccess && (
              <div className="cv-request-success">
                <strong>
                  Request Submitted
                </strong>

                <p>
                  {requestSuccess}
                </p>

                <button
                  type="button"
                  className="btn"
                  onClick={closeRequestModal}
                >
                  Done
                </button>
              </div>
            )}

            {/* Form */}
            {!requestSuccess && (
              <form
                onSubmit={handleSubmitRequest}
                className="cv-request-form"
              >

                {requestError && (
                  <div className="cv-request-error">
                    {requestError}
                  </div>
                )}

                <div className="form-group">
                  <label>
                    Organization / Company
                  </label>

                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    placeholder="Enter organization name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Contact Person
                  </label>

                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="cv-request-form-row">

                  <div className="form-group">
                    <label>
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="080..."
                      required
                    />
                  </div>

                </div>

                <div className="form-group">
                  <label>
                    Why are you interested in this candidate?
                  </label>

                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    placeholder="Briefly tell us what you are looking for..."
                    rows="4"
                    required
                  />
                </div>

                <div className="cv-request-actions">

                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={closeRequestModal}
                    disabled={requestSubmitting}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn"
                    disabled={requestSubmitting}
                  >
                    {requestSubmitting
                      ? "Submitting..."
                      : "Submit CV Request"}
                  </button>

                </div>

              </form>
            )}

          </div>

        </div>
      )}

    </section>
  );
}

export default TalentPool;