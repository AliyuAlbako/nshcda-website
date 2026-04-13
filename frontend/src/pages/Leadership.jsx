import SectionTitle from "../components/SectionTitle";
import LeaderCard from "../components/leadership/LeaderCard";
import leadership from "../data/leadership";

function Leadership() {
  return (
    <section className="page-section">
      <div className="container">
        <SectionTitle
          title="Leadership"
          subtitle="The leadership team guiding the Nasarawa State Human Capital Development Agency."
        />

        <div className="grid program-grid">
          {leadership.map((leader) => (
            <LeaderCard key={leader.id} leader={leader} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Leadership;