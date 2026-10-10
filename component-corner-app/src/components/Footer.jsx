import "./Footer.css";

function Footer({ storeName, email, phone }) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <h3>{storeName}</h3>
          <p>Your destination for quality computer and gaming gear.</p>
        </div>

        <div>
          <h3>Contact</h3>
          <p>{email}</p>
          <p>{phone}</p>
        </div>

        <div>
          <h3>Hours</h3>
          <p>Monday - Friday</p>
          <p>9:00 AM - 6:00 PM</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 {storeName}. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;