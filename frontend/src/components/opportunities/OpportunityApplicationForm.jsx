import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function OpportunityApplicationForm({ opportunityTitle }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    lga: "",
    state: "",
    qualification: "",
    statement: "",
    cv: null,
  });

  const [selectedFileName, setSelectedFileName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "cv") {
      const file = files && files[0] ? files[0] : null;
      setFormData((prev) => ({
        ...prev,
        cv: file,
      }));
      setSelectedFileName(file ? file.name : "");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  if (!formData.cv) return;

  try {
    const payload = new FormData();
    payload.append("opportunity", opportunityId);
    payload.append("fullName", formData.fullName);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("gender", formData.gender);
    payload.append("lga", formData.lga);
    payload.append("state", formData.state);
    payload.append("qualification", formData.qualification);
    payload.append("statement", formData.statement);
    payload.append("cv", formData.cv);

    await axios.post("http://localhost:5000/api/applications", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setIsSubmitted(true);
  } catch (error) {
    console.error(error);
  }
};
  if (isSubmitted) {
    return (
      <div className="application-success card">
        <h2>Application Submitted Successfully</h2>

        <p>
          Thank you for applying for <strong>{opportunityTitle}</strong>.
        </p>

        <p>
          Your application has been received successfully. Further communication
          will be provided through the contact details submitted.
        </p>

        <div
          className="details-actions"
          style={{ justifyContent: "center", marginTop: "1.5rem" }}
        >
          <button
            type="button"
            className="btn"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                fullName: "",
                email: "",
                phone: "",
                gender: "",
                lga: "",
                state: "",
                qualification: "",
                statement: "",
                cv: null,
              });
              setSelectedFileName("");
            }}
          >
            Apply Again
          </button>

          <Link to="/opportunities" className="btn btn-outline-dark">
            Back to Opportunities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="application-form card" onSubmit={handleSubmit}>
      <h2>Apply for {opportunityTitle}</h2>

      <div className="form-grid">
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label>LGA</label>
          <input
            type="text"
            name="lga"
            value={formData.lga}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Highest Qualification</label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Upload CV</label>
          <input
            type="file"
            name="cv"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            required
          />
          {selectedFileName && (
            <small className="file-name">Selected: {selectedFileName}</small>
          )}
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label>Statement of Interest</label>
        <textarea
          name="statement"
          rows="5"
          value={formData.statement}
          onChange={handleChange}
          placeholder="Tell us why you are applying..."
          required
        ></textarea>
      </div>

      <button type="submit" className="btn" style={{ marginTop: "1.5rem" }}>
        Submit Application
      </button>
    </form>
  );
}

export default OpportunityApplicationForm;