import nigeriaGeoJson from "../../data/geo/nigeria-lga.geojson";

const nasarawaFeatures = nigeriaGeoJson.features.filter(
  (feature) =>
    feature.properties.state === "Nasarawa" ||
    feature.properties.STATE === "Nasarawa"
);

function NasarawaMapPlaceholder({ lgas, selectedLga, setSelectedLga, lgaCounts }) {
  return (
    <div className="card map-placeholder">
      <h2>Nasarawa State LGAs</h2>
      <p>Prototype view: click an LGA to see intervention details.</p>

      <div className="lga-grid">
        {lgas.map((lga) => (
          <button
            key={lga}
            className={`lga-button ${selectedLga === lga ? "active" : ""}`}
            onClick={() => setSelectedLga(lga)}
          >
            <span>{lga}</span>
            <small>{lgaCounts[lga] || 0} program(s)</small>
          </button>
        ))}
      </div>
    </div>
  );
}

export default NasarawaMapPlaceholder;