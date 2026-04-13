function MediaCard({ item }) {
  return (
    <div className="media-card">
      <img src={item.thumbnail} alt={item.title} />

      <div className="media-content">
        <h3>{item.title}</h3>
        <p className="media-meta">
          {item.date} • {item.location}
        </p>

        <p>{item.description}</p>

        {item.type === "video" ? (
          <a
            href={item.mediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Watch Video
          </a>
        ) : (
          <a href={item.mediaUrl} target="_blank" className="btn">
            View Image
          </a>
        )}
      </div>
    </div>
  );
}

export default MediaCard;