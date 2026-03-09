function StatCard({ stat }) {
  return (
    <div className="card stat-card">
      <h3>{stat.value}</h3>
      <p>{stat.label}</p>
    </div>
  );
}

export default StatCard;