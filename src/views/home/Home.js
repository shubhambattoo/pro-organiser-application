import React from 'react';
import styles from './Home.module.css'
import commonStyles from './../../common/styles/styles.module.css'
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className={styles.container}>
      <h2 className={commonStyles.title}>Boards</h2>
      <div className={styles.boards}>
        <Link to="/board/agile" className={styles.board}>
          <div className={styles.boardName}>
            Agile
          </div>
        </Link>
        <Link to="/board/development" className={styles.board}>
          <div className={styles.boardName}>
            Development
          </div>
        </Link >
        <Link to="/board/kanban" className={styles.board}>
          <div className={styles.boardName}>
            Kanban
          </div>
        </Link >
      </div>
    </div>
  );
};
