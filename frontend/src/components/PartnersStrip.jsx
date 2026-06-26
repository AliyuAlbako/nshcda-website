import partners from "../data/partners";

function PartnersStrip() {
  return (
    <section className="partners-strip">
      <div className="container">
        <h3>Strategic Partners</h3>

        <p>
          Collaborating with development partners,
          government institutions, and international
          organizations to advance human capital
          development across Nasarawa State.
        </p>

        <div className="partners-logos">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="partner-logo"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
              />

              <span>{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PartnersStrip;