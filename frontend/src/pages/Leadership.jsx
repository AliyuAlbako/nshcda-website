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

  const councilMembers = [
  ...leadership.principalOfficers.filter(
    (leader) => !leader.isChairman && leader !== dg
  ),
  ...leadership.councilMembers,
];
  return (
    <section className="page-section">
      <div className="container">
        <SectionTitle
          title="NSHCDC Organogram"
          caption="Nasarawa State Human Capital Development Council"
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
        {/* Governing Council Members */}

    <div className="council-members-section">
  <h2>Governing Council Members</h2>

  <p>
    Members of the Governing Council providing policy direction,
    institutional collaboration and strategic oversight for
    Human Capital Development in Nasarawa State.
  </p>

  <div className="council-grid">

    {councilMembers.map((member) => (

      <div
        key={member.id}
        className="member-card"
      >

        <img
          src={member.image}
          alt={member.name}
          className="member-photo"
        />

        <h3>{member.name}</h3>

        <p className="member-role">
          {member.designation}
        </p>

        {member.secondaryRole && (
          <p className="member-secondary">
            {member.secondaryRole}
          </p>
        )}

        {member.institution && (
          <p className="member-office">
            {member.institution}
          </p>
        )}

      </div>

    ))}

  </div>
</div>
      </div>
    </section>
  );
}

export default Leadership;