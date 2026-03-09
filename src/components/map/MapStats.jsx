function MapStats({ stats }) {
  return (
    <div className="grid stat-grid">
      <div className="card stat-card">
        <h3>{stats.totalLgas}</h3>
        <p>LGAs Reached</p>
      </div>

      <div className="card stat-card">
        <h3>{stats.totalPrograms}</h3>
        <p>Total Programs</p>
      </div>

      <div className="card stat-card">
        <h3>{stats.totalBeneficiaries}</h3>
        <p>Total Beneficiaries</p>
      </div>

      <div className="card stat-card">
        <h3>{stats.activePrograms}</h3>
        <p>Active Programs</p>
      </div>
    </div>
  );
}

export default MapStats;