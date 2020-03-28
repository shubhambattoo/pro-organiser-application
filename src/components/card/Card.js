import React, { useState } from 'react';
import styles from './Card.module.css';
import commonStyles from './../../common/styles/styles.module.css';
import { Team } from '../team-tags/Team';
import { Modal } from '../../common/modal/Modal';
import { convertDateToNice } from '../../utils/utility';

export const Card = ({ card, board }) => {
  const [isDetails, setIsDetails] = useState(false);
  const members = card.teamMembers.map(name => <Team name={name} key={name} />);
  const date = card.date.toDate();
  const dueDate = convertDateToNice(date);
  const detailsModal = (
    <Modal >
      <div className={styles.modalHeader}>
        <div className={styles.title}>
          {card.title}
          <div className={styles.meta}>
            in <span>{board.name}</span>
          </div>
        </div>
        <div className={styles.btnGroup}>
          <button className={commonStyles.info}>Edit</button>
          <button className={commonStyles.danger}>Archive</button>
        </div>
        <div className={styles.modalClose} onClick={() => setIsDetails(false)}>
          &times;
        </div>
      </div>
      <div className={styles.modalBody}>
        <div className={styles.det}>
          <header>Description</header>
          <div>{card.description}</div>
        </div>
        <div className={styles.det}>
          <header>Members</header>
          <div className={styles.detTeam}>{members}</div>
        </div>
        <div className={styles.det}>
          <header>Due Date</header>
          <div>{dueDate}</div>
        </div>
      </div>
    </Modal>
  );

  return (
    <>
      <li className={styles.item} onClick={() => setIsDetails(true)}>
        <div className={styles.text}>{card.title}</div>
        <div className={styles.actions}>
          <div className={styles.actionBtn}>
            <i className="material-icons" style={{ fontSize: '30px' }}>
              list
            </i>
          </div>
          <div className={styles.team}>{members}</div>
        </div>
      </li>
      {isDetails && detailsModal}
    </>
  );
};
