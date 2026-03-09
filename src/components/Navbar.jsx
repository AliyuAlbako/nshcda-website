import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-container">
        <div className="logo">
          <Link to="/"><img src="images/nashcda-logo.png" alt="" /></Link>
        </div>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About NSHCDA</Link>
          <Link to="/thematic-areas">Thematic Areas</Link>
          <Link to="/programs">Programs</Link>
          <Link to="/dashboard">Impact Dashboard</Link>
          <Link to="/news-media">News & Media</Link>
          <Link to="/reports">Reports</Link>
          <Link to="/human-capital-map">Human Capital Map</Link>
          <Link to="/partnerships">Partnerships</Link>
          <Link to="/contact">Contact</Link>

        </nav>
      </div>
    </header>
  );
}

export default Navbar;