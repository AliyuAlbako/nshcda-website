import SectionTitle from "../SectionTitle";
import MediaCard from "../media/MediaCard";
import media from "../../data/newsHighlights";

function MediaPreview() {
  const featured = media.filter((item) => item.featured).slice(0, 3);

  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          title="Events & Highlights"
          subtitle="Highlights from our past events, programs, and interventions."
        />

        <div className="grid">
          {featured.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <a href="/news-highlights"className="btn">
            Explore Events & Highlights
          </a>
        </div>
      </div>
    </section>
  );
}

export default MediaPreview;