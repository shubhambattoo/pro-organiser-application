import React from 'react';
import commonStyles from './../../common/styles/styles.module.css';
import styles from './AddBoard.module.css';

export const AddBoard = () => {
  return (
    <div className={styles.container}>
      <h2 className={commonStyles.title}>Create a board</h2>
    </div>
  );
};
