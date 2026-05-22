import { useParams, Link } from "react-router-dom";
import programs from "../data/programs";

function ProgramDetails() {
  const { slug } = useParams();

  const program = programs.find(
    (item) => item.slug === slug
  );

  if (!program) {
    return (
      <section className="page-section">
        <div className="container">
          <h2>Program not found</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="container">
        {/* HERO */}
        <div className="program-details-hero">
          <img
            src={program.image}
            alt={program.title}
            className="program-details-image"
          />

          <div className="program-details-content">
            <span className="program-category">
              {program.thematicArea}
            </span>

            <h1>{program.title}</h1>

            <p>{program.oneLineSummary}</p>

            {program.year && (
              <p>
                <strong>Duration:</strong> {program.year}
              </p>
            )}
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="card details-section">
          <h2>Overview</h2>
          <p>{program.overview}</p>
        </div>

        {/* OBJECTIVES */}
        {program.objectives?.length > 0 && (
          <div className="card details-section">
            <h2>Objectives</h2>

            <ul className="details-list">
              {program.objectives.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* FOCUS AREAS */}
        {program.focusAreas?.length > 0 && (
          <div className="card details-section">
            <h2>Focus Areas</h2>

            <ul className="details-list">
              {program.focusAreas.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* STRATEGIC IMPORTANCE */}
        {program.strategicImportance?.length > 0 && (
          <div className="card details-section">
            <h2>Strategic Importance</h2>

            <ul className="details-list">
              {program.strategicImportance.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* IMPLEMENTATION APPROACH */}
        {program.implementationApproach?.length > 0 && (
          <div className="card details-section">
            <h2>Implementation Approach</h2>

            <ul className="details-list">
              {program.implementationApproach.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* EXPECTED OUTCOMES */}
        {program.expectedOutcomes?.length > 0 && (
          <div className="card details-section">
            <h2>Expected Outcomes</h2>

            <ul className="details-list">
              {program.expectedOutcomes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* IMPACT SUMMARY */}
        {program.impactSummary && (
          <div className="card details-section">
            <h2>Impact Summary</h2>
            <p>{program.impactSummary}</p>
          </div>
        )}

        {/* GALLERY */}
        {program.gallery?.length > 0 && (
          <div className="details-section">
            <h2>Program Gallery</h2>

            <div className="program-gallery-grid">
              {program.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${program.title} ${index + 1}`}
                  className="program-gallery-image"
                />
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="card program-cta-card">
          <h2>Explore More Programs</h2>

          <p>
            Discover more strategic initiatives and interventions implemented
            across Nasarawa State.
          </p>

          <Link to="/programs" className="btn">
            Back to Programs
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProgramDetails;