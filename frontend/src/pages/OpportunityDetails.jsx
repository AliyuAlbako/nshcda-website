import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOpportunity } from "../services/opportunityService";

function OpportunityDetails() {
  const { id } = useParams();

  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOpportunity = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getOpportunity(id);

        setOpportunity(response.data);
      } catch (error) {
        console.error(
          "Failed to load opportunity:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load opportunity."
        );
      } finally {
        setLoading(false);
      }
    };

    loadOpportunity();
  }, [id]);

  if (loading) {
    return (
      <section className="page-section">
        <div className="container">
          <h1>Loading Opportunity...</h1>
        </div>
      </section>
    );
  }

  if (error || !opportunity) {
    return (
      <section className="page-section">
        <div className="container">

          <h1>Opportunity Not Found</h1>

          <p>
            {error ||
              "The requested opportunity does not exist."}
          </p>

          <Link
            to="/opportunities"
            className="btn"
          >
            Back to Opportunities
          </Link>

        </div>
      </section>
    );
  }

  return (
    <section className="page-section">

      <div className="container">

        <div className="opportunity-details">

          {/* Status and Type */}
          <div className="opportunity-details-badges">

            <span
              className={`status-badge ${opportunity.status.toLowerCase()}`}
            >
              {opportunity.status}
            </span>

            <span className="category-badge">
              {opportunity.type}
            </span>

          </div>

          {/* Title */}
          <h1>
            {opportunity.title}
          </h1>

          {/* Meta */}
          <div className="details-meta">

            <p>
              <strong>Organization:</strong>{" "}
              {opportunity.organization}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {opportunity.location}
            </p>

            <p>
              <strong>Application Deadline:</strong>{" "}
              {opportunity.deadline}
            </p>

          </div>

          {/* Description */}
          <div className="details-section">

            <h3>About This Opportunity</h3>

            <p>
              {opportunity.description}
            </p>

          </div>

          {/* Official Source Notice */}
          <div className="external-notice">

            <p>
              For complete information about this
              opportunity, including available positions,
              eligibility requirements, application
              instructions and important dates, please
              visit the official website of the
              organization.

            </p>

          </div>

          {/* Actions */}
          <div className="details-actions">

            {opportunity.status === "Open" &&
            opportunity.applyLink ? (

              <a
                href={opportunity.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Apply / View Full Details
              </a>

            ) : (

              <button
                className="btn disabled-btn"
                disabled
              >
                Applications Closed
              </button>

            )}

            <Link
              to="/opportunities"
              className="btn btn-outline-dark"
            >
              Back to Opportunities
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default OpportunityDetails;