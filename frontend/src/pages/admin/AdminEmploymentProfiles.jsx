import { useEffect, useState } from "react";
import { getEmploymentProfiles } from "../../services/adminEmploymentProfileService";

function AdminEmploymentProfiles() {

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

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

            </tr>

          </thead>

          <tbody>

            {profiles.map((profile) => (

              <tr key={profile._id}>

                <td>
                  {profile.firstName} {profile.lastName}
                </td>

                <td>{profile.email}</td>

                <td>{profile.phone}</td>

                <td>{profile.qualification}</td>

                <td>{profile.primarySkill}</td>

                <td>{profile.status}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default AdminEmploymentProfiles;