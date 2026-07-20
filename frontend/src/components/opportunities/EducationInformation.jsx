import { FaGraduationCap } from "react-icons/fa";

function EducationInformation({ formData, handleChange }) {
  return (
    <section className="form-card">

      <div className="form-section-header">
      <span className="section-number">
        03
    </span>

        <div className="section-icon">
          <FaGraduationCap />
        </div>

        <div>

          <h2>Education</h2>

          <p>
            Tell us about your educational background.
          </p>

        </div>

      </div>

      <div className="form-grid">

        {/* Highest Qualification */}

        <div className="form-group">

          <label>Highest Qualification</label>

          <select
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
          >
            <option value="">Select Qualification</option>
            <option>Primary School</option>
            <option>Secondary School</option>
            <option>OND</option>
            <option>NCE</option>
            <option>HND</option>
            <option>Bachelor's Degree</option>
            <option>Master's Degree</option>
            <option>PhD</option>
            <option>Professional Certification</option>
            <option>Other</option>
          </select>

        </div>

        {/* Course */}

        <div className="form-group">

          <label>Field of Study</label>

          <input
            type="text"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={handleChange}
            placeholder="Computer Science"
          />

        </div>

        {/* Institution */}

        <div className="form-group">

          <label>Institution</label>

          <input
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            placeholder="University / Polytechnic"
          />

        </div>

        {/* Graduation */}

        <div className="form-group">

          <label>Graduation Year</label>

          <input
            type="number"
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleChange}
            placeholder="2024"
          />

        </div>

        {/* Grade */}

        <div className="form-group">

          <label>Grade / Class (Optional)</label>

          <select
            name="grade"
            value={formData.grade || ""}
            onChange={handleChange}
          >

            <option value="">Select Grade</option>

            <option>First Class</option>
            <option>Second Class Upper</option>
            <option>Second Class Lower</option>
            <option>Third Class</option>
            <option>Pass</option>
            <option>Distinction</option>
            <option>Upper Credit</option>
            <option>Lower Credit</option>
            <option>Merit</option>

          </select>

        </div>

        {/* NYSC */}

        <div className="form-group">

          <label>NYSC Status</label>

          <select
            name="nyscStatus"
            value={formData.nyscStatus || ""}
            onChange={handleChange}
          >

            <option value="">Select Status</option>

            <option>Not Applicable</option>
            <option>Awaiting Mobilization</option>
            <option>Currently Serving</option>
            <option>Completed</option>
            <option>Exempted</option>

          </select>

        </div>

       </div>

    </section>
  );
}

export default EducationInformation;