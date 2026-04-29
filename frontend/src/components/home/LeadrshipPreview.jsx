import { Link } from "react-router-dom";
import SectionTitle from "../SectionTitle";
import LeaderCard from "../leadership/LeaderCard";
import leadership from "../../data/leadership";

function LeadershipPreview() {
  const previewLeaders = leadership.principalOfficers.slice(0, 2);

  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          title="Leadership"
          subtitle="Meet the principal leadership guiding NSHCDA."
        />

        <div className="grid program-grid">
          {previewLeaders.map((leader) => (
            <LeaderCard key={leader.id} leader={leader} />
          ))}
        </div>

        <div className="section-button-center">
          <Link to="/leadership" className="btn" style={{ marginTop: "2rem" }}>
            View Leadership Structure
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LeadershipPreview;