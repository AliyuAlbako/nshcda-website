function MapFilters({
  thematicArea,
  setThematicArea,
  status,
  setStatus,
  year,
  setYear,
  thematicAreas,
  years,
}) {
  return (
    <div className="card map-filters">
      <div className="filter-group">
        <label>Thematic Area</label>
        <select
          value={thematicArea}
          onChange={(e) => setThematicArea(e.target.value)}
        >
          <option value="">All</option>
          {thematicAreas.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Year</label>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">All</option>
          {years.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default MapFilters;