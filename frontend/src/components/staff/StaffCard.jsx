function StaffCard({ person }) {
  return (
    <div className="card staff-card">
      <img src={person.image} alt={person.name} className="staff-image" />
      <h3>{person.name}</h3>
      <p className="staff-designation">{person.designation}</p>
    </div>
  );
}

export default StaffCard;