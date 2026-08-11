import { Link } from "react-router-dom";

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBuilding,
  FaArrowRight,
} from "react-icons/fa";

function OpportunityCard({ item }) {
  return (
    <div className="opportunity-card">

      {/* Header */}
      <div className="opportunity-card-header">

        <span
          className={`status-badge ${item.status.toLowerCase()}`}
        >
          {item.status}
        </span>

        <span className="category-badge">
          {item.type}
        </span>

      </div>

      {/* Title */}
      <h3>{item.title}</h3>

      {/* Meta */}
      <div className="opportunity-meta">

        <div>
          <FaBuilding />
          <span>{item.organization}</span>
        </div>

        <div>
          <FaMapMarkerAlt />
          <span>{item.location}</span>
        </div>

        <div>
          <FaCalendarAlt />
          <span>{item.deadline}</span>
        </div>

      </div>

      {/* Description */}
      <p className="opportunity-desc">
        {item.description}
      </p>

      {/* Footer */}
      <div className="opportunity-footer">

        <Link
          to={`/opportunities/${item._id}`}
          className="btn opportunity-btn"
        >
          View Details
          <FaArrowRight />
        </Link>

      </div>

    </div>
  );
}

export default OpportunityCard;