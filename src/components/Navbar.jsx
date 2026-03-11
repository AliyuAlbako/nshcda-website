import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <img src="images/nashcda-logo.png" alt="" />
          </Link>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/about" onClick={closeMenu}>About NSHCDA</Link>
          <Link to="/thematic-areas" onClick={closeMenu}>Thematic Areas</Link>
          <Link to="/programs" onClick={closeMenu}>Programs</Link>
          <Link to="/dashboard" onClick={closeMenu}>Impact Dashboard</Link>
          <Link to="/human-capital-map" onClick={closeMenu}>Human Capital Map</Link>
          <Link to="/news-media" onClick={closeMenu}>News & Media</Link>
          <Link to="/reports" onClick={closeMenu}>Reports</Link>
          <Link to="/partnerships" onClick={closeMenu}>Partnerships</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;