import { useState } from "react";

import lgaPrograms from "../data/lgaPrograms";

import MapStats from "../components/map/MapStats";
import LgaDetailsPanel from "../components/map/LgaDetailsPanel";
import NasarawaLeafletMap from "../components/map/NasarawaLeafletMap";

function HumanCapitalMap() {
  const [selectedLga, setSelectedLga] = useState("");

  // Count how many recorded interventions exist per LGA
  const lgaCounts = lgaPrograms.reduce((acc, item) => {
    acc[item.lga] = (acc[item.lga] || 0) + 1;
    return acc;
  }, {});

  const selectedLgaData = lgaPrograms.filter(
    (item) => item.lga === selectedLga
  );

  return (
    <section className="page-section container">

      {/* Hero */}
      <div className="map-hero">

        <span className="map-hero-badge">
          Interactive Decision Support Tool
        </span>

        <h1>Human Capital Development Map</h1>

        <p>
          Explore the geographic distribution of NSHCDA
          programmes, interventions and human capital
          development initiatives implemented across the
          13 Local Government Areas of Nasarawa State.
        </p>

      </div>

      {/* Platform Overview */}
      <MapStats />

      {/* Interactive Map */}
      <div className="map-layout">

        <NasarawaLeafletMap
          selectedLga={selectedLga}
          setSelectedLga={setSelectedLga}
          lgaCounts={lgaCounts}
          programData={lgaPrograms}
        />

        <LgaDetailsPanel
          selectedLga={selectedLga}
          lgaData={selectedLgaData}
        />

      </div>

      {/* About the Map */}
      <div className="card map-about">

        <h2>About the Human Capital Development Map</h2>

        <p>
          The Human Capital Development Map provides a
          geographic overview of NSHCDA programmes and
          interventions implemented across Nasarawa State.
          It demonstrates the Agency's commitment to
          inclusive development across the thirteen Local
          Government Areas.
        </p>

        <p>
          As the NSHCDA Digital Platform evolves,
          additional programme records, beneficiary
          statistics and implementation reports will be
          integrated to provide richer analytics and
          decision-support capabilities.
        </p>

      </div>

    </section>
  );
}

export default HumanCapitalMap;