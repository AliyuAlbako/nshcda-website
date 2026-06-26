import { Link } from "react-router-dom";

function HighlightCard({ item }) {
  return (
    <article className="highlight-card">
      <img
        src={item.thumbnail}
        alt={item.title}
      />

      <div className="highlight-content">
        <span className="highlight-date">
          {item.date}
        </span>

        <h3>{item.title}</h3>

        <p className="highlight-location">
          {item.location}
        </p>

        <Link
          to={`/news-highlights/${item.slug}`}
          className="highlight-link"
        >
          View Highlight →
        </Link>
      </div>
    </article>
  );
}

export default HighlightCard;