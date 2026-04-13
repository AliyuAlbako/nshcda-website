import { Link } from "react-router-dom";
import SectionTitle from "../SectionTitle";
import LeaderCard from "../leadership/LeaderCard";
import leadership from "../../data/leadership";

function LeadershipPreview() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          title="NSHCDA Council"
          subtitle="Meet the leadership driving human capital development in Nasarawa State."
        />

        <div className="grid program-grid">
          {leadership.slice(0, 3).map((leader) => (
            <LeaderCard key={leader.id} leader={leader} />
          ))}
        </div>

        <div className="section-button-center">
          <Link to="/leadership" className="btn" style={{ marginTop: "2rem" }}>
            View Full Leadership Team
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LeadershipPreview;