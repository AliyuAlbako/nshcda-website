import news from "../data/news";

function NewsMedia() {
  return (
    <section className="page-section container">
      <h1>News & Media</h1>
      {news.map((item) => (
        <div key={item.id} className="card page-card">
          <h2>{item.title}</h2>
          <p><strong>Date:</strong> {item.date}</p>
          <p>{item.summary}</p>
        </div>
      ))}
    </section>
  );
}

export default NewsMedia;