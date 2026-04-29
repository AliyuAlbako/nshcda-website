function AdminOpportunities() {
  const opportunities = [
    {
      id: 1,
      title: "Youth Digital Skills Training Program",
      category: "Trainings",
      status: "Open",
      mode: "internal",
    },
    {
      id: 2,
      title: "Federal Government Graduate Internship Programme",
      category: "Internships",
      status: "Open",
      mode: "external",
    },
  ];

  return (
    <section className="admin-page">
      <div className="admin-page-header">
        <h1>Opportunities</h1>
        <p>Manage published opportunities across the platform.</p>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Mode</th>
            </tr>
          </thead>

          <tbody>
            {opportunities.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.status}</td>
                <td>{item.mode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminOpportunities;