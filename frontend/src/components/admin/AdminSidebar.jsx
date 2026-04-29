import { Link, useLocation, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Applications", path: "/admin/applications" },
    { label: "Opportunities", path: "/admin/opportunities" },
    { label: "Media", path: "/admin/media" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h2>NSHCDA Admin</h2>
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
            {link.label}
          </Link>
        ))}

        <button className="admin-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </aside>
  );
}

export default AdminSidebar;