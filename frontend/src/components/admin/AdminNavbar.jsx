import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";

function AdminNavbar({ onToggleSidebar }) {
  return (
    <header className="admin-navbar">

      <div className="admin-navbar-left">

        <button
          className="menu-toggle-btn"
          onClick={onToggleSidebar}
        >
          <FaBars />
        </button>

        <h2>NSHCDA Admin Dashboard</h2>

      </div>

      <div className="admin-navbar-right">

        <button className="notification-btn">
          <FaBell />
        </button>

        <div className="admin-user">

          <FaUserCircle className="admin-avatar" />

          <div>

            <strong>Administrator</strong>

            <small>NSHCDA</small>

          </div>

        </div>

      </div>

    </header>
  );
}

export default AdminNavbar;