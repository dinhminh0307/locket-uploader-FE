import React from 'react';
import styles from './Footer.module.css'; // Import CSS Module

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear(); // Get current year dynamically

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Copyright Section */}
        <div className={styles.copyright}>
          © {currentYear} Your Company. All rights reserved.
          {/* Replace "Your Company" with the actual name */}
        </div>

        {/* Links Section */}
        <nav className={styles.footerLinks}>
          <ul>
            <li>
              <a href="/privacy" className={styles.link}>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className={styles.link}>
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/contact" className={styles.link}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;