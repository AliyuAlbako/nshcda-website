import stats from "../data/stats";

function Dashboard() {
  return (
    <section className="page-section container">
      <h1>Impact Dashboard</h1>
      <div className="grid stat-grid">
        {stats.map((stat) => (
          <div key={stat.id} className="card stat-card">
            <h2>{stat.value}</h2>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Dashboard;