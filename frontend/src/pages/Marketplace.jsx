import SectionTitle from "../components/SectionTitle";

function Marketplace() {
  const features = [
    {
      title: "Agricultural Marketplace",
      description:
        "Connecting farmers directly with buyers to reduce exploitation by middlemen and improve rural income.",
    },
    {
      title: "Artisans & Services",
      description:
        "Helping residents easily find trusted mechanics, electricians, tailors, plumbers, and other skilled professionals.",
    },
    // {
    //   title: "Women & Youth Enterprises",
    //   description:
    //     "Providing digital visibility and economic opportunities for women-led and youth-led businesses across Nasarawa State.",
    // },
    // {
    //   title: "Cooperative Commerce",
    //   description:
    //     "Supporting cooperative societies with access to wider markets, partnerships, and digital trade opportunities.",
    // },
  ];

  return (
    <section className="page-section marketplace-page">
      <div className="container">
        <SectionTitle
          title="NSHCDA Digital Marketplace Initiative"
          subtitle="Empowering local producers, artisans, cooperatives, and service providers through digital access and inclusive economic participation."
        />

        <div className="marketplace-hero card">
          <div className="marketplace-status">
            Strategic Development Phase
          </div>

          <h2>
            Building a Digital Economy Ecosystem for Nasarawa State
          </h2>

          <p>
            The NSHCDA Digital Marketplace Initiative is a proposed
            technology-driven platform aimed at connecting rural producers,
            artisans, cooperatives, and service providers directly with
            customers and economic opportunities.
          </p>

          <p>
            The initiative aligns with the agency’s broader mission of
            improving human capital development, economic inclusion, poverty
            reduction, and grassroots empowerment across Nasarawa State.
          </p>
        </div>

        <div className="marketplace-features">
          {features.map((feature, index) => (
            <div key={index} className="marketplace-card card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="marketplace-vision card">
          <h2>Vision for the Future</h2>

          <p>
            The platform is envisioned to support direct farmer-to-market
            access, digital service discovery, local enterprise growth, and
            inclusive economic participation for communities across the state.
          </p>

          <p>
            Future phases may include vendor registration, digital storefronts,
            service directories, cooperative onboarding, and integrated
            marketplace tools.
          </p>

          <div className="marketplace-coming-soon">
            Marketplace Platform — Coming Soon
          </div>
        </div>
      </div>
    </section>
  );
}

export default Marketplace;