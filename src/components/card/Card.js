import React from 'react';
import styles from './Card.module.css';
import { Team } from '../team-tags/Team';

export const Card = () => {
  return (
    <>
      <li className={styles.item}>
        <div className={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
          incidunt?
        </div>
        <div className={styles.actions}>
          <div className={styles.actionBtn}>
            <i className="material-icons" style={{ fontSize: '30px' }}>
              list
            </i>
          </div>
          <div className={styles.team}>
            <Team>NN</Team>
            <Team>AB</Team>
          </div>
        </div>
      </li>
    </>
  );
};
