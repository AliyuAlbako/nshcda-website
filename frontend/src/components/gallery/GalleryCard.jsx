function GalleryCard({ item }) {
  return (
    <div className="card gallery-card">
      <img src={item.image} alt={item.title} className="gallery-image" />
      <h3>{item.title}</h3>
      <p><strong>Date:</strong> {item.date}</p>
      <p><strong>Location:</strong> {item.location}</p>
      <p><strong>Thematic Area:</strong> {item.thematicArea}</p>
      <p>{item.description}</p>
    </div>
  );
}

export default GalleryCard;