import React, { useContext } from 'react';
import styles from './Main.module.css';
import commonStyles from './../../common/styles/styles.module.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';

const Main = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={styles.banner}>
      <h1 className={styles.brand}>Pro Organiser</h1>
      <div className={styles.main}>
        <div className={styles.text}>
          <h2>Lets Get Organized</h2>
          <p>
            Pro Organiser’s boards, lists, and cards enable you to organize and
            prioritize your projects in a fun, flexible, and rewarding way.
          </p>
          <Link to="/signup" className={commonStyles.info}>
            {currentUser ? 'Use App' : 'Sign up for free'}
          </Link>
        </div>

        <footer className={styles.foot}>
          &copy; 2020 Pro Organiser by{' '}
          <a href="https://github.com/shubhambattoo">Shubham Battoo</a>
        </footer>
      </div>
    </div>
  );
};

export default Main;
