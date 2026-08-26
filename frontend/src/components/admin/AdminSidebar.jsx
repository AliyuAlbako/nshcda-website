import {
  FaTachometerAlt,
  FaUsers,
  FaBriefcase,
  FaFileAlt,
  FaImages,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBookOpen,
  FaNewspaper,
} from "react-icons/fa";

import { Link, useLocation, useNavigate } from "react-router-dom";

function AdminSidebar({ sidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      label: "Employment Profiles",
      path: "/admin/employment-profiles",
      icon: <FaUsers />,
    },

          {
        label: "CV Requests",
        path: "/admin/cv-requests",
        icon: <FaFileAlt />,
      },
    {
      label: "Applications",
      path: "/admin/applications",
      icon: <FaFileAlt />,
    },
    {
      label: "Opportunities",
      path: "/admin/opportunities",
      icon: <FaBriefcase />,
    },

    {
  label: "News & Highlights",
  path: "/admin/news-highlights",
  icon: <FaNewspaper />,
    },
    {
  label: "Publications & Documents",
  path: "/admin/publications",
  icon: <FaBookOpen />,
    },
    {
      label: "Media",
      path: "/admin/media",
      icon: <FaImages />,
    },
    {
      label: "Reports",
      path: "/admin/reports",
      icon: <FaChartBar />,
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: <FaCog />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  return (
    <aside
      className={`admin-sidebar ${
        sidebarOpen ? "expanded" : "collapsed"
      }`}
    >
      <div className="admin-sidebar-header">

  <img
    src="/images/nashcda-logo.png"
    alt="NSHCDA Logo"
    className="admin-logo"
  />

  {sidebarOpen && (
    <>
      <h2>NSHCDA</h2>

      <p>Opportunities Portal</p>

      <small>Administration</small>
    </>
  )}

</div>

      <nav className="admin-sidebar-nav">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`admin-nav-link ${
              location.pathname === link.path ? "active" : ""
            }`}
          >
            <span className="admin-nav-icon">
              {link.icon}
            </span>

            {sidebarOpen && (
              <span>{link.label}</span>
            )}
          </Link>
        ))}

        <button
          className="admin-logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />

          {sidebarOpen && (
            <span>Logout</span>
          )}
        </button>
      </nav>
    </aside>
  );
}

export default AdminSidebar;