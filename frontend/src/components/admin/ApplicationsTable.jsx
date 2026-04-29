function ApplicationsTable({ applications, onStatusChange }) {
  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Applicant</th>
            <th>Opportunity</th>
            <th>Email</th>
            <th>Phone</th>
            <th>CV</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((item) => (
            <tr key={item._id}>
              <td>{item.fullName}</td>
              <td>{item.opportunity?.title || "N/A"}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>
                {item.cvUrl ? (
                  <a
                    href={item.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-link"
                  >
                    View CV
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
              <td>
                <select
                  value={item.status}
                  onChange={(e) => onStatusChange(item._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationsTable;