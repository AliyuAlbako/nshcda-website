function NewsCard({ item }) {
  return (
    <div className="card">
      <h3>{item.title}</h3>
      <p><strong>Date:</strong> {item.date}</p>
      <p>{item.summary}</p>
    </div>
  );
}

export default NewsCard;