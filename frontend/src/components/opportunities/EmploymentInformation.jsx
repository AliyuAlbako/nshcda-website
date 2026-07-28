import { FaBriefcase } from "react-icons/fa";

function EmploymentInformation({ formData, handleChange }) {
  return (
    <section className="form-card">

      <div className="form-section-header">
        <span className="section-number">
          04
        </span>

        <div className="section-icon">
          <FaBriefcase />
        </div>

        <div>
          <h2>Employment Information</h2>
          <p>
            Help us understand your employment status and career preferences.
          </p>
        </div>

      </div>

      <div className="form-grid">

        <div className="form-group">
          <label>Employment Status</label>

          <select
    name="employmentStatus"
    value={formData.employmentStatus}
    onChange={handleChange}
>

            <option>Select Status</option>
            <option>Employed</option>
            <option>Unemployed</option>
            <option>Self-Employed</option>
            <option>Student</option>
            <option>NYSC Member</option>
            <option>Retired</option>

          </select>
        </div>

        <div className="form-group">

          <label>Years of Experience</label>

          <select
    name="experience"
    value={formData.experience}
    onChange={handleChange}
>

            <option>Select Experience</option>
            <option>No Experience</option>
            <option>Less than 1 Year</option>
            <option>1 - 3 Years</option>
            <option>4 - 6 Years</option>
            <option>7 - 10 Years</option>
            <option>More than 10 Years</option>

          </select>

        </div>

        <div className="form-group">

          <label>Preferred Employment Type</label>

          <select
    name="employmentType"
    value={formData.employmentType}
    onChange={handleChange}
>

            <option>Select Type</option>
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Contract</option>
            <option>Internship</option>
            <option>Graduate Trainee</option>
            <option>Volunteer</option>

          </select>

        </div>

        <div className="form-group">

          <label>Preferred Sector</label>

         <select
    name="sector"
    value={formData.sector}
    onChange={handleChange}
>

            <option>Select Sector</option>

            <option>Public Sector</option>
            <option>Private Sector</option>
            <option>NGO / Development Partner</option>
            <option>Education</option>
            <option>Healthcare</option>
            <option>Agriculture</option>
            <option>ICT</option>
            <option>Finance</option>
            <option>Construction</option>
            <option>Manufacturing</option>
            <option>Any Sector</option>

          </select>

        </div>

        <div className="form-group">

          <label>Preferred Work Location</label>

         <select
    name="preferredLocation"
    value={formData.preferredLocation}
    onChange={handleChange}
>

            <option>Select Preferred Location</option>

            <option>Anywhere in Nasarawa State</option>
            <option>Lafia</option>
            <option>Akwanga</option>
            <option>Awe</option>
            <option>Doma</option>
            <option>Karu</option>
            <option>Keana</option>
            <option>Keffi</option>
            <option>Kokona</option>
            <option>Nasarawa</option>
            <option>Nasarawa Eggon</option>
            <option>Obi</option>
            <option>Toto</option>
            <option>Wamba</option>

          </select>

        </div>

        {/* <div className="form-group">

          <label>Available To Start</label>

         <select
    name="availability"
    value={formData.availability}
    onChange={handleChange}
>

            <option>Select Availability</option>
            <option>Immediately</option>
            <option>Within 2 Weeks</option>
            <option>Within 1 Month</option>
            <option>More than 1 Month</option>

          </select>

        </div> */}

      </div>

    </section>
  );
}

export default EmploymentInformation;