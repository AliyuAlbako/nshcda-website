import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">

        {/* Agency Info */}
        <div className="footer-about">
          <h3>NSHCDA</h3>
          <p>
            Nasarawa State Human Capital Development— Optimizing Skills and knwoledge to maximise
          </p>
        </div>

        {/* Contact Section */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>shendam road , Lafia, Nigeria</p>
          <p>Email: adminhcd@nashcd.com.ng</p>
          <p>Phone: 08032431051 </p>
        </div>

        {/* Social Media */}
        <div className="footer-social">
          <h4>Follow Us</h4>

          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebook /> Facebook
            </a>

            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter /> Twitter
            </a>

            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram /> Instagram
            </a>

            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> LinkedIn
            </a>

            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaYoutube /> YouTube
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2026 Nasarawa State Human Capital Development Agency (NSHCDA). All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;