import { Link } from "react-router-dom";
import SectionTitle from "../SectionTitle";
import GalleryCard from "../gallery/GalleryCard";
import gallery from "../../data/gallery";

function GalleryPreview() {
  return (
    <section className="section light-bg">
      <div className="container">
        <SectionTitle
          title="Events & Activities Gallery"
          subtitle="Highlights from past programs, events, and agency interventions."
        />

        <div className="grid program-grid">
          {gallery.slice(0, 3).map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>

        <div className="section-button-center">
          <Link to="/gallery" className="btn" style={{ marginTop: "2rem" }}>
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}

export default GalleryPreview;