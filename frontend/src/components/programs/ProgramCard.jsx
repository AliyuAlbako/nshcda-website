// function ProgramCard({ program }) {
//   return (
//     <div className="card">
//       <h3>{program.title}</h3>
//       <p><strong>Thematic Area:</strong> {program.thematicArea}</p>
//       <p><strong>Location:</strong> {program.location}</p>
//       <p>{program.description}</p>
//     </div>
//   );
// }

// export default ProgramCard;

import { Link } from "react-router-dom";

function ProgramCard({ program }) {
  return (
    <Link
      to={`/programs/${program.slug}`}
      className="program-card-link"
    >
      <div className="card program-card">
        <img src={program.image} alt={program.title} />

        <div className="program-content">
          <h3>{program.title}</h3>
          <p>{program.shortDescription}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProgramCard;