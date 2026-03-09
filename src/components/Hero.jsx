import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-content">
        <h1>Advancing Human Capital Development in Nasarawa State</h1>
        <p>
          Strengthening health, education, youth empowerment, social
          development, labour force growth, and community development for a more
          productive future.
        </p>
        <div className="hero-buttons">
          <Link to="/programs" className="btn">
            Explore Our Programs
          </Link>
          <Link to="/about" className="btn btn-outline">
            Learn About NSHCDA
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;