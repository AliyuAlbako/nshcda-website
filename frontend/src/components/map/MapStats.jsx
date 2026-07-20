function MapStats() {
  return (
    <section className="map-overview">

      <div className="map-overview-header">
        <h2>Platform Overview</h2>

        <p>
          Current representation of NSHCDA programmes and human capital
          development interventions across Nasarawa State.
        </p>
      </div>

      <div className="overview-grid">

        <div className="overview-card">
          <div className="overview-icon">🗺️</div>

          <h3>13</h3>

          <h4>LGAs Covered</h4>

          <span>Across Nasarawa State</span>
        </div>

        <div className="overview-card">
          <div className="overview-icon">📋</div>

          <h3>50+</h3>

          <h4>Recorded</h4>

          <span>Programmes & Interventions</span>
        </div>

        <div className="overview-card">
          <div className="overview-icon">👥</div>

          <h3>20,000+</h3>

          <h4>Beneficiaries Reached</h4>

          <span>Demonstration Data</span>
        </div>

        <div className="overview-card">
          <div className="overview-icon">🎯</div>

          <h3>6</h3>

          <h4>Strategic Themes</h4>

          <span>Human Capital Areas</span>
        </div>

      </div>

    </section>
  );
}

export default MapStats;