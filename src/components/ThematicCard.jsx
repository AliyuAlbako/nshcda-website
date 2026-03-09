function ThematicCard({ item }) {
  return (
    <div className="card">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  );
}

export default ThematicCard;