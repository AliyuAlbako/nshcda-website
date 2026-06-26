import { Link } from "react-router-dom";

function MediaCard({ item }) {
  const badgeText =
    item.type === "video"
      ? "Video"
      : item.category === "news"
      ? "News"
      : "Highlight";

  const badgeClass =
    item.type === "video"
      ? "news-badge-video"
      : item.category === "news"
      ? "news-badge-news"
      : "news-badge-highlight";

  return (
    <article className="news-card">
      <div className="news-image-wrapper">
        <img
          src={item.thumbnail}
          alt={item.title}
        />

        <span className={`news-badge ${badgeClass}`}>
          {badgeText}
        </span>
      </div>

      <div className="news-content">
        <p className="news-meta">
          {item.date} • {item.location}
        </p>

        <h3>{item.title}</h3>

        <p className="news-description">
          {item.description}
        </p>

        <Link
         to={`/news-highlights/${item.slug}`}
         className="news-link"
          >
          Read Story →
        </Link>
      </div>
    </article>
  );
}

export default MediaCard;