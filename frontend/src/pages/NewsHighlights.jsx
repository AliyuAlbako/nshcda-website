
import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import MediaCard from "../components/media/MediaCard";
import HighlightCard from "../components/media/HighlightCard";
import media from "../data/newsHighlights";

function NewsHighlights() {
  const featuredStory = media.find(
    (item) => item.featured
  );

  const latestNews = media.filter(
    (item) =>
      item.category === "news" &&
      !item.featured
  );

  const recentHighlights = media.filter(
    (item) =>
      item.category === "highlight"
  );

  return (
    <section className="page-section">
      <div className="container">

    <div className="news-hero">
  <span className="news-hero-badge">
    Media Centre
  </span>

  <h1>News & Highlights</h1>

  <p>
    Stay informed with the latest news, activities,
    stakeholder engagements, strategic interventions,
    and human capital development initiatives across
    Nasarawa State.
  </p>
</div>

        {/* Featured Story */}
        {featuredStory && (
          <section className="featured-story card">

            <div className="featured-story-image">
              <img
                src={featuredStory.thumbnail}
                alt={featuredStory.title}
              />
            </div>

            <div className="featured-story-content">

              <span className="featured-badge">
                Featured Story
              </span>

              <h2>
                {featuredStory.title}
              </h2>

              <p className="featured-meta">
                {featuredStory.date} • {featuredStory.location}
              </p>

              <p>
                {featuredStory.description}
              </p>

              <Link
                to={`/news-highlights/${featuredStory.slug}`}
                className="btn"
              >
                Read Full Story
              </Link>

            </div>

          </section>
        )}

        {/* Latest News */}
        {latestNews.length > 0 && (
          <section className="news-section">

            <h2>Latest News</h2>

            <p>
              Official announcements, interventions,
              partnerships and key developments from
              the Nasarawa State Human Capital Development Agency.
            </p>

            <div className="grid program-grid">
              {latestNews.map((item) => (
                <MediaCard
                  key={item.id}
                  item={item}
                />
              ))}
            </div>

          </section>
        )}

        {/* Recent Highlights */}
        {recentHighlights.length > 0 && (
          <section className="news-section">

            <h2>
              Recent Highlights & Activities
            </h2>

            <p>
              Field activities, stakeholder engagements,
              community outreach programmes and notable
              events across Nasarawa State.
            </p>

            <div className="grid program-grid">
              {recentHighlights.map((item) => (
                <HighlightCard
                  key={item.id}
                  item={item}
                />
              ))}
            </div>

          </section>
        )}

      </div>
    </section>
  );
}

export default NewsHighlights;
