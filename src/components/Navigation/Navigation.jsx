import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Analytics from '../Analytics/Analytics';
import styles from './NavigationStyles.module.css';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.navLogo} onClick={closeMenu}>
          HK
        </Link>
        
        <div className={styles.desktopAnalytics}>
          <Analytics />
        </div>
        
        <div className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`${styles.navMenu} ${isMenuOpen ? styles.active : ''}`}>
          <li>
            <Link 
              to="/" 
              className={`${styles.navLink} ${isActive('/') ? styles.activeLink : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={`${styles.navLink} ${isActive('/about') ? styles.activeLink : ''}`}
              onClick={closeMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/skills" 
              className={`${styles.navLink} ${isActive('/skills') ? styles.activeLink : ''}`}
              onClick={closeMenu}
            >
              Skills
            </Link>
          </li>
          <li>
            <Link 
              to="/projects" 
              className={`${styles.navLink} ${isActive('/projects') ? styles.activeLink : ''}`}
              onClick={closeMenu}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={`${styles.navLink} ${isActive('/contact') ? styles.activeLink : ''}`}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>
          <li className={styles.mobileAnalytics}>
            <Analytics />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
