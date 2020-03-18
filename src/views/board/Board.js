import React from 'react';
import commonStyles from './../../common/styles/styles.module.css';
import styles from './Board.module.css';

export const Board = ({ match }) => {
  return (
    <div className={styles.container}>
      <h2 className={commonStyles.title}>{match.params.name}</h2>
    </div>
  );
};
