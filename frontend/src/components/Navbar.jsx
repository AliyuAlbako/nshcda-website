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
            <img src="images/nashcda-logo.png" alt="logo" />
          </Link>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button >

        {/* <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/about" onClick={closeMenu}>About NSHCDA</Link>
          <Link to="/thematic-areas" onClick={closeMenu}>Thematic Areas</Link>
          <Link to="/programs" onClick={closeMenu}>Programs</Link>
          <Link to="/dashboard" onClick={closeMenu}>Impact Dashboard</Link> 
          <Link to="/human-capital-map" onClick={closeMenu}>Human Capital Map</Link>
          <Link to="/opportunities" onClick={closeMenu}>Opportunities</Link>
          <Link to="/news-media" onClick={closeMenu}>News & Media</Link>
          <Link to="/reports" onClick={closeMenu}>Reports</Link>
           <Link to="/partnerships" onClick={closeMenu}>Partnerships</Link> 
           <Link to="/gallery" onClick={closeMenu}>Gallery</Link> 
          <Link to="/news-highlights" onClick={closeMenu}>Events & Programs</Link>
          <Link to="/leadership" onClick={closeMenu}>Leadership</Link>
          <Link to="/staff" onClick={closeMenu}>Staff Directory</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
        </nav> */}

        {/* 2nd version of nav Items */}
  <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
    <Link to="/" onClick={closeMenu}> Home</Link>
    <Link to="/about" onClick={closeMenu}> About </Link>
    <Link to="/programs" onClick={closeMenu}> Programs</Link>
    {/* <Link to="/news-highlights" onClick={closeMenu}> Events & Highlights </Link> */}
    <Link to="/news-highlights" onClick={closeMenu}>News & Highlights</Link>
    <Link to="/opportunities" onClick={closeMenu}> Opportunities </Link>
    <Link to="/human-capital-map" onClick={closeMenu}>Human Capital Map</Link>
    <Link to="/leadership" onClick={closeMenu}> Leadership</Link>
    <Link to="/staff" onClick={closeMenu}>Staff Directory</Link>
    <Link to="/marketplace" onClick={closeMenu}>Marketplace </Link>
    <Link to="/contact" onClick={closeMenu}> Contact</Link>
</nav>
        
      </div>
    </header>
  );
}

export default Navbar;