import { Link } from "react-router-dom";
import {
  FaMapMarkedAlt,
  FaChartLine,
  FaProjectDiagram,
  FaNewspaper,
} from "react-icons/fa";

function QuickLinks() {
  return (
    <section className="quick-links">
      <div className="container quick-links-grid">

        <Link to="/dashboard" className="quick-card quick-card-featured">
        <FaChartLine />

        <div className="quick-card-badge">
          Live Impact
        </div>

        <h4>Impact Dashboard</h4>

        <p>
          Explore beneficiary impact, program performance,
          statistics, and intervention coverage across
          Nasarawa State.
        </p>

        <div className="quick-card-metrics">
          <span>13 LGAs Reached</span>
          <span>6 Thematic Areas</span>
        </div>
      </Link>
        <Link to="/human-capital-map" className="quick-card">
          <FaMapMarkedAlt />
          <h4>Human Capital Map</h4>
          <p>
            Explore development interventions across
            Nasarawa LGAs.
          </p>
        </Link>

        <Link to="/programs" className="quick-card">
          <FaProjectDiagram />
          <h4>Programs</h4>
          <p>
            View current initiatives driving human
            capital development.
          </p>
        </Link>

        <Link to="/news-highlights" className="quick-card">
          <FaNewspaper />
          <h4>News & Highlights</h4>
          <p>
            Latest updates, field activities,
            success stories and announcements.
          </p>
        </Link>

      </div>
    </section>
  );
}

export default QuickLinks;