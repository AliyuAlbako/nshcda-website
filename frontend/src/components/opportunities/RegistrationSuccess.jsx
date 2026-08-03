import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaBriefcase,
  FaBell,
  FaClipboardList,
  FaArrowRight
} from "react-icons/fa";

function RegistrationSuccess() {
  return (
    <div className="registration-success">

      <div className="success-card">

        <div className="success-icon">
          <FaCheckCircle />
        </div>

        <span className="success-badge">
          Registration Successful
        </span>

        <h1>
          Employment Profile Created Successfully
        </h1>

        <p className="success-description">
          Congratulations! Your employment profile has been successfully
          created and is now available in the NSHCDA Employment Database.
          You can now explore opportunities, apply for programmes and keep
          your profile up to date.
        </p>
              <i style={{color:'red'}}>Confirmation mail will be sent your email</i>        

        <div className="success-features">

          <div className="success-feature">

            <FaBriefcase />

            <div>
              <h4>Apply for Opportunities</h4>
              <p>Submit applications for jobs, internships and programmes.</p>
            </div>

          </div>

          <div className="success-feature">

            <FaBell />

            <div>
              <h4>Receive Notifications</h4>
              <p>Get notified when opportunities match your profile.</p>
            </div>

          </div>

          <div className="success-feature">

            <FaClipboardList />

            <div>
              <h4>Track Your Applications</h4>
              <p>Monitor the progress of all your submitted applications.</p>
            </div>

          </div>

        </div>

        <div className="success-actions">

         
          <Link to="/opportunities">
          <button
            type="button"
            className="secondary-success-btn"
          >
            Browse Opportunities
          </button>
          </Link>
{/* 
          <button
            type="button"
            className="primary-success-btn"
          >
            Go to Dashboard
            <FaArrowRight />
          </button> */}

        </div>

      </div>

    </div>
  );
}

export default RegistrationSuccess;