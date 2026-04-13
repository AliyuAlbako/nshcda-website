function LeaderCard({ leader }) {
  return (
    <div className="card leader-card">
      <img src={leader.image} alt={leader.name} className="leader-image" />
      <h3>{leader.name} </h3>
      <p><strong>{leader.designation}</strong></p>
      <p>{leader.bio}</p>
    </div>
  );
}

export default LeaderCard;