import React, { useState } from 'react';
import styles from './Card.module.css';
import commonStyles from './../../common/styles/styles.module.css';
import { Team } from '../team-tags/Team';
import { Modal } from '../../common/modal/Modal';
import { convertDateToNice } from '../../utils/utility';

export const Card = ({ card, board, hanldeEdit, hanldeArchive, column }) => {
  const [isDetails, setIsDetails] = useState(false);
  const members = card.teamMembers.map(name => <Team name={name} key={name} />);
  const date = new Date(card.date);
  const dueDate = convertDateToNice(date);

  function doEdit() {
    setIsDetails(false);
    hanldeEdit();
  }

  function doArchive() {
    setIsDetails(false);
    hanldeArchive();
  }

  const detailsModal = (
    <Modal>
      <div className={styles.modalHeader}>
        <div className={styles.title}>
          {card.title}
          <div className={styles.meta}>
            in <span>{board.name}</span>
          </div>
        </div>
        <div className={styles.btnGroup}>
          <button className={commonStyles.info} onClick={doEdit}>
            Edit
          </button>
          <button className={commonStyles.danger} onClick={doArchive}>
            Archive
          </button>
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

  function dragStart(ev, card) {
    ev.dataTransfer.setData("card", JSON.stringify(card));
    ev.dataTransfer.setData("columnFrom", JSON.stringify(column));
  }

  return (
    <>
      <li
        className={styles.item}
        onDragStart={e => dragStart(e, card)}
        draggable
        onClick={() => setIsDetails(true)}
      >
        <div className={styles.text}>{card.title}</div>
        <div className={styles.actions}>
          <div className={styles.actionBtn}>
            <i
              className="material-icons"
              style={{ fontSize: '30px', cursor: 'move' }}
            >
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
