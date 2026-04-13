import SectionTitle from "../components/SectionTitle";
import GalleryCard from "../components/gallery/GalleryCard";
import gallery from "../data/gallery";

function Gallery() {
  return (
    <section className="page-section">
      <div className="container">
        <SectionTitle
          title="Events & Activities Gallery"
          subtitle="Explore photos and highlights from NSHCDA programs, outreach activities, and stakeholder engagements."
        />

        <div className="grid program-grid">
          {gallery.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;