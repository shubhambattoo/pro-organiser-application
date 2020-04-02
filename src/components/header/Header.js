import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { AuthContext } from '../../context/Auth';

export const Header = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.brand}>
          <NavLink to="/">Pro Organiser</NavLink>
        </div>
        <ul className={styles.menu}>
          {currentUser ? (
            <>
              <li>
                <NavLink exact activeClassName={styles.activeLink} to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/createboard" activeClassName={styles.activeLink}>
                  Create a board
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink activeClassName={styles.activeLink} to="/login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName={styles.activeLink} to="/signup">
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
