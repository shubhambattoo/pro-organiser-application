import React from 'react';
import styles from './Card.module.css';
import { Team } from '../team-tags/Team';

export const Card = ({ card, board }) => {
  return (
    <>
      <li className={styles.item}>
        <div className={styles.text}>{card.title}</div>
        <div className={styles.actions}>
          <div className={styles.actionBtn}>
            <i className="material-icons" style={{ fontSize: '30px' }}>
              list
            </i>
          </div>
          <div className={styles.team}>
            {card.teamMembers.map(name => (
              <Team name={name} key={name} />
            ))}
          </div>
        </div>
      </li>
    </>
  );
};
