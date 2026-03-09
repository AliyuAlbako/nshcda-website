function ProgramCard({ program }) {
  return (
    <div className="card">
      <h3>{program.title}</h3>
      <p><strong>Thematic Area:</strong> {program.thematicArea}</p>
      <p><strong>Location:</strong> {program.location}</p>
      <p>{program.description}</p>
    </div>
  );
}

export default ProgramCard;