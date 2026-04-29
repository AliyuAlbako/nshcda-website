import { useEffect, useState } from "react";
import axios from "axios";
import DashboardStatCard from "../../components/admin/DashboardStatCard";

function AdminDashboard() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    shortlistedApplications: 0,
    totalOpportunities: 0,
    openOpportunities: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("adminToken");

        const response = await axios.get(`${API_URL}/api/dashboard/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [API_URL]);

  if (loading) {
    return (
      <section className="admin-page">
        <div className="admin-page-header">
          <h1>Dashboard</h1>
          <p>Loading dashboard statistics...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="admin-page">
        <div className="admin-page-header">
          <h1>Dashboard</h1>
          <p className="form-error">{error}</p>
        </div>
      </section>
    );
  }

  const safe = (v) => (typeof v === "number" ? v : 0);

const dashboardStats = [
  { title: "Total Applications", value: safe(stats.totalApplications) },
  { title: "Pending Reviews", value: safe(stats.pendingApplications) },
  { title: "Shortlisted", value: safe(stats.shortlistedApplications) },
  { title: "Total Opportunities", value: safe(stats.totalOpportunities) },
  { title: "Open Opportunities", value: safe(stats.openOpportunities) },
];
  return (
    <section className="admin-page">
      <div className="admin-page-header">
        <h1>Dashboard</h1>
        <p>Overview of opportunities and applicant activity.</p>
      </div>

      <div className="admin-stats-grid">
        {dashboardStats.map((stat) => (
          <DashboardStatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>
    </section>
  );
}

export default AdminDashboard;