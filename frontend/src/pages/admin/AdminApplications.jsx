import { useEffect, useState } from "react";
import axios from "axios";
import ApplicationsTable from "../../components/admin/ApplicationsTable";

function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("adminToken");

        const response = await axios.get(`${API_URL}/api/applications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setApplications(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [API_URL]);

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await axios.patch(
        `${API_URL}/api/applications/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications((prev) =>
        prev.map((item) =>
          item._id === id ? response.data.application : item
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update application status");
    }
  };

  return (
    <section className="admin-page">
      <div className="admin-page-header">
        <h1>Applications</h1>
        <p>Review submitted applications and update their status.</p>
      </div>

      {loading ? (
        <div className="card">
          <p>Loading applications...</p>
        </div>
      ) : error ? (
        <div className="card">
          <p>{error}</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="card">
          <p>No applications found.</p>
        </div>
      ) : (
        <ApplicationsTable
          applications={applications}
          onStatusChange={handleStatusChange}
        />
      )}
    </section>
  );
}

export default AdminApplications;