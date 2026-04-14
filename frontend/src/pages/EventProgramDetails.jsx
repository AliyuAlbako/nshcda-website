import { Link, useParams } from "react-router-dom";
import media from "../data/media";
import MediaCard from "../components/media/MediaCard";

function EventProgramDetails() {
  const { id } = useParams();
  const item = media.find((entry) => String(entry.id) === id);

  if (!item) {
    return (
      <section className="page-section">
        <div className="container">
          <div className="card">
            <h1>Item Not Found</h1>
            <p>The requested event or program could not be found.</p>
            <Link to="/events-programs" className="btn" style={{ marginTop: "1rem" }}>
              Back to Events & Programs
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const relatedItems = media
    .filter(
      (entry) =>
        entry.id !== item.id &&
        entry.thematicArea === item.thematicArea
    )
    .slice(0, 3);

  return (
    <section className="page-section">
      <div className="container">
        <div className="event-details card">
          <div className="event-details-top">
            <span className="category-badge">{item.thematicArea}</span>
            <span className="source-badge">{item.year}</span>
          </div>

          <h1>{item.title}</h1>

          <div className="details-meta">
            <p><strong>Date:</strong> {item.date}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Type:</strong> {item.type === "video" ? "Video" : "Image"}</p>
            <p><strong>Thematic Area:</strong> {item.thematicArea}</p>
          </div>

          <div className="event-media-display">
            {item.type === "video" ? (
              <div className="video-wrapper">
                <iframe
                  src={item.mediaUrl}
                  title={item.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <img
                src={item.mediaUrl}
                alt={item.title}
                className="event-detail-image"
              />
            )}
          </div>

          <div className="details-section">
            <h3>Overview</h3>
            <p>{item.description}</p>
          </div>

          <div className="details-section">
            <h3>Details</h3>
            <p>{item.fullDescription}</p>
          </div>

          <div className="details-actions">
            <Link to="/events-programs" className="btn btn-outline-dark">
              Back to Events & Programs
            </Link>
          </div>
        </div>

        {relatedItems.length > 0 && (
          <div style={{ marginTop: "4rem" }}>
            <h2 className="staff-group-title">Related Events & Programs</h2>
            <div className="grid">
              {relatedItems.map((related) => (
                <MediaCard key={related.id} item={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default EventProgramDetails;