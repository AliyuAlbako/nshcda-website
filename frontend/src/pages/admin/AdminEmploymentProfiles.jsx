import { useEffect, useState } from "react";
import { getEmploymentProfiles } from "../../services/adminEmploymentProfileService";

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

  if (loading) {
    return <h2>Loading Employment Profiles...</h2>;
  }

  return (
    <div>
      <div className="admin-page-header">
        <h1>Employment Profiles</h1>

        <p>
          Registered citizens on the NSHCDA Opportunities Portal.
        </p>
      </div>

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
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No employment profiles found.
                </td>
              </tr>
            ) : (
              profiles.map((profile) => (
                <tr key={profile._id}>
                  <td>
                    {profile.firstName} {profile.lastName}
                  </td>

                  <td>{profile.email}</td>

                  <td>{profile.phone}</td>

                  <td>{profile.qualification}</td>

                  <td>{profile.primarySkill}</td>

                  <td>{profile.status}</td>

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
    <span>No CV</span>
  )}
</td>

<td className="admin-actions">
  <button
    className="admin-btn admin-btn-view"
    onClick={() => setSelectedProfile(profile)}
  >
    View
  </button>

  <button
    className="admin-btn admin-btn-delete"
  >
    Delete
  </button>
</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    

            {selectedProfile && (
  <div className="admin-modal-overlay">
    <div className="admin-modal">

      <div className="admin-modal-header">
        <h2>Employment Profile</h2>

        <button
          className="admin-close-btn"
          onClick={() => setSelectedProfile(null)}
        >
          ✕
        </button>
      </div>

      <div className="admin-modal-body">

        <p><strong>Name:</strong> {selectedProfile.firstName} {selectedProfile.lastName}</p>

        <p><strong>Email:</strong> {selectedProfile.email}</p>

        <p><strong>Phone:</strong> {selectedProfile.phone}</p>

        <p><strong>Gender:</strong> {selectedProfile.gender}</p>

        <p><strong>Date of Birth:</strong> {selectedProfile.dateOfBirth}</p>

        <p><strong>Address:</strong> {selectedProfile.address}</p>

        <p><strong>LGA:</strong> {selectedProfile.lga}</p>

        <p><strong>Qualification:</strong> {selectedProfile.qualification}</p>

        <p><strong>Institution:</strong> {selectedProfile.institution}</p>

        <p><strong>Employment Status:</strong> {selectedProfile.status}</p>

        <p><strong>Primary Skill:</strong> {selectedProfile.primarySkill}</p>

        <p><strong>Years of Experience:</strong> {selectedProfile.yearsOfExperience}</p>

       {selectedProfile.cv?.url && (
          <p>
            <strong>CV:</strong>{" "}
            <a
      href={selectedProfile.cv.url}
      target="_blank"
      rel="noopener noreferrer"
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