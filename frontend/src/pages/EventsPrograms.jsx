import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import MediaCard from "../components/media/MediaCard";
import media from "../data/media";

function EventsPrograms() {
  const [filter, setFilter] = useState("all");

  const filteredMedia =
    filter === "all"
      ? media
      : media.filter((item) => item.type === filter);

  return (
    <section className="section">
      <div className="container">

        <SectionTitle
          title="Events & Programs"
          subtitle="Explore NSHCDA’s past events, field activities, and program interventions across the state."
        />

        {/* FILTERS */}
        <div className="media-filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "image" ? "active" : ""}
            onClick={() => setFilter("image")}
          >
            Photos
          </button>

          <button
            className={filter === "video" ? "active" : ""}
            onClick={() => setFilter("video")}
          >
            Videos
          </button>
        </div>

        {/* GRID */}
        <div className="grid">
          {filteredMedia.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default EventsPrograms;