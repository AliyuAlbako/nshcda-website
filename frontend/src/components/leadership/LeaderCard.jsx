function LeaderCard({ leader }) {
  return (
    <div
      className={`card leader-card ${
        leader.isChairman ? "chairman-card" : ""
      }`}
    >
      <img
        src={leader.image}
        alt={leader.name}
        className="leader-image"
      />

      <h3 className="leader-name">{leader.name}</h3>

      <div className="leader-designation">
        <span className="primary-role">{leader.designation}</span>

        {leader.secondaryRole && (
          <span className="secondary-role">
            {leader.secondaryRole}
          </span>
        )}
      </div>

      {leader.bio && <p className="leader-bio">{leader.bio}</p>}
    </div>
  );
}

export default LeaderCard;