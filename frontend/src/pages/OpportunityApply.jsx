import { Link, useParams } from "react-router-dom";
import opportunities from "../data/opportunities";
import OpportunityApplicationForm from "../components/opportunities/OpportunityApplicationForm";

function OpportunityApply() {
  const { id } = useParams();
  const opportunity = opportunities.find((item) => String(item.id) === id);

  if (!opportunity) {
    return (
      <section className="page-section">
        <div className="container">
          <h1>Opportunity Not Found</h1>
          <p>The requested opportunity does not exist.</p>
        </div>
      </section>
    );
  }

  if (opportunity.applicationMode !== "internal") {
    return (
      <section className="page-section">
        <div className="container">
          <div className="card">
            <h1>External Application Required</h1>
            <p>
              This opportunity is managed externally and cannot be applied for
              directly on the NSHCDA website.
            </p>
            <a
              href={opportunity.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ marginTop: "1rem" }}
            >
              Apply on Official Platform
            </a>
          </div>
        </div>
      </section>
    );
  }

  if (opportunity.status !== "Open") {
    return (
      <section className="page-section">
        <div className="container">
          <div className="card">
            <h1>Applications Closed</h1>
            <p>This opportunity is no longer accepting applications.</p>
            <Link to={`/opportunities/${opportunity.id}`} className="btn">
              Back to Opportunity
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="container">
        <OpportunityApplicationForm
          opportunityTitle={opportunity.title}
        />
      </div>
    </section>
  );
}

export default OpportunityApply;