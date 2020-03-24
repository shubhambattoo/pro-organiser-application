import React from 'react';
import styles from './Team.module.css';

export const Team = ({ children }) => {
  return <div className={styles.circle}>{children}</div>;
};
