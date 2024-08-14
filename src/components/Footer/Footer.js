import React from 'react'
import '../Footer/Footer.css'

const Footer = () => {
    return (
        <div className="footer">
          <div className="footer-links">
            <a href="/">Home</a>
            <span>|</span>
            <a href="#">Contact Us</a>
            <span>|</span>
            <a href="#">Security</a>
            <span>|</span>
            <a href="#">Compliance</a>
            <span>|</span>
            <a href="#">IPR Complaints</a>
            <span>|</span>
            <a href="#">Anti-spam Policy</a>
            <span>|</span>
            <a href="#">Terms of Service</a>
            <span>|</span>
            <a href="#">Privacy Policy</a>
            <span>|</span>
            <a href="#">Cookie Policy</a>
            <span>|</span>
            <a href="#">GDPR Compliance</a>
            <span>|</span>
            <a href="#">Abuse Policy</a>
          </div>
          <div className="footer-copyright">
            © 2024, Corporation Pvt. Ltd. All Rights Reserved.
          </div>
        </div>
      );
    
}

export default Footer