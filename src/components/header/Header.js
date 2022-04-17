import React, { useContext, useState } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import styles from './Header.module.css';
import { AuthContext } from '../../context/Auth';
import { firebaseApp } from '../../firebase/init';

function NavLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        className={match ? styles.activeLink : styles.link}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
}

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
          <Link to="/">Pro Organiser</Link>
        </div>
        <ul className={styles.menu}>
          {currentUser ? (
            <>
              <li>
                <NavLink to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/createboard">Create a board</NavLink>
              </li>
              <li className={styles.dropdown} onClick={toggleDropdown}>
                {currentUser.email}
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Sign Up</NavLink>
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
