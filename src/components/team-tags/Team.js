import React from 'react';
import styles from './Team.module.css';

export const Team = ({ name }) => {
  const arr = name.split(' ');
  const abbr = `${arr[0].charAt(0)}${arr[1].charAt(0)}`;
  return <div className={styles.circle}>{abbr}</div>;
};
