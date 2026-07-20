import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import L from "leaflet";

function FitBounds({ geoData }) {
  const map = useMap();

  useEffect(() => {
    if (!geoData?.features?.length) return;

    const layer = L.geoJSON(geoData);
    const bounds = layer.getBounds();

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [geoData, map]);

  return null;
}

function NasarawaLeafletMap({
  selectedLga = "",
  setSelectedLga = () => {},
  lgaCounts = {},
  programData = [],
}) {
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function loadGeoJson() {
      try {
        setLoading(true);

        const response = await fetch("/geo/nigeria-lga.geojson");

        if (!response.ok) {
          throw new Error("Unable to load GeoJSON.");
        }

        const nigeriaGeoJson = await response.json();

        const nasarawaGeoJson = {
          type: "FeatureCollection",
          features: nigeriaGeoJson.features.filter((feature) => {
            const state = String(
              feature?.properties?.NAME_1 || ""
            )
              .trim()
              .toLowerCase();

            return state === "nasarawa" || state === "nassarawa";
          }),
        };

        setGeoData(nasarawaGeoJson);
      } catch (err) {
        console.error(err);
        setLoadError("Unable to load map data.");
      } finally {
        setLoading(false);
      }
    }

    loadGeoJson();
  }, []);

  const getLgaName = (feature) =>
    feature?.properties?.NAME_2 || "";

  const getFillColor = (count) => {
    return count > 0 ? "#0B7A3B" : "#E5E7EB";
  };

  const styleFeature = (feature) => {
    const lgaName = getLgaName(feature);
    const isSelected = selectedLga === lgaName;

    return {
     fillColor: "#0B7A3B",
      weight: isSelected ? 3 : 2,
      color: isSelected ? "#F4B400" : "#ffffff",
      opacity: 1,
      fillOpacity: 0.8,
    };
  };

  const onEachFeature = (feature, layer) => {
    const lgaName = getLgaName(feature);

    const hasIntervention = programData.some(
      (item) => item.lga === lgaName
    );

    layer.on({
      click: () => setSelectedLga(lgaName),

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
      <div style="min-width:220px">
        <strong>${lgaName} LGA</strong>
        <hr/>
        ${
          hasIntervention
            ? "✅ NSHCDA has implemented human capital development interventions in this Local Government Area."
            : "No intervention record is currently available."
        }
      </div>
    `);

          layer.bindTooltip(lgaName, {
        direction: "top",
        sticky: true,
      });
  };

  const geoJsonKey = useMemo(() => {
    return `${selectedLga}-${Object.keys(lgaCounts).join("-")}`;
  }, [selectedLga, lgaCounts]);

  if (loading) {
    return (
      <div className="card leaflet-map-card">
        <h2>Interactive Programme Coverage Map</h2>
        <p>Loading map...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="card leaflet-map-card">
        <h2>Interactive Programme Coverage Map</h2>
        <p>{loadError}</p>
      </div>
    );
  }

  if (!geoData?.features?.length) {
    return (
      <div className="card leaflet-map-card">
        <h2>Interactive Programme Coverage Map</h2>
        <p>No Nasarawa boundary data found.</p>
      </div>
    );
  }

  return (
    <div className="card leaflet-map-card">
      <h2>Interactive Programme Coverage Map</h2>

      <p>
        Click any Local Government Area to explore
        NSHCDA intervention coverage.
      </p>

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

        {/* <h3>Legend</h3>

        <div className="legend-item">
          <span className="legend-box implemented"></span>
          Intervention Implemented
        </div> */}

        {/* <div className="legend-item">
          <span className="legend-box no-intervention"></span>
          No Recorded Intervention
        </div> */}

      </div>
    </div>
  );
}

export default NasarawaLeafletMap;