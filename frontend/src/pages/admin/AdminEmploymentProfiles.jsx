import { useEffect, useState } from "react";
import {
  getEmploymentProfiles,
  deleteEmploymentProfile,
} from "../../services/adminEmploymentProfileService";

function AdminEmploymentProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      const response = await getEmploymentProfiles();

      setProfiles(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (profile) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the employment profile for ${profile.firstName} ${profile.lastName}?\n\nThis will permanently remove the profile and its CV.`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteEmploymentProfile(profile._id);

      setProfiles((prevProfiles) =>
        prevProfiles.filter((item) => item._id !== profile._id)
      );

      if (selectedProfile?._id === profile._id) {
        setSelectedProfile(null);
      }

      alert("Employment profile deleted successfully.");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete employment profile."
      );
    }
  };

  if (loading) {
    return <h2>Loading Employment Profiles...</h2>;
  }

  return (
    <div>
      {/* ================= PAGE HEADER ================= */}

      <div className="admin-page-header">
        <h1>Employment Profiles</h1>

        <p>
          Registered citizens on the NSHCDA Opportunities Portal.
        </p>
      </div>

      {/* ================= PROFILES TABLE ================= */}

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Qualification</th>
              <th>Primary Skill</th>
              <th>Status</th>
              <th>CV</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {profiles.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No employment profiles found.
                </td>
              </tr>
            ) : (
              profiles.map((profile) => (
                <tr key={profile._id}>
                  {/* Name */}
                  <td>
                    {profile.firstName} {profile.lastName}
                  </td>

                  {/* Email */}
                  <td>{profile.email}</td>

                  {/* Phone */}
                  <td>{profile.phone}</td>

                  {/* Qualification */}
                  <td>{profile.qualification}</td>

                  {/* Primary Skill */}
                  <td>{profile.primarySkill}</td>

                  {/* Status */}
                  <td>{profile.status}</td>

                  {/* CV */}
                  <td>
                    {profile.cv?.url ? (
                      <a
                        href={profile.cv.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-link"
                      >
                        {profile.cv.fileType === "application/pdf"
                          ? "Open CV"
                          : "Download CV"}
                      </a>
                    ) : (
                      "No CV"
                    )}
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="admin-actions">
                      <button
                        type="button"
                        className="admin-btn admin-btn-view"
                        onClick={() => setSelectedProfile(profile)}
                      >
                        View
                      </button>

                      <button
                        type="button"
                        className="admin-btn admin-btn-delete"
                        onClick={() => handleDelete(profile)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= PROFILE MODAL ================= */}

      {selectedProfile && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">

            <div className="admin-modal-header">
              <h2>Employment Profile</h2>

              <button
                type="button"
                className="admin-close-btn"
                onClick={() => setSelectedProfile(null)}
              >
                ✕
              </button>
            </div>

            <div className="admin-modal-body">

              <p>
                <strong>Name:</strong>{" "}
                {selectedProfile.firstName}{" "}
                {selectedProfile.lastName}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {selectedProfile.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {selectedProfile.phone}
              </p>

              <p>
                <strong>Gender:</strong>{" "}
                {selectedProfile.gender}
              </p>

              <p>
                <strong>Date of Birth:</strong>{" "}
                {selectedProfile.dateOfBirth
                  ? new Date(
                      selectedProfile.dateOfBirth
                    ).toLocaleDateString()
                  : "N/A"}
              </p>

              <p>
                <strong>Address:</strong>{" "}
                {selectedProfile.address}
              </p>

              <p>
                <strong>LGA:</strong>{" "}
                {selectedProfile.lga}
              </p>

              <p>
                <strong>Qualification:</strong>{" "}
                {selectedProfile.qualification}
              </p>

              <p>
                <strong>Field of Study:</strong>{" "}
                {selectedProfile.fieldOfStudy || "N/A"}
              </p>

              <p>
                <strong>Institution:</strong>{" "}
                {selectedProfile.institution}
              </p>

              <p>
                <strong>Graduation Year:</strong>{" "}
                {selectedProfile.graduationYear || "N/A"}
              </p>

              <p>
                <strong>Grade:</strong>{" "}
                {selectedProfile.grade || "N/A"}
              </p>

              <p>
                <strong>NYSC Status:</strong>{" "}
                {selectedProfile.nyscStatus || "N/A"}
              </p>

              <p>
                <strong>Employment Status:</strong>{" "}
                {selectedProfile.employmentStatus || "N/A"}
              </p>

              <p>
                <strong>Experience:</strong>{" "}
                {selectedProfile.experience || "N/A"}
              </p>

              <p>
                <strong>Employment Type:</strong>{" "}
                {selectedProfile.employmentType || "N/A"}
              </p>

              <p>
                <strong>Sector:</strong>{" "}
                {selectedProfile.sector || "N/A"}
              </p>

              <p>
                <strong>Preferred Location:</strong>{" "}
                {selectedProfile.preferredLocation || "N/A"}
              </p>

              <p>
                <strong>Primary Skill:</strong>{" "}
                {selectedProfile.primarySkill}
              </p>

              <p>
                <strong>Languages:</strong>{" "}
                {selectedProfile.languages || "N/A"}
              </p>

              <p>
                <strong>Professional Skills:</strong>{" "}
                {selectedProfile.professionalSkills || "N/A"}
              </p>

              <p>
                <strong>Certifications:</strong>{" "}
                {selectedProfile.certifications || "N/A"}
              </p>

              <p>
                <strong>Career Interests:</strong>{" "}
                {selectedProfile.careerInterests || "N/A"}
              </p>

              <p>
                <strong>Talent Pool Visibility:</strong>{" "}
                {selectedProfile.talentPoolVisible
                  ? "Visible to Employers"
                  : "Hidden from Employers"}
              </p>

              {/* CV */}
              {selectedProfile.cv?.url && (
                <p>
                  <strong>CV:</strong>{" "}
                  <a
                    href={selectedProfile.cv.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-link"
                  >
                    {selectedProfile.cv.fileType === "application/pdf"
                      ? "Open CV"
                      : "Download CV"}
                  </a>
                </p>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminEmploymentProfiles;