import { useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkedAlt } from "react-icons/fa";

import stats from "../data/stats";
import interventions from "../data/interventions";
import testimonials from "../data/testimonials";

import StatCard from "../components/StatCard";
import TestimonialCard from "../components/dasboard/TestimonialCard";

function Dashboard() {
  const [activeVideo, setActiveVideo] = useState(null);
  const featuredTestimonial = testimonials[0];

  return (
    <section className="page-section dashboard-page">
      <div className="container">

        {/* Dashboard Hero */}
        <div className="dashboard-hero">
          <div className="dashboard-hero-content">
            <span className="dashboard-badge">
              Human Capital Development Monitoring
            </span>

            <h1>NSHCDA Impact Dashboard</h1>

            <p>
              Tracking human capital development progress across
              Nasarawa State through strategic interventions,
              beneficiary impact, program implementation,
              and stakeholder engagement.
            </p>

            <div className="dashboard-hero-tags">
              <span>Programs</span>
              <span>Beneficiaries</span>
              <span>13 LGAs</span>
              <span>Success Stories</span>
              <span>Interventions</span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <section className="dashboard-section">
          <h2>Executive Summary</h2>

          <div className="grid stat-grid">
            {stats.map((stat) => (
              <StatCard
                key={stat.id}
                stat={stat}
              />
            ))}
          </div>
        </section>

        {/* Human Capital Coverage */}
        <section className="dashboard-section">
          <h2>Human Capital Coverage Overview</h2>

          <div className="coverage-card">
            <div className="coverage-content">
              <div className="coverage-icon">
                <FaMapMarkedAlt />
              </div>

              <div>
                <h3>Coverage Across Nasarawa State</h3>

                <p>
                  NSHCDA interventions currently span all
                  13 Local Government Areas, delivering
                  programs across education, health,
                  youth empowerment, social development,
                  workforce development, and community engagement.
                </p>

                <div className="coverage-stats">
                  <span>13 LGAs Reached</span>
                  <span>50+ Programs</span>
                  <span>15,000+ Beneficiaries</span>
                </div>

                <Link
                  to="/human-capital-map"
                  className="btn"
                >
                  Explore Human Capital Map
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Beneficiary Success Stories */}
<section className="dashboard-section">
  <h2>Beneficiary Success Stories</h2>

  <p className="dashboard-section-intro">
    Real stories from beneficiaries whose lives have been transformed through
    NSHCDA interventions across Nasarawa State.
  </p>

  {/* Featured Story */}
  <div className="featured-testimonial">
    <div
      className="featured-testimonial-video"
      onClick={() => setActiveVideo(featuredTestimonial)}
    >
      <img
        src={featuredTestimonial.thumbnail}
        alt={featuredTestimonial.name}
      />

      <div className="featured-play-btn">
        ▶
      </div>
    </div>

    <div className="featured-testimonial-content">
      <span className="featured-tag">
        Featured Success Story
      </span>

      <h3>{featuredTestimonial.name}</h3>

      <p className="featured-program">
        {featuredTestimonial.program}
      </p>

      <p className="featured-lga">
        {featuredTestimonial.lga}
      </p>

      <blockquote>
        "{featuredTestimonial.quote}"
      </blockquote>

      <button
        type="button"
        className="btn"
        onClick={() =>
          setActiveVideo(featuredTestimonial)
        }
      >
        Watch Full Testimony
      </button>
    </div>
  </div>

  {/* Other Success Stories */}
  <div className="testimonial-grid">
    {testimonials
      .slice(1)
      .map((testimonial) => (
        <TestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
          onPlay={setActiveVideo}
        />
      ))}
  </div>
</section>
        {/* Footer CTA */}
        <div className="dashboard-actions">
          <Link
            to="/human-capital-map"
            className="btn"
          >
            Explore Human Capital Map
          </Link>

          <Link
            to="/news-highlights"
            className="btn btn-outline"
          >
            News & Highlights
          </Link>
        </div>
 </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="video-modal-overlay"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="video-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="video-modal-close"
              onClick={() => setActiveVideo(null)}
            >
              ×
            </button>

            <h3>{activeVideo.name}</h3>

            <iframe
              src={activeVideo.videoUrl}
              title={activeVideo.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default Dashboard;