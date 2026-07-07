function SectionTitle({ title, subtitle, caption }) {
  return (
    <div className="section-title">
      <h2>{title}</h2> 
      {caption && (
        <span className="section-title-caption">
          {caption}
        </span>
      )}
      <p>{subtitle}</p>
    </div>
  );
}

export default SectionTitle;