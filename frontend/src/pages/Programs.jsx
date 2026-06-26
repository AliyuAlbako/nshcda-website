import programs from "../data/programs";
import thematicAreas from "../data/thematicAreas";
import ProgramCard from "../components/programs/ProgramCard";
import SectionTitle from "../components/SectionTitle";

function Programs() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="programs-hero">
            <span className="programs-badge">
              Strategic Interventions
            </span>

            <h1>Programs & Interventions</h1>

            <p>
              NSHCDA implements strategic human capital
              development programmes across education,
              health, youth empowerment, workforce
              development and social inclusion.
            </p>
          </div>

        {thematicAreas.map((area) => {
          // Support multiple thematic areas per program
          const relatedPrograms = programs.filter((program) =>
            program.thematicAreas?.includes(area.title)
          );

          // Skip empty thematic sections
          if (relatedPrograms.length === 0) return null;

          return (
            <div
              key={area.slug || area.id}
              className="thematic-program-section"
            >
              <div className="thematic-program-header">
                <h2>
                  {area.title}
                  <span className="program-count">
                    ({relatedPrograms.length})
                  </span>
                </h2>

                <p>{area.description}</p>
              </div>

              <div className="program-grid">
                {relatedPrograms.map((program) => (
                  <ProgramCard
                    key={program.id}
                    program={program}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Programs;