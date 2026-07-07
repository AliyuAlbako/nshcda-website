
import { useParams, Link } from "react-router-dom";
import programs from "../data/programs";
import ProgramCard from "../components/programs/ProgramCard";

function ProgramDetails() {
  const { slug } = useParams();
    console.log("URL slug:", slug);
    console.log("Available program slugs:", programs.map(p => p.slug));

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

  const relatedPrograms = programs
    .filter(
      (item) =>
        item.slug !== program.slug &&
        item.category === program.category
    )
    .slice(0, 3);

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
              {program.category}
            </span>

            <h1>{program.title}</h1>

            <p>
              {program.oneLineSummary}
            </p>

            {program.year && (
              <div className="program-meta">
                <span>
                  Duration: {program.year}
                </span>
              </div>
            )}

          </div>
        </div>

        {/* OVERVIEW */}
        <div className="card details-section">
          <h2>Overview</h2>

          <p>
            {program.overview}
          </p>
        </div>

        {/* OBJECTIVES */}
        {program.objectives?.length > 0 && (
          <div className="details-section">

            <h2>Key Objectives</h2>

            <div className="objective-grid">
              {program.objectives.map(
                (item, index) => (
                  <div
                    key={index}
                    className="objective-card"
                  >
                    {item}
                  </div>
                )
              )}
            </div>

          </div>
        )}

        {/* EXPECTED IMPACT */}
        {(program.expectedOutcomes?.length > 0 ||
          program.impactSummary) && (
          <div className="card details-section">

            <h2>
              Expected Impact
            </h2>

            {program.expectedOutcomes?.length > 0 && (
              <ul className="details-list">
                {program.expectedOutcomes.map(
                  (item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )}
              </ul>
            )}

            {program.impactSummary && (
              <p
                style={{
                  marginTop: "1rem",
                }}
              >
                {program.impactSummary}
              </p>
            )}

          </div>
        )}

        {/* GALLERY */}
        {program.gallery?.length > 0 && (
          <div className="details-section">

            <h2>
              Program Gallery
            </h2>

            <div className="program-gallery-grid">
              {program.gallery.map(
                (image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${program.title} ${
                      index + 1
                    }`}
                    className="program-gallery-image"
                  />
                )
              )}
            </div>

          </div>
        )}

        {/* RELATED PROGRAMS */}
        {relatedPrograms.length > 0 && (
          <div className="details-section">

            <h2>
              Related Programs
            </h2>

            <div className="grid program-grid">
              {relatedPrograms.map(
                (item) => (
                  <ProgramCard
                    key={item.id}
                    program={item}
                  />
                )
              )}
            </div>

          </div>
        )}

        {/* CTA */}
        <div className="card program-cta-card">

          <h2>
            Explore More Programs
          </h2>

          <p>
            Discover more strategic
            initiatives and interventions
            implemented across Nasarawa
            State.
          </p>

          <Link
            to="/programs"
            className="btn"
          >
            Back to Programs
          </Link>

        </div>

      </div>
    </section>
  );
}

export default ProgramDetails;
