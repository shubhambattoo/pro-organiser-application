import React, { useState } from 'react';
import styles from './Card.module.css';
import { Team } from '../team-tags/Team';
import { Modal } from '../../common/modal/Modal';

export const Card = ({ card, board }) => {
  const [title, setTitle] = useState('');

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
      <Modal>
        <div className={styles.modalHead}>Add Card</div>
        <div className={styles.modalBody}>
          <div className={styles.formField}>
            <label htmlFor="title">Enter the title for your task</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="eg. Add a new Icon"
              value={title}
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="title">Choose members for this task(select multiple, if needed)</label>
            <select name="members" id="members" multiple>
              {
                board.teamMembers.map(member => (
                  <option value={member} key={member}>{member}</option>
                ))
              }
            </select>
          </div>
        </div>
      </Modal>
    </>
  );
};
