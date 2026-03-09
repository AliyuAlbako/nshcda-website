import thematicAreas from "../data/thematicAreas";

function ThematicAreas() {
  return (
    <section className="page-section container">
      <h1>Thematic Areas</h1>
      {thematicAreas.map((item) => (
        <div key={item.id} className="card page-card">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      ))}
    </section>
  );
}

export default ThematicAreas;