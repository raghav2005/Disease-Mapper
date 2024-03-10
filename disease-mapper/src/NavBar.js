// NavBar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import styles from './NavBar.module.css';

const NavBar = () => {
  const { user } = useContext(UserContext);

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.brand}>
        Disease Mapper
      </Link>
      <div className={styles.navLinks}>
        <Link to="/map" className={styles.link}>
          Map
        </Link>
        {user ? (
          <>
            <Link to="/report" className={styles.link}>
              Report
            </Link>
            <Link to="/profile" className={styles.link}>
              Profile
            </Link>
          </>
        ) : (
          <>
            <Link to="/register" className={styles.link}>
              Register
            </Link>
            <Link to="/login" className={styles.link}>
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
