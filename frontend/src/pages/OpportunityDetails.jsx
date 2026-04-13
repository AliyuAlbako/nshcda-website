import { Link, useParams } from "react-router-dom";
import opportunities from "../data/opportunities";

function OpportunityDetails() {
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

  return (
    <section className="page-section">
      <div className="container">
        <div className="opportunity-details card">
          <div className="opportunity-top">
            <span className={`status-badge ${opportunity.status.toLowerCase()}`}>
              {opportunity.status}
            </span>
            <span className="category-badge">{opportunity.category}</span>
          </div>

          <div className="opportunity-meta-top" style={{ marginTop: "1rem" }}>
            <span className={`mode-badge ${opportunity.applicationMode}`}>
              {opportunity.applicationMode === "internal"
                ? "Internal Opportunity"
                : "External Opportunity"}
            </span>
            <span className="source-badge">{opportunity.source}</span>
          </div>

          <h1 style={{ marginTop: "1rem" }}>{opportunity.title}</h1>

          <div className="details-meta">
            <p><strong>Thematic Area:</strong> {opportunity.thematicArea}</p>
            <p><strong>Location:</strong> {opportunity.location}</p>
            <p><strong>Deadline:</strong> {opportunity.deadline}</p>
          </div>

          <div className="details-section">
            <h3>Description</h3>
            <p>{opportunity.description}</p>
          </div>

          <div className="details-section">
            <h3>Eligibility</h3>
            <p>{opportunity.eligibility}</p>
          </div>

          <div className="details-section">
            <h3>Requirements</h3>
            <ul>
              {opportunity.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="details-section">
            <h3>Benefits</h3>
            <ul>
              {opportunity.benefits.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {opportunity.applicationMode === "external" && (
            <div className="external-notice">
              <p>
                <strong>Note:</strong> NSHCDA is publishing this opportunity for
                public awareness. Applications are handled on the official
                platform of the organizing institution.
              </p>
            </div>
          )}

          <div className="details-actions">
            {opportunity.status !== "Open" ? (
              <button className="btn disabled-btn" disabled>
                Applications Closed
              </button>
            ) : opportunity.applicationMode === "internal" ? (
              <Link to={`/opportunities/${opportunity.id}/apply`} className="btn">
                Apply Now
              </Link>
            ) : (
              <a
                href={opportunity.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Apply on Official Platform
              </a>
            )}

            <Link to="/opportunities" className="btn btn-outline-dark">
              Back to Opportunities
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OpportunityDetails;