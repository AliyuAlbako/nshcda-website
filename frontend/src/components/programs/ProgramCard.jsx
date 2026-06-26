import { Link } from "react-router-dom";

function ProgramCard({ program }) {
  return (
    <Link
      to={`/programs/${program.slug}`}
      className="program-card-link"
    >
      <div className="card program-card">

        <img
          src={program.image}
          alt={program.title}
          className="program-image"
        />

        <div className="program-card-content">

          <span className="program-badge">
            {program.category}
          </span>

          <h3>{program.title}</h3>

          <p>
            {program.oneLineSummary}
          </p>

          <div className="program-read-more">
            View Program →
          </div>

        </div>

      </div>
    </Link>
  );
}

export default ProgramCard;
