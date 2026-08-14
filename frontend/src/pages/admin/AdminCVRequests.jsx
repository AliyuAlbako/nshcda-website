import { useEffect, useState } from "react";
import API from "../../services/api";

function AdminCVRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      const response = await API.get("/cv-requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequests(response.data.data || []);
    } catch (error) {
      console.error(
        "Failed to load CV requests:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load CV requests."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("adminToken");

      await API.patch(
        `/cv-requests/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchRequests();
    } catch (error) {
      console.error(
        "Failed to update CV request:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update request."
      );
    }
  };

  const sendCV = async (id) => {
  try {
    const token =
      localStorage.getItem("adminToken");

    await API.post(
      `/cv-requests/${id}/send-cv`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await fetchRequests();

  } catch (error) {
    console.error(
      "Failed to send CV:",
      error
    );

    alert(
      error.response?.data?.message ||
        "Failed to send CV."
    );
  }
};


const formatDateTime = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleString();
};

  return (
    <section className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>CV Requests</h1>

          <p>
            Review requests from employers interested in
            candidates in the NSHCDA Talent Pool.
          </p>
        </div>
      </div>

      {loading && (
        <div className="admin-empty-state">
          Loading CV requests...
        </div>
      )}

      {!loading && error && (
        <div className="admin-error">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        requests.length === 0 && (
          <div className="admin-empty-state">
            <h3>No CV requests yet</h3>

            <p>
              Employer requests for candidate CVs will
              appear here.
            </p>
          </div>
        )}

      {!loading &&
        !error &&
        requests.length > 0 && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Organization</th>
                  <th>Contact Person</th>
                  <th>Email</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((request) => (
                  <tr key={request._id}>
                    <td>
                      {request.profile
                        ? `${request.profile.firstName} ${request.profile.lastName}`
                        : "Profile unavailable"}
                    </td>

                    <td>
                      {request.organization}
                    </td>

                    <td>
                      {request.contactPerson}
                    </td>

                    <td>
                      {request.email}
                    </td>

                    <td>
                      {request.reason}
                    </td>

                    <td>
                      <span
                        className={`admin-status-badge ${request.status.toLowerCase()}`}
                      >
                        {request.status}
                      </span>
                    </td>

                    <td>
                      {new Date(
                        request.createdAt
                      ).toLocaleDateString()}
                    </td>
<td>
  <div className="cv-request-admin-actions">

    {request.status === "Pending" && (
      <>
        <button
          type="button"
          className="cv-request-approve-btn"
          onClick={() =>
            updateStatus(request._id, "Approved")
          }
        >
          Approve
        </button>

        <button
          type="button"
          className="cv-request-reject-btn"
          onClick={() =>
            updateStatus(request._id, "Rejected")
          }
        >
          Reject
        </button>
      </>
    )}

    {request.status === "Approved" && (
      <button
        type="button"
        className="cv-request-complete-btn"
        onClick={() =>
          sendCV(request._id)
        }
      >
        Send CV
      </button>
    )}

    {request.status === "Completed" && (
      <div className="cv-sent-info">
        <strong>✓ CV Sent</strong>

        {request.cvSentAt && (
          <small>
            {formatDateTime(request.cvSentAt)}
          </small>
        )}

        {request.cvSentTo && (
          <small>
            {request.cvSentTo}
          </small>
        )}
      </div>
    )}

    {request.status === "Rejected" && (
      <span className="cv-request-rejected-info">
        Request Rejected
      </span>
    )}

  </div>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </section>
  );
}

export default AdminCVRequests;