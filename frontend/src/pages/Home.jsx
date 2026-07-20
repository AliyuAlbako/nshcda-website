import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import ThematicCard from "../components/ThematicCard";
import ProgramCard from "../components/programs/ProgramCard";
// import NewsCard from "../components/NewsCard";
import StatCard from "../components/StatCard";
import VisionMission from "../components/home/VisionMission";
import GalleryPreview from "../components/home/GalleryPreview";
import LeadershipPreview from "../components/home/LeadrshipPreview";
import QuickLinks from "../components/home/QuickLinks";

import thematicAreas from "../data/thematicAreas";
import programs from "../data/programs";
// import news from "../data/news";
import MediaCard from "../components/media/MediaCard";
import newsHighlights from "../data/newsHighlights";
import { Link } from "react-router-dom";
import stats from "../data/stats";
import MediaPreview from "../components/home/MediaPreview";

function Home() {
  const featuredNews = newsHighlights.find(
  (item) => item.featured
);

const latestNews = newsHighlights
  .filter((item) => item.category === "news")
  .slice(0, 3);
  return (
    <>
      <Hero />
      <QuickLinks />

      <section className="section">
        <div className="container">
          <SectionTitle
            title="About NSHCDA"
          />

          <p className="intro-text">
            The Nasarawa State Human Capital Development oﬃce then, was conceived in September 2019 by the administration of Engr. Abdullahi A. Sule in a deliberate eﬀort to key into the National Human Capital Development (HCD) Agenda with the appointment of a State Focal Person (FP) and a well-staﬀed and equipped oﬃce set up
          </p>

          <p className="intro-text" style={{ marginTop: "1rem" }}>
             This was in response to a clarion call in 2018 by the National Economic Council (NEC) aimed at reducing poverty and ensuring sustainable economic growth. In a document, the HCD Journey, June Ifebe aptly states that “the HCD programme is an eﬀort to accelerate more and better streamlined investments in people for equitable and economic growth in Nigeria”.
          </p>
          <p className="intro-text" style={{ marginTop: "1rem" }}>
             The oﬃce was, however, upgraded to a full-ﬂedged Agency through the Executive Order No. 001 of 2023 and renamed Nasarawa State Human Capital Development Agency (NSHCDA). The Agency seeks to improve the living conditions of the populace of Nasarawa State, its economic and basic life patterns and above all, the need to bring the impact of governance to the door step of the citizens through Human Capital Development (HCD).
          </p>
        </div>
      </section>

      <VisionMission />

      <section className="section light-bg">
        <div className="container">
          <SectionTitle
            title="Our Thematic Areas"
            subtitle="The core pillars guiding NSHCDA interventions across the state."
          />
          <div className="grid thematic-grid">
            {thematicAreas.map((item) => (
              <ThematicCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            title="Featured Programs"
            subtitle="Highlighted initiatives making impact across Nasarawa State."
          />
          <div className="grid program-grid">
            {programs.slice(0, 4).map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>

      <LeadershipPreview />

      {/* <GalleryPreview /> */}
      <MediaPreview/>

      <section className="section">
        <div className="container">
          <SectionTitle
            title="Advancing Human Capital Development in Nasarawa State"
            subtitle="Strengthening Health & Nutrition, Education, Youth empowerment, social development, workforce productivity, and community development to improve the quality of life for citizens across Nasarawa State."
          />
          <div className="grid stat-grid">
            {stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>
        </div>
      </section>

     <section className="section light-bg homepage-news-section">
  <div className="container">
    <SectionTitle
      title="Latest News & Highlights"
      subtitle="Stay informed with recent interventions, field activities, partnerships and key announcements from NSHCDA."
    />

    {featuredNews && (
      <div className="homepage-featured-news card">
        <img
          src={featuredNews.thumbnail}
          alt={featuredNews.title}
        />

        <div className="homepage-featured-content">
          <span className="featured-label">
            Featured Story
          </span>

          <h2>{featuredNews.title}</h2>

          <p>
            {featuredNews.description}
          </p>

          <Link
            to={`/news-highlights/${featuredNews.id}`}
            className="btn"
          >
            Read Full Story
          </Link>
        </div>
      </div>
    )}

    <div className="grid news-grid">
      {latestNews.map((item) => (
        <MediaCard
          key={item.id}
          item={item}
        />
      ))}
    </div>

    <div className="homepage-news-footer">
      <Link
        to="/news-highlights"
        className="btn-outline"
      >
        View All News & Highlights →
      </Link>
    </div>
  </div>
</section>
    </>
  );
}

export default Home;