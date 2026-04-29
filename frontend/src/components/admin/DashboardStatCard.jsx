function DashboardStatCard({ title, value }) {
  return (
    <div className="admin-stat-card">
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
  );
}

export default DashboardStatCard;