import React, { useEffect, useState } from 'react';
import commonStyles from './../../common/styles/styles.module.css';
import styles from './Board.module.css';
import { getBoard } from '../../utils/data';

export const Board = ({ match }) => {
  const [board, setBoard] = useState({});

  useEffect(() => {
    getBoard(match.params.name)
      .then(data => {
        setBoard(data);
      })
      .catch(err => {
        setBoard({});
      });
  }, [match]);

  return (
    <div className={styles.container}>
      <h2 className={commonStyles.title}>{match.params.name}</h2>
    </div>
  );
};
