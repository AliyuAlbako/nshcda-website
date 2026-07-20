import { FaAddressBook } from "react-icons/fa";

function ContactInformation({ formData, handleChange }) {
  return (
    <section className="form-card">

      <div className="form-section-header">
            <span className="section-number">
        02
    </span>

        <div className="section-icon">
          <FaAddressBook />
        </div>

        <div>

          <h2>Contact Information</h2>

          <p>
            How can we reach you?
          </p>

        </div>

      </div>

      <div className="form-grid">

        <div className="form-group">

          <label>Email Address</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
          />

        </div>

        <div className="form-group">

          <label>Phone Number</label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="080xxxxxxxx"
          />

        </div>

        <div className="form-group full-width">

          <label>Residential Address</label>

          <textarea
            rows="3"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your residential address"
          />

        </div>

      </div>

    </section>
  );
}

export default ContactInformation;