import { useEffect, useState } from "react";

function NasarawaMapPlaceholder({
  lgas,
  selectedLga,
  setSelectedLga,
  lgaCounts,
}) {
  const [nasarawaFeatures, setNasarawaFeatures] = useState([]);

  useEffect(() => {
    fetch("/geo/nigeria-lga.geojson")
      .then((res) => res.json())
      .then((data) => {
        const filteredFeatures = data.features.filter(
          (feature) =>
            feature.properties?.state === "Nasarawa" ||
            feature.properties?.STATE === "Nasarawa"
        );

        setNasarawaFeatures(filteredFeatures);
      })
      .catch((err) => {
        console.error("Failed to load GeoJSON:", err);
      });
  }, []);

  return (
    <div className="card map-placeholder">
      <h2>Nasarawa State LGAs</h2>

      <p>
        Prototype view: click an LGA to see intervention details.
      </p>

      {/* Optional debug info */}
      <small>
        {nasarawaFeatures.length} LGA boundaries loaded
      </small>

      <div className="lga-grid">
        {lgas.map((lga) => (
          <button
            key={lga}
            className={`lga-button ${
              selectedLga === lga ? "active" : ""
            }`}
            onClick={() => setSelectedLga(lga)}
          >
            <span>{lga}</span>

            <small>
              {lgaCounts[lga] || 0} program(s)
            </small>
          </button>
        ))}
      </div>
    </div>
  );
}

export default NasarawaMapPlaceholder;