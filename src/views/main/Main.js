import React from 'react';
import styles from './Main.module.css';
import commonStyles from './../../common/styles/styles.module.css';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.main}>
        <div className={styles.text}>
          <h1>Lets Get Organized</h1>
          <p>
            Taskforce's boards, lists and cards enable you to organize and
            prioritize your projects in a fun, flexible and rewarding way.
          </p>
          <Link to="/signup" className={commonStyles.info}>
            Sign up for free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
