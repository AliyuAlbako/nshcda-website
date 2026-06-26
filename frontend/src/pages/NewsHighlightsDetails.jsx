import { Link, useParams } from "react-router-dom";
import media from "../data/newsHighlights";
import MediaCard from "../components/media/MediaCard";

function NewsHighlightsDetails() {
  const { slug } = useParams();

  const item = media.find(
    (entry) => entry.slug === slug
  );

  if (!item) {
    return (
      <section className="page-section">
        <div className="container">
          <div className="card">
            <h1>Item Not Found</h1>

            <p>
              The requested story could not be found.
            </p>

            <Link
              to="/news-highlights"
              className="btn"
              style={{ marginTop: "1rem" }}
            >
              Back to News & Highlights
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const relatedItems = media
    .filter((entry) => entry.id !== item.id)
    .slice(0, 3);

  return (
    <section className="page-section">
      <div className="container">

        <article className="event-details card">

          <span className="article-badge">
            {item.category === "news"
              ? "News"
              : "Highlight"}
          </span>

          <h1>{item.title}</h1>

          <p className="article-meta">
            {item.date} • {item.location}
          </p>

          <div className="event-media-display">
            {item.type === "video" ? (
              <div className="video-wrapper">
                <iframe
                  src={item.mediaUrl}
                  title={item.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={item.mediaUrl}
                alt={item.title}
                className="event-detail-image"
              />
            )}
          </div>

          <div className="article-content">
            <p>{item.description}</p>

            <p>{item.fullDescription}</p>
          </div>

          <div className="details-actions">
            <Link
              to="/news-highlights"
              className="btn btn-outline-dark"
            >
              Back to News & Highlights
            </Link>
          </div>

        </article>

        {relatedItems.length > 0 && (
          <div style={{ marginTop: "4rem" }}>
            <h2 className="staff-group-title">
              Related Stories
            </h2>

            <div className="grid">
              {relatedItems.map((related) => (
                <MediaCard
                  key={related.id}
                  item={related}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export default NewsHighlightsDetails;