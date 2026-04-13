import { Link } from "react-router-dom";

function OpportunityCard({ item }) {
  return (
    <div className="card opportunity-card">
      <div className="opportunity-top">
        <span className={`status-badge ${item.status.toLowerCase()}`}>
          {item.status}
        </span>
        <span className="category-badge">{item.category}</span>
      </div>

      <div className="opportunity-meta-top">
        <span className={`mode-badge ${item.applicationMode}`}>
          {item.applicationMode === "internal"
            ? "Internal Opportunity"
            : "External Opportunity"}
        </span>
        <span className="source-badge">{item.source}</span>
      </div>

      <h3>{item.title}</h3>

      <p><strong>Thematic Area:</strong> {item.thematicArea}</p>
      <p><strong>Location:</strong> {item.location}</p>
      <p><strong>Deadline:</strong> {item.deadline}</p>

      <p className="opportunity-desc">{item.description}</p>

      <Link to={`/opportunities/${item.id}`} className="btn">
        View Details
      </Link>
    </div>
  );
}

export default OpportunityCard;