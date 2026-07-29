import {
  FaCheckCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";

function RegisterSidebar() {
  return (
    <aside className="register-sidebar">

      {/* ================= WHY REGISTER ================= */}

      <div className="sidebar-card">

        <h3>Why Register?</h3>

        <ul className="sidebar-list">

          <li>
            <FaCheckCircle />
            <span>Create your employment profile once</span>
          </li>

          <li>
            <FaCheckCircle />
            <span>Upload your CV for future opportunities</span>
          </li>

          <li>
            <FaCheckCircle />
            <span>Receive verified employment opportunities</span>
          </li>

          <li>
            <FaCheckCircle />
            <span>Access scholarships and grants</span>
          </li>

          <li>
            <FaCheckCircle />
            <span>Discover training and skills programmes</span>
          </li>

          <li>
            <FaCheckCircle />
            <span>Apply for empowerment initiatives</span>
          </li>

        </ul>

      </div>

      {/* ================= NEED HELP ================= */}

      <div className="sidebar-card">

        <h3>Need Assistance?</h3>

        <div className="sidebar-contact">

          <div>
            <FaEnvelope />
            <span>info@nshcda.gov.ng</span>
          </div>

          <div>
            <FaPhoneAlt />
            <span>+2348032431051</span>
          </div>

          <div>
            <FaClock />
            <span>Mon – Fri | 8:00 AM – 4:00 PM</span>
          </div>

        </div>

      </div>

      {/* ================= SECURITY ================= */}

      <div className="sidebar-security">

        <FaShieldAlt />

        <div>

          <h4>Your Information is Secure</h4>

          <p>

            Your personal information is handled securely and
            used only for employment profile registration and
            verified opportunity notifications.

          </p>

        </div>

      </div>

    </aside>
  );
}

export default RegisterSidebar;