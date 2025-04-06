import React from 'react';
import styles from './Navbar.module.css'; // Import CSS Module

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        {/* Logo Section */}
        <div className={styles.logo}>
          {/* Make the logo link to the homepage */}
          <a href="/" className={styles.logoLink}>
            Logo
          </a>
        </div>

        {/* Navigation Links Section */}
        <ul className={styles.navLinks}>
          <li>
            <a href="/" className={styles.link}>
              Home
            </a>
          </li>
          <li>
            <a href="/login" className={styles.link}>
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;