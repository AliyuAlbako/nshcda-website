import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import ThematicCard from "../components/ThematicCard";
import ProgramCard from "../components/ProgramCard";
import NewsCard from "../components/NewsCard";
import StatCard from "../components/StatCard";
import VisionMission from "../components/home/VisionMission";

import thematicAreas from "../data/thematicAreas";
import programs from "../data/programs";
import news from "../data/news";
import stats from "../data/stats";
import QuickLinks from "../components/home/QuickLinks";

function Home() {
  return (
    <>
      <Hero />
      <QuickLinks />

      <section className="section">
        <div className="container">
          <SectionTitle
            title="About NSHCDA"
            subtitle="Strengthening human capital development through strategic interventions across key sectors."
          />

          <p className="intro-text">
            The Nasarawa State Human Capital Development Agency (NSHCDA) is
            responsible for coordinating and implementing programs that improve
            the wellbeing, productivity, and opportunities of citizens across
            the state.
          </p>

          <p className="intro-text" style={{ marginTop: "1rem" }}>
            The agency works across key sectors including health and nutrition,
            education, youth empowerment, labour force development, social
            welfare, and community development. Through strategic partnerships
            and targeted interventions, NSHCDA aims to strengthen human capital
            and promote sustainable development in Nasarawa State.
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

      <section className="section light-bg">
        <div className="container">
          <SectionTitle
            title="Advancing Human Capital Development in Nasarawa State"
            subtitle="Strengthening health, education, youth empowerment, social development, workforce productivity, and community development to improve the quality of life for citizens across Nasarawa State."
          />
          <div className="grid stat-grid">
            {stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            title="Latest News"
            subtitle="Recent updates, field activities, and agency announcements."
          />
          <div className="grid news-grid">
            {news.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;