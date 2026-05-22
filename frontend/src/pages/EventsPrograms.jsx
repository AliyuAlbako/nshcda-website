import { useMemo, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import MediaCard from "../components/media/MediaCard";
import media from "../data/media";

function EventsPrograms() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [thematicFilter, setThematicFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const thematicAreas = [
    "all",
    ...new Set(media.map((item) => item.thematicArea)),
  ];

  const years = ["all", ...new Set(media.map((item) => item.year))].sort(
    (a, b) => {
      if (a === "all") return -1;
      if (b === "all") return 1;
      return b.localeCompare(a);
    }
  );

  const filteredMedia = useMemo(() => {
    return media.filter((item) => {
      const matchesType =
        typeFilter === "all" ? true : item.type === typeFilter;

      const matchesThematic =
        thematicFilter === "all"
          ? true
          : item.thematicArea === thematicFilter;

      const matchesYear = yearFilter === "all" ? true : item.year === yearFilter;

      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesType && matchesThematic && matchesYear && matchesSearch;
    });
  }, [typeFilter, thematicFilter, yearFilter, searchTerm]);

  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          title="Events & Highlights"
          subtitle="Explore NSHCDA’s past events, field activities, and program interventions across the state."
        />

        <div className="advanced-media-filters">
          <div className="media-type-buttons">
            <button
              className={typeFilter === "all" ? "active" : ""}
              onClick={() => setTypeFilter("all")}
            >
              All
            </button>

            <button
              className={typeFilter === "image" ? "active" : ""}
              onClick={() => setTypeFilter("image")}
            >
              Photos
            </button>

            <button
              className={typeFilter === "video" ? "active" : ""}
              onClick={() => setTypeFilter("video")}
            >
              Videos
            </button>
          </div>

          <div className="media-select-filters">
            <input
              type="text"
              placeholder="Search events or programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              value={thematicFilter}
              onChange={(e) => setThematicFilter(e.target.value)}
            >
              {thematicAreas.map((area) => (
                <option key={area} value={area}>
                  {area === "all" ? "All Thematic Areas" : area}
                </option>
              ))}
            </select>

            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year === "all" ? "All Years" : year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="media-results-count">
          <p>
            Showing <strong>{filteredMedia.length}</strong> item
            {filteredMedia.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid program-grid">
          {filteredMedia.length > 0 ? (
            filteredMedia.map((item) => <MediaCard key={item.id} item={item} />)
          ) : (
            <div className="no-media-found card">
              <h3>No matching items found</h3>
              <p>Try changing the filters or search term.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default EventsPrograms;