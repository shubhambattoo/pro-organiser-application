import React, { useState, useEffect } from 'react';
import { Modal } from '../../common/modal/Modal';
import styles from './AddCard.module.css';
import commonStyles from './../../common/styles/styles.module.css';
import { Alert } from '../../common/alert/Alert';

export const AddCard = ({
  board,
  handleCardAdd,
  handleClose,
  card,
  isAdd = true,
  handleEdit
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [team, setTeam] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setDescription(card.description);
      setTeam(card.teamMembers);
      const date = new Date(card.date);
      setDueDate(date.toISOString().substr(0, 10));
    }
  }, [isAdd, card]);

  function onSelectChange(e) {
    const values = [...e.target.selectedOptions].map(opt => opt.value);
    setTeam(values);
  }

  function onAdd() {
    if (!title || !description || !dueDate || team.length === 0) {
      setError('All the fields are required');
      return;
    }

    const checkDateBool = checkDate(dueDate);

    if (checkDateBool) {
      setError('Cannot select a past date.');
      return;
    }

    setError(null);

    const card = createCard(dueDate, title, team, description);

    handleCardAdd(card);
  }

  function onEdit() {
    if (!title || !description || !dueDate || team.length === 0) {
      setError('All the fields are required');
      return;
    }

    const checkDateBool = checkDate(dueDate);

    if (checkDateBool) {
      setError('Cannot select a past date.');
      return;
    }

    setError(null);

    const card = createCard(dueDate, title, team, description);

    handleEdit(card);
  }

  return (
    <Modal>
      <div className={styles.modalHead}>
        <div>{isAdd ? 'Add Card' : 'Edit Card'}</div>
        <div className={styles.close} onClick={handleClose}>
          &times;
        </div>
      </div>
      {error && (
        <Alert
          children={error}
          type={'error'}
          canClose={() => setError(null)}
        />
      )}
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
          {isAdd ? (
            <button className={commonStyles.info} id="CreateCard" onClick={onAdd}>
              Add Card
            </button>
          ) : (
            <button className={commonStyles.info} onClick={onEdit}>
              Edit Card
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

function checkDate(dueDate) {
  const today = new Date().getTime();
  const dueDateMili = new Date(dueDate).getTime();

  if (dueDateMili < today) {
    return true;
  }

  return false;
}

function createCard(dueDate, title, teamMembers, description) {
  const date = new Date(dueDate).getTime();
  return {
    title,
    description,
    teamMembers,
    date,
    isArchive: false
  };
}
