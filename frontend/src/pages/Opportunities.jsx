import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import OpportunityCard from "../components/opportunities/OpportunityCard";
import opportunities from "../data/opportunities";

import {
  FaBriefcase,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaHandHoldingUsd,
  FaTrophy,
  FaUserGraduate,
  FaHandshake,
  FaRocket,
  FaUsers,
  FaMapMarkedAlt,
  FaFileUpload,
  FaBell,
  FaInfoCircle,

} from "react-icons/fa";


  


function Opportunities() {
  return (
    <>
      {/* ================= HERO ================= */}

      <section className="opportunities-hero">
        {/* hero Background image */}
        <div className="opportunities-hero-image">

            <img
              src="/images/opportunities_hero3.png"
              alt="Employment Support"
            />

          </div>
           <div className="opportunities-hero-overlay"></div>

        <div className="container opportunities-hero-inner">

          <div className="opportunities-hero-content">

            <span className="opportunities-badge">
              NSHCDA Opportunities Portal
            </span>

            <h1>
              Discover Opportunities &amp; Build Your Employment Profile
            </h1>

            <p>
              Looking for employment, scholarships,
              internships, training programmes,
              grants or empowerment opportunities?

              Register your employment profile once,
              upload your CV and discover verified
              opportunities from government agencies,
              development partners and reputable
              organisations.
            </p>

            <div className="hero-actions">

              <Link
                to="/opportunities/register"
                className="btn .opportunities-register-btn"
              >
                Register Employment Profile
              </Link>

            </div>
            {/* Chips */}

          <div className="opportunity-chips">

            <span><FaBriefcase /> Employment</span>

            <span><FaGraduationCap /> Scholarships</span>

            <span><FaChalkboardTeacher /> Training</span>

            <span><FaHandHoldingUsd /> Grants</span>

            <span><FaTrophy /> Competitions</span>

            <span><FaUserGraduate /> Internships</span>

            <span><FaHandshake /> Fellowships</span>

            <span><FaRocket /> Empowerment</span>

          </div>

          </div>

        </div>

      </section>

      {/* ================= PAGE ================= */}

      <section className="page-section">

        <div className="container">


          {/* Stats */}
{/* ================= QUICK STATS ================= */}

<section className="opportunity-stats">

  <div className="opportunity-stat-item">

    <div className="stat-icon">
      <FaUsers />
    </div>

    <div>

      <h2>20,000+</h2>

      <span>Citizens Impacted</span>

      <small>Across Nasarawa State</small>

    </div>

  </div>

  <div className="opportunity-stat-item">

    <div className="stat-icon">
      <FaBriefcase />
    </div>

    <div>

      <h2>50+</h2>

      <span>Programmes & Opportunities</span>

      <small>Employment, training and empowerment</small>

    </div>

  </div>

  <div className="opportunity-stat-item">

    <div className="stat-icon">
      <FaMapMarkedAlt />
    </div>

    <div>

      <h2>13</h2>

      <span>LGAs Covered</span>

      <small>Statewide intervention coverage</small>

    </div>

  </div>

</section>

          {/* Why Register */}

        {/* ================= WHY REGISTER ================= */}

<section className="why-register-section">

  <SectionTitle
    title="Why Register?"
    subtitle="Create your employment profile once and stay connected to verified opportunities."
  />

  <div className="why-register-grid">

    <div className="why-card">

      <div className="why-icon">
        <FaFileUpload />
      </div>

      <h3>Upload Your CV</h3>

      <p>
        Create your employment profile once and securely upload your CV for future opportunities.
      </p>

    </div>

    <div className="why-card">

      <div className="why-icon">
        <FaBriefcase />
      </div>

      <h3>Employment Opportunities</h3>

      <p>
        Be considered whenever employment opportunities are published by NSHCDA and partner organisations.
      </p>

    </div>

    <div className="why-card">

      <div className="why-icon">
        <FaGraduationCap />
      </div>

      <h3>Skills Development</h3>

      <p>
        Receive information on scholarships, trainings, fellowships and empowerment programmes.
      </p>

    </div>

    <div className="why-card">

      <div className="why-icon">
        <FaBell />
      </div>

      <h3>Stay Updated</h3>

      <p>
        Never miss verified employment and empowerment opportunities shared on the platform.
      </p>

    </div>

  </div>

</section>

          {/* Current Opportunities */}

         {/* ================= CURRENT OPPORTUNITIES ================= */}

<section className="current-opportunities">

  <div className="current-opportunities-header">

    <div>

      <span className="section-badge">
        Verified Opportunities
      </span>

      <h2>
        Current Opportunities
      </h2>

      <p>
        Browse verified employment, scholarships,
        internships, training programmes, grants,
        fellowships and empowerment opportunities
        currently accepting applications.
      </p>

    </div>

  </div>

  <div className="opportunity-grid">

    {opportunities.length > 0 ? (

      opportunities.map((item) => (

        <OpportunityCard
          key={item.id}
          item={item}
        />

      ))

    ) : (

      <div className="empty-state">

        <h3>No Opportunities Available</h3>

        <p>
          There are currently no published opportunities.
          Please check back later for newly verified
          opportunities.
        </p>

      </div>

    )}

  </div>

</section>

          {/* Disclaimer */}

          {/* ================= IMPORTANT INFORMATION ================= */}

<section className="opportunity-disclaimer">

  <div className="disclaimer-icon">
    <FaInfoCircle />
  </div>

  <div className="disclaimer-content">

    <h3>Important Information</h3>

    <p>
      NSHCDA publishes verified opportunities from government
      agencies, development partners, educational institutions
      and reputable organisations.

      Applicants are advised to carefully review eligibility
      requirements, application deadlines and supporting
      documents before submitting their applications. Always
      apply through the official application links provided for
      each opportunity.
    </p>

  </div>

</section>

        </div>

      </section>
    </>
  );
}

export default Opportunities;