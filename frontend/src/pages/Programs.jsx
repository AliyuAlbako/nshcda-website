import programs from "../data/programs";

function Programs() {
  return (
    <section className="page-section container">
      <h1>Programs</h1>
      {programs.map((program) => (
        <div key={program.id} className="card page-card">
          <h2>{program.title}</h2>
          <p><strong>Thematic Area:</strong> {program.thematicArea}</p>
          <p><strong>Location:</strong> {program.location}</p>
          <p>{program.description}</p>
        </div>
      ))}
    </section>
  );
}

export default Programs;