import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroSlides from "../data/heroSlides";

function Hero() {
  

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsVisible(true);
      }, 350);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const goToSlide = (index) => {
    if (index === currentSlide) return;
    setIsVisible(false);

    setTimeout(() => {
      setCurrentSlide(index);
      setIsVisible(true);
    }, 350);
  };

  const activeSlide = heroSlides[currentSlide];

  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="container hero-flex">
        <div className="hero-content">
          {/* <div className="hero-badge">Official NSHCDA Digital Platform</div> */}

          <h1 style={{ lineHeight: "3rem", fontSize: "2.2rem" }}>
            Nasarawa State Human Capital Development Agency
          </h1>

          <span className="hero-subheading">
            Advancing Human Capital Development in Nasarawa State
          </span>

          <p>
            NSHCDA drives strategic interventions across health, education,
            youth empowerment, labour force development, and community
            development to improve the quality of life for all citizens.
          </p>

          <div className="hero-buttons">
            <Link to="/programs" className="btn">
              Explore Programs
            </Link>

            <Link to="/news-highlights" className="btn btn-outline">
              View Events & Programs
            </Link>
          </div>

          <div className="hero-highlights">
            <div className="hero-highlight-card">
              <strong>6</strong>
              <span>Thematic Areas</span>
            </div>

            <div className="hero-highlight-card">
              <strong>13</strong>
              <span>LGAs Reached</span>
            </div>

            <div className="hero-highlight-card">
              <strong>Active</strong>
              <span>Programs & Interventions</span>
            </div>
          </div>
        </div>

        <div className="hero-visuals">
          <div className={`hero-visuals-inner ${isVisible ? "show" : "hide"}`}>
            <Link to={activeSlide.mainLink} className="hero-main-image-card hero-clickable-card">
              <img
                src={activeSlide.main}
                alt={activeSlide.mainCaption}
                className="hero-main-image"
              />
              <div className="hero-image-caption">{activeSlide.mainCaption}</div>
            </Link>

            <div className="hero-small-images">
              <Link to={activeSlide.small1Link} className="hero-small-image-card hero-clickable-card">
                <img
                  src={activeSlide.small1}
                  alt={activeSlide.small1Caption}
                  className="hero-small-image"
                />
                <div className="hero-image-caption small-caption">
                  {activeSlide.small1Caption}
                </div>
              </Link>

              <Link to={activeSlide.small2Link} className="hero-small-image-card hero-clickable-card">
                <img
                  src={activeSlide.small2}
                  alt={activeSlide.small2Caption}
                  className="hero-small-image"
                />
                <div className="hero-image-caption small-caption">
                  {activeSlide.small2Caption}
                </div>
              </Link>
            </div>
          </div>

          <div className="hero-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`hero-dot ${currentSlide === index ? "active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;