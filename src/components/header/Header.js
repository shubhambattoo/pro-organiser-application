import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.brand}>
          <NavLink to="/">Pro Organiser</NavLink>
        </div>
        <ul className={styles.menu}>
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
        </ul>
      </nav>
    </header>
  );
};
