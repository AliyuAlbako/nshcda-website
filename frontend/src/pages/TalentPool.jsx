import { useEffect, useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
} from "react-icons/fa";
import API from "../services/api";

function TalentPool() {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        console.error("Failed to load talent pool:", error);

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

  return (
    <section className="page-section talent-pool-page">
      <div className="container">

        {/* Header */}
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

        {/* Search */}
        <div className="talent-pool-search">
          <FaSearch />

          <input
            type="text"
            placeholder="Search by name, skill, qualification, or LGA..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="talent-pool-message">
            <p>Loading available talent...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="talent-pool-message">
            <h3>Unable to Load Talent Pool</h3>
            <p>{error}</p>
          </div>
        )}

        {/* Results */}
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
                        alert(
                          "CV request functionality will be available soon."
                        )
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
    </section>
  );
}

export default TalentPool;