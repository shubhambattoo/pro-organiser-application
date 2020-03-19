import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import commonStyles from './../../common/styles/styles.module.css';
import { Link } from 'react-router-dom';
import { getBoards } from '../../utils/data';

export const Home = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getBoards()
      .then(boards => {
        setBoards(boards);
      })
      .catch(err => {
        setBoards([]);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={commonStyles.title}>Boards</h2>
      <div className={styles.boards}>
        {boards.map(board => {
          return (
            <Link
              to={'/board/' + board.id}
              className={styles.board}
              key={board.id}
            >
              <div className={styles.boardName}>{board.name}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
