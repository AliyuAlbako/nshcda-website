import { useMemo, useState, useEffect } from "react";
import lgaPrograms from "../data/lgaPrograms";
import MapStats from "../components/map/MapStats";
import MapFilters from "../components/map/MapFilters";
// import NasarawaMapPlaceholder from "../components/map/NasarawaMapPlaceholder";
import LgaDetailsPanel from "../components/map/LgaDetailsPanel";
import NasarawaLeafletMap from "../components/map/NasarawaLeafletMap";

function HumanCapitalMap() {
  const [thematicArea, setThematicArea] = useState("");
  const [status, setStatus] = useState("");
  const [year, setYear] = useState("");
  const [selectedLga, setSelectedLga] = useState("");

  const thematicAreas = [...new Set(lgaPrograms.map((item) => item.thematicArea))];
  const years = [...new Set(lgaPrograms.map((item) => item.year))];

  const filteredData = useMemo(() => {
    return lgaPrograms.filter((item) => {
      const matchesThematic = thematicArea ? item.thematicArea === thematicArea : true;
      const matchesStatus = status ? item.status === status : true;
      const matchesYear = year ? String(item.year) === String(year) : true;

      return matchesThematic && matchesStatus && matchesYear;
    });
  }, [thematicArea, status, year]);

  const lgas = [...new Set(filteredData.map((item) => item.lga))].sort();

  const lgaCounts = filteredData.reduce((acc, item) => {
    acc[item.lga] = (acc[item.lga] || 0) + 1;
    return acc;
  }, {});

  const stats = {
    totalLgas: lgas.length,
    totalPrograms: filteredData.length,
    totalBeneficiaries: filteredData.reduce(
      (sum, item) => sum + item.beneficiaries,
      0
    ),
    activePrograms: filteredData.filter((item) => item.status === "Ongoing").length,
  };

  useEffect(() => {
    if (selectedLga && !lgas.includes(selectedLga)) {
      setSelectedLga("");
    }
  }, [filteredData, lgas, selectedLga]);

  const selectedLgaData = filteredData.filter((item) => item.lga === selectedLga);

  return (
    <section className="page-section container">
      <div className="map-page-header">
        <h1>Human Capital Map Dashboard</h1>
        <p>
          Track NSHCDA interventions across Nasarawa State by LGA, thematic area,
          status, and year.
        </p>
      </div>

      <MapStats stats={stats} />

      <div style={{ marginTop: "2rem" }}>
        <MapFilters
          thematicArea={thematicArea}
          setThematicArea={setThematicArea}
          status={status}
          setStatus={setStatus}
          year={year}
          setYear={setYear}
          thematicAreas={thematicAreas}
          years={years}
        />
      </div>

      <div className="map-layout">
        <NasarawaLeafletMap
        selectedLga={selectedLga}
        setSelectedLga={setSelectedLga}
        lgaCounts={lgaCounts}
        filteredData={filteredData}
        />

        <LgaDetailsPanel
          selectedLga={selectedLga}
          lgaData={selectedLgaData}
        />
      </div>
    </section>
  );
}

export default HumanCapitalMap;