import { Link } from "react-router-dom";
import { FaMapMarkedAlt, FaChartLine, FaProjectDiagram, FaNewspaper } from "react-icons/fa";

function QuickLinks() {
  return (
    <section className="quick-links">
      <div className="container quick-links-grid">

        <Link to="/human-capital-map" className="quick-card">
          <FaMapMarkedAlt />
          <h4>Human Capital Map</h4>
          <p>Explore development interventions across Nasarawa LGAs.</p>
        </Link>

        <Link to="/programs" className="quick-card">
          <FaProjectDiagram />
          <h4>Programs</h4>
          <p>View current initiatives driving human capital development.</p>
        </Link>

        <Link to="/dashboard" className="quick-card">
          <FaChartLine />
          <h4>Impact Dashboard</h4>
          <p>Track key indicators and development statistics.</p>
        </Link>

        <Link to="/news-media" className="quick-card">
          <FaNewspaper />
          <h4>News & Media</h4>
          <p>Latest updates, field activities and announcements.</p>
        </Link>

      </div>
    </section>
  );
}

export default QuickLinks;