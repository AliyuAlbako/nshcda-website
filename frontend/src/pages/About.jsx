import { Link } from "react-router-dom";

function About() {
  const thematicAreas = [
    "Health & Nutrition",
    "Education",
    "Youth Development",
    "Labour Force Participation",
    "Social Development",
    "Local Government & Community Development",
  ];

  const partnerships = [
    "National Economic Council (NEC)",
    "Federal Ministry of Finance",
    "Development Partners",
    "Civil Society Organizations",
    "Community Stakeholders",
  ];

  return (
    <section className="page-section">
      <div className="container">
        {/* HERO */}
        <div className="about-hero">
          <div>
            <span className="about-badge">About NSHCDA</span>

            <h1>
              Building Human Capital for Sustainable Development in
              Nasarawa State
            </h1>

            <p>
              The Nasarawa State Human Capital Development Office was conceived
              in September 2019 by the administration of Engr. Abdullahi A.
              Sule in a deliberate effort to align with the National Human
              Capital Development Agenda.
            </p>
          </div>

          <img
            src="/images/nashcda-hero.png"
            alt="NSHCDA"
            className="about-hero-image"
          />
        </div>

        {/* STORY */}
        <div className="card about-section-card">
          <h2>Our Story</h2>

          <p>
            This initiative emerged in response to the National Economic
            Council’s Human Capital Development Agenda aimed at reducing poverty
            and promoting sustainable economic growth through strategic
            investments in people.
          </p>

          <p>
            The office was later upgraded into a full-fledged Agency through
            Executive Order No. 001 of 2023 and renamed the Nasarawa State Human
            Capital Development Agency (NSHCDA).
          </p>

          <p>
            The Agency focuses on improving living conditions, strengthening
            economic opportunities, and ensuring that governance positively
            impacts citizens through coordinated human capital interventions.
          </p>
        </div>

        {/* THEMATIC AREAS */}
        <div className="card about-section-card">
          <div className="about-section-header">
            <div>
              <h2>Thematic Areas</h2>

              <p>
                NSHCDA operates across key sectors essential for improving human
                capital outcomes in Nasarawa State.
              </p>
            </div>
          </div>

          <div className="about-grid-list">
            {thematicAreas.map((area) => (
              <div className="about-mini-card" key={area}>
                {area}
              </div>
            ))}
          </div>
        </div>

        {/* STAFF DIRECTORY PREVIEW */}
        <div className="card about-section-card">
          <div className="about-section-header">
            <div>
              <h2>Staff & Institutional Structure</h2>

              <p>
                Meet the leadership and institutional structure driving the
                Agency’s mission and operations.
              </p>
            </div>

            <Link to="/leadership" className="btn btn-outline">
              View Leadership
            </Link>
          </div>

          <div className="about-staff-preview">
            <div className="about-mini-stat">
              <h3>Leadership Team</h3>
              <p>Chairman, DG and strategic management structure.</p>
            </div>

            <div className="about-mini-stat">
              <h3>Member Ministries</h3>
              <p>Coordinated representation across thematic sectors.</p>
            </div>

            <div className="about-mini-stat">
              <h3>Agency Staff</h3>
              <p>Dedicated personnel supporting implementation statewide.</p>
            </div>
          </div>
        </div>

        {/* PARTNERSHIPS */}
        {/* <div className="card about-section-card">
          <h2>Partnerships & Collaboration</h2>

          <p>
            NSHCDA collaborates with government institutions, development
            organizations, civil society groups, and community stakeholders to
            strengthen implementation and impact.
          </p>

          <div className="about-grid-list">
            {partnerships.map((partner) => (
              <div className="about-mini-card" key={partner}>
                {partner}
              </div>
            ))}
          </div>
        </div> */}

        {/* CTA */}
        <div className="card about-cta-card">
          <h2>Explore Our Programs & Activities</h2>

          <p>
            Discover the interventions, events, and strategic initiatives
            shaping human capital development across Nasarawa State.
          </p>

          <div className="hero-buttons">
            <Link to="/programs" className="btn">
              Explore Programs
            </Link>

            <Link to="/news-highlights" className="btn btn-outline">
              News & Highlights
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;