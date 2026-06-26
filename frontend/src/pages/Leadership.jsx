import SectionTitle from "../components/SectionTitle";
import LeaderCard from "../components/leadership/LeaderCard";
import leadership from "../data/leadership";

function Leadership() {
  const chairman = leadership.principalOfficers.find(
    (leader) => leader.isChairman
  );

  const dg = leadership.principalOfficers.find(
    (leader) =>
      leader.designation?.toLowerCase().includes("director general")
  );

  return (
    <section className="page-section">
      <div className="container">
        <SectionTitle
          title="NSHCDA Council Organogram"
          subtitle="Leadership structure and institutional representation guiding Human Capital Development in Nasarawa State."
        />

        {/* Executive Leadership */}
        <div className="leadership-organogram">
          <div className="organogram-chairman">
            <LeaderCard leader={chairman} />
          </div>



          <div className="organogram-dg">
            <LeaderCard leader={dg} />
          </div>
        </div>

        {/* Council Members */}
        <div className="card council-members-section">
          <h2>Council Members & Institutional Representatives</h2>

          <p>
            The NSHCDA Council brings together representatives from key
            ministries, agencies, faith-based organizations and development
            institutions whose mandates align with the Agency's thematic
            areas.
          </p>

          <div className="council-grid">
            {leadership.councilMembers?.map((member) => (
              <div
                className="council-card"
                key={member.id}
              >
                <div className="council-card-top">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="council-photo"
                  />

                  <div className="council-info">
                    <h4>{member.name}</h4>

                    <p className="designation">
                      {member.designation}
                    </p>

                    <span className="category">
                      {member.category}
                    </span>
                  </div>
                </div>

                <div className="institution-row">
                  <img
                    src={member.logo}
                    alt={member.institution}
                    className="institution-logo"
                  />

                  <p>{member.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Leadership;