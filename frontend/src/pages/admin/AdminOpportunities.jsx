import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getOpportunities,
  deleteOpportunity,
} from "../../services/adminOpportunityService";

function AdminOpportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadOpportunities();
  }, []);

  const loadOpportunities = async () => {
    try {
      const response = await getOpportunities();
      setOpportunities(response.data || []);
    } catch (error) {
      console.error("Failed to load opportunities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (opportunity) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${opportunity.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteOpportunity(opportunity._id);

      setOpportunities((prev) =>
        prev.filter((item) => item._id !== opportunity._id)
      );

      alert("Opportunity deleted successfully.");
    } catch (error) {
      console.error("Failed to delete opportunity:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete opportunity."
      );
    }
  };

  if (loading) {
    return (
      <section className="admin-page">
        <div className="admin-page-header">
          <h1>Opportunities</h1>
          <p>Loading published opportunities...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-page">

      <div className="admin-page-header">

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "1rem",
      flexWrap: "wrap",
    }}
  >
    <div>
      <h1>Opportunities</h1>

      <p>
        Manage published opportunities across the platform.
      </p>
    </div>

    <button
      type="button"
      className="btn"
      onClick={() => navigate("/admin/opportunities/new")}
    >
      + Post Opportunity
    </button>
  </div>

</div>

      <div className="admin-table-wrapper">

        <table className="admin-table">

          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Organization</th>
              <th>Location</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {opportunities.length === 0 ? (

              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center" }}
                >
                  No opportunities have been published yet.
                </td>
              </tr>

            ) : (

              opportunities.map((opportunity) => (

                <tr key={opportunity._id}>

                  <td>
                    {opportunity.title}
                  </td>

                  <td>
                    {opportunity.type}
                  </td>

                  <td>
                    {opportunity.organization}
                  </td>

                  <td>
                    {opportunity.location}
                  </td>

                  <td>
                    {opportunity.deadline}
                  </td>

                  <td>
                    {opportunity.status}
                  </td>

                  <td>

                    <div className="admin-actions">

  <button
    type="button"
    className="admin-btn admin-btn-view"
    onClick={() =>
      navigate(`/admin/opportunities/${opportunity._id}/edit`)
    }
  >
    Edit
  </button>

                      <button
                        type="button"
                        className="admin-btn admin-btn-delete"
                        onClick={() =>
                          handleDelete(opportunity)
                        }
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

    </section>
  );
}

export default AdminOpportunities;