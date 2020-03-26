import React, { useState } from 'react';
import { Modal } from '../../common/modal/Modal';
import styles from './AddCard.module.css';
import commonStyles from './../../common/styles/styles.module.css';

export const AddCard = ({ board, handleCardAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [team, setTeam] = useState([]);

  function onSelectChange(e) {
    const values = [...e.target.selectedOptions].map(opt => opt.value);
    setTeam(values);
  };

  function onAdd() {
    // if ()
  }

  return (
    <Modal>
      <div className={styles.modalHead}>
        <div>Add Card</div>
        <div className={styles.close}>&times;</div>
      </div>
      <div className={styles.modalBody}>
        <div className={styles.formField}>
          <label htmlFor="title">Enter the title for your task</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="eg. Add a new Icon"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="title">
            Choose members for this task(select multiple, if needed)
          </label>
          <select
            name="members"
            id="members"
            multiple={true}
            value={team}
            onChange={onSelectChange}
          >
            {board.teamMembers.map(member => (
              <option value={member} key={member}>
                {member}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formField}>
          <label htmlFor="title">Add the descriptions for your task</label>
          <input
            type="text"
            name="title"
            id="description"
            placeholder="Add your description here"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="title">Select the due date for this task</label>
          <input
            type="date"
            name="title"
            id="due_date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
        </div>
        <div className={styles.formField}>
          <button className={commonStyles.info} onClick={onAdd} >Add Card</button>
        </div>
      </div>
    </Modal>
  );
};
