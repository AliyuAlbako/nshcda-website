function OpportunityFilters({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  status,
  setStatus,
  categories,
}) {
  return (
    <div className="card opportunity-filters">
      <input
        type="text"
        placeholder="Search opportunities..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Status</option>
        <option value="Open">Open</option>
        <option value="Closed">Closed</option>
      </select>
    </div>
  );
}

export default OpportunityFilters;