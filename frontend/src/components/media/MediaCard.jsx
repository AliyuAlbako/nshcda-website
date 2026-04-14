import { Link } from "react-router-dom";

function MediaCard({ item }) {
  return (
    <div className="media-card">
      <img src={item.thumbnail} alt={item.title} />

      <div className="media-content">
        <h3>{item.title}</h3>
        <p className="media-meta">
          {item.date} • {item.location}
        </p>

        <p>{item.description}</p>

        <Link to={`/events-programs/${item.id}`} className="btn">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default MediaCard;