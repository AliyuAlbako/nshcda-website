import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { useEffect, useMemo, useState, useRef } from "react";
import L from "leaflet";

function FitBounds({ geoData }) {
  const map = useMap();

  useEffect(() => {
    if (!geoData || !geoData.features?.length) return;

    const layer = L.geoJSON(geoData);
    const bounds = layer.getBounds();

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [geoData, map]);

  return null;
}

function NasarawaLeafletMap({
  selectedLga,
  setSelectedLga,
  lgaCounts,
  filteredData,
}) {
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const loadGeoJson = async () => {
      try {
        setLoading(true);
        setLoadError("");

        const response = await fetch("/geo/nigeria-lga.geojson");
        if (!response.ok) {
          throw new Error(`Failed to load GeoJSON: ${response.status}`);
        }

        const nigeriaGeoJson = await response.json();

        const nasarawaGeoJson = {
          type: "FeatureCollection",
          features: nigeriaGeoJson.features.filter((feature) => {
            const stateName = String(feature?.properties?.NAME_1 || "")
              .trim()
              .toLowerCase();

            return stateName === "nassarawa" || stateName === "nasarawa";
          }),
        };

        console.log("Nasarawa features:", nasarawaGeoJson.features.length);
        console.log(
          "Nasarawa LGAs:",
          nasarawaGeoJson.features.map((f) => f?.properties?.NAME_2)
        );

        setGeoData(nasarawaGeoJson);
      } catch (error) {
        console.error("Error loading GeoJSON:", error);
        setLoadError("Unable to load map data.");
      } finally {
        setLoading(false);
      }
    };

    loadGeoJson();
  }, []);

  const getLgaName = (feature) => feature?.properties?.NAME_2 || "";

  const getFillColor = (count) => {
    if (count >= 6) return "#0B3D2E";
    if (count >= 3) return "#2F6B57";
    if (count >= 1) return "#8DB9A6";
    return "#D9E7E0";
  };

  const styleFeature = (feature) => {
    const lgaName = getLgaName(feature);
    const count = lgaCounts[lgaName] || 0;
    const isSelected = selectedLga === lgaName;

    return {
      fillColor: getFillColor(count),
      weight: isSelected ? 3 : 2,
      opacity: 1,
      color: isSelected ? "#F4B400" : "#ff0000",
      fillOpacity: 0.7,
    };
  };

  const onEachFeature = (feature, layer) => {
    const lgaName = getLgaName(feature);
    const lgaItems = filteredData.filter((item) => item.lga === lgaName);
    const beneficiaries = lgaItems.reduce(
      (sum, item) => sum + item.beneficiaries,
      0
    );

    layer.on({
      click: () => {
        setSelectedLga(lgaName);
      },
      mouseover: (e) => {
        e.target.setStyle({
          weight: 3,
          color: "#F4B400",
          fillOpacity: 0.95,
        });
      },
      mouseout: (e) => {
        e.target.setStyle(styleFeature(feature));
      },
    });

    layer.bindPopup(`
      <div>
        <strong>${lgaName}</strong><br/>
        Programs: ${lgaItems.length}<br/>
        Beneficiaries: ${beneficiaries}
      </div>
    `);
  };

  const geoJsonKey = useMemo(() => {
    return `${selectedLga}-${Object.entries(lgaCounts)
      .map(([k, v]) => `${k}:${v}`)
      .join("|")}`;
  }, [selectedLga, lgaCounts]);

  if (loading) {
    return (
      <div className="card leaflet-map-card">
        <h2>NSHCDA Human Capital Map</h2>
        <p>Loading map data...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="card leaflet-map-card">
        <h2>NSHCDA Human Capital Map</h2>
        <p>{loadError}</p>
      </div>
    );
  }

  if (!geoData || !geoData.features?.length) {
    return (
      <div className="card leaflet-map-card">
        <h2>NSHCDA Human Capital Map</h2>
        <p>No Nasarawa LGA boundary data found in the file.</p>
      </div>
    );
  }

  return (
    <div className="card leaflet-map-card">
      <h2>NSHCDA Human Capital Map</h2>
      <p>Click an LGA to view intervention details.</p>

      <div className="leaflet-map-wrapper">
        <MapContainer
          center={[8.55, 8.55]}
          zoom={8}
          scrollWheelZoom={true}
          className="leaflet-map"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FitBounds geoData={geoData} />

          <GeoJSON
            key={geoJsonKey}
            data={geoData}
            style={styleFeature}
            onEachFeature={onEachFeature}
          />
        </MapContainer>
      </div>

      <div className="map-legend">
        <div>
          <span className="legend-box level-0"></span> No programs
        </div>
        <div>
          <span className="legend-box level-1"></span> 1–2 programs
        </div>
        <div>
          <span className="legend-box level-2"></span> 3–5 programs
        </div>
        <div>
          <span className="legend-box level-3"></span> 6+ programs
        </div>
      </div>
    </div>
  );
}

export default NasarawaLeafletMap;