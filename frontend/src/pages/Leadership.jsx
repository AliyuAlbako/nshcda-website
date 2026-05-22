import SectionTitle from "../components/SectionTitle";
import LeaderCard from "../components/leadership/LeaderCard";
import leadership from "../data/leadership";

function Leadership() {
  return (
    <section className="page-section">
      <div className="container">
        <SectionTitle
          title="NSHCDA Council"
          subtitle="Meet the principal leadership and institutional representatives guiding NSHCDA."
        />

        <div className="grid program-grid">
          {leadership.principalOfficers.map((leader) => (
            <LeaderCard key={leader.id} leader={leader} />
          ))}
        </div>

        <div className="card member-ministries-card">
          <h2>Council Representation / Member Ministries</h2>
          <p>
            NSHCDA works with relevant ministries and institutions connected to
            its thematic areas to support coordinated human capital development
            across Nasarawa State.
          </p>

          <div className="ministries-grid">
            {leadership.memberMinistries.map((ministry) => (
    <       div className="ministry-item" key={ministry.name}>
              <img src={ministry.logo} alt={ministry.name} />
              <span>{ministry.name}</span>
           </div>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
}

export default Leadership;