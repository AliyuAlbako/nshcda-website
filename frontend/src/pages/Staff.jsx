import SectionTitle from "../components/SectionTitle";
import StaffCard from "../components/staff/StaffCard";
import staff from "../data/staff";

function Staff() {
  return (
    <section className="page-section">
      <div className="container">
        <SectionTitle
          title="Staff Directory"
          subtitle="Meet the staff supporting the work of the Nasarawa State Human Capital Development Agency."
        />

        <div className="staff-section">
          <h2 className="staff-group-title">Management Staff</h2>
          <div className="grid program-grid">
            {staff.managementStaff.map((person) => (
              <StaffCard key={person.id} person={person} />
            ))}
          </div>
        </div>

        <div className="staff-section" style={{ marginTop: "4rem" }}>
          <h2 className="staff-group-title">Program Staff</h2>
          <div className="grid program-grid">
            {staff.programStaff.map((person) => (
              <StaffCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Staff;