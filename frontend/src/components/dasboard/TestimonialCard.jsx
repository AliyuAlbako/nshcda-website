function TestimonialCard({
  testimonial,
  onPlay
}) {
  return (
    <div className="testimonial-card">
      <div
        className="testimonial-thumbnail"
        onClick={() => onPlay(testimonial)}
      >
        <img
          src={testimonial.thumbnail}
          alt={testimonial.name}
        />

        <div className="play-overlay">
          ▶
        </div>
      </div>

      <div className="testimonial-content">
        <h3>{testimonial.name}</h3>

        <p className="testimonial-program">
          {testimonial.program}
        </p>

        <span className="testimonial-lga">
          {testimonial.lga}
        </span>

        <blockquote>
          "{testimonial.quote}"
        </blockquote>

        <button
          className="btn btn-outline"
          onClick={() => onPlay(testimonial)}
        >
          Watch Testimony
        </button>
      </div>
    </div>
  );
}

export default TestimonialCard;