import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function RegisterHero() {
  return (
    <section className="register-hero">

      {/* Background Image */}

      <img
        src="/images/opportunities_hero3.png"
        alt="Employment Registration"
        className="register-hero-image"
      />

      {/* Overlay */}

      <div className="register-hero-overlay"></div>

      {/* Content */}

      <div className="container register-hero-inner">

        <div className="register-hero-content">

          <span className="register-hero-badge">
            Employment Profile Registration
          </span>

          <h1>
            Register Your
            <br />
            Employment Profile
          </h1>

          <p>
            Create your employment profile once and stay connected
            to verified employment opportunities, scholarships,
            training programmes and empowerment initiatives across
            Nasarawa State.
          </p>

          <Link
            to="/opportunities"
            className="register-back-btn"
          >
            <FaArrowLeft />
            Back to Opportunities
          </Link>

        </div>

      </div>

    </section>
  );
}

export default RegisterHero;