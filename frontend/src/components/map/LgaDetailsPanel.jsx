function LgaDetailsPanel({ selectedLga, lgaData }) {
  if (!selectedLga) {
    return (
      <div className="card lga-panel">
        <h2>Select an LGA</h2>
        <p>Click an LGA from the map area to view programs and impact details.</p>
      </div>
    );
  }

  const totalPrograms = lgaData.length;
  const totalBeneficiaries = lgaData.reduce(
    (sum, item) => sum + item.beneficiaries,
    0
  );

  const thematicAreas = [...new Set(lgaData.map((item) => item.thematicArea))];

  return (
    <div className="card lga-panel">
      <h2>{selectedLga}</h2>
      <p><strong>Programs:</strong> {totalPrograms}</p>
      <p><strong>Beneficiaries Reached:</strong> {totalBeneficiaries}</p>
      <p><strong>Thematic Areas:</strong> {thematicAreas.join(", ")}</p>

      <div className="lga-program-list">
        <h3>Programs in this LGA</h3>
        {lgaData.map((item) => (
          <div key={item.id} className="lga-program-item">
            <h4>{item.programTitle}</h4>
            <p><strong>Thematic Area:</strong> {item.thematicArea}</p>
            <p><strong>Status:</strong> {item.status}</p>
            <p><strong>Beneficiaries:</strong> {item.beneficiaries}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LgaDetailsPanel;