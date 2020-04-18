import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { AuthContext } from '../../context/Auth';
import { firebaseApp } from '../../firebase/init';

export const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const [isDropdown, setIsDropdown] = useState(false);

  function toggleDropdown() {
    setIsDropdown(!isDropdown);
  }

  async function handleLogout() {
    await firebaseApp.auth().signOut();
    setIsDropdown(false);
  }

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
              <li className={styles.dropdown} onClick={toggleDropdown}>
                {currentUser.email}
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
        {isDropdown && (
          <div className={styles.dropdownMenu}>
            <div className={styles.dropdownItem} onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
