import { FaUser } from "react-icons/fa";

function PersonalInformation({ formData, handleChange }) {
  return (
    <section className="form-card">

    <div className="form-section-header">

    <span className="section-number">
        01
    </span>

    <div className="section-icon">
        <FaUser />
    </div>

    <div className="section-title">

        <h2>Personal Information</h2>

        <p>
            Tell us about yourself.
        </p>

    </div>

</div>

      <div className="form-grid">

        <div className="form-group">

          <label>First Name</label>

          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
          />

        </div>

        <div className="form-group">

          <label>Last Name</label>

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
          />

        </div>

        <div className="form-group">

          <label>Gender</label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >

            <option value="">Select Gender</option>

            <option value="Male">Male</option>

            <option value="Female">Female</option>

          </select>

        </div>

        <div className="form-group">

          <label>Date of Birth</label>

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />

        </div>

        {/* <div className="form-group">

          <label>Nationality</label>

          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
          />

        </div> */}

        <div className="form-group">

          <label>Local Government Area</label>

          <select
            name="lga"
            value={formData.lga}
            onChange={handleChange}
          >

            <option value="">Select LGA</option>

            <option>Akwanga</option>
            <option>Awe</option>
            <option>Doma</option>
            <option>Karu</option>
            <option>Keana</option>
            <option>Keffi</option>
            <option>Kokona</option>
            <option>Lafia</option>
            <option>Nasarawa</option>
            <option>Nasarawa Eggon</option>
            <option>Obi</option>
            <option>Toto</option>
            <option>Wamba</option>

          </select>

        </div>

      </div>

    </section>
  );
}

export default PersonalInformation;