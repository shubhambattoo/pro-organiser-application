import React, { useState, useEffect } from 'react';
import { Modal } from '../../common/modal/Modal';
import styles from './AddCard.module.css';
import commonStyles from './../../common/styles/styles.module.css';
import { Alert } from '../../common/alert/Alert';
import Select from 'react-select';

export const AddCard = ({
  board,
  handleCardAdd,
  handleClose,
  card,
  isAdd = true,
  handleEdit,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [team, setTeam] = useState([]);
  const [error, setError] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setDescription(card.description);

      const selectedTeam = convertTeam(card.teamMembers);
      setTeam(selectedTeam);

      const date = new Date(card.date);
      setDueDate(date.toISOString().substr(0, 10));
    }
  }, [isAdd, card]);

  useEffect(() => {
    const team = convertTeam(board.teamMembers);

    setTeamMembers(team);
  }, [board]);

  function onSelectChange(selectedOptions) {
    setTeam(selectedOptions);
  }

  function onSave() {
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
    const selectedTeam = team.map((opt) => opt.value);
    const card = createCard(dueDate, title, selectedTeam, description);

    if (isAdd) {
      handleCardAdd(card);
    } else {
      handleEdit(card);
    }
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
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.formRow}>
          <div className={styles.formField}>
            <label htmlFor="title">Choose members for this task</label>
            <Select
              options={teamMembers}
              isMulti
              closeMenuOnSelect={false}
              onChange={onSelectChange}
              value={team}
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="title">Select the due date for this task</label>
            <input
              type="date"
              name="title"
              id="due_date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.formField}>
          <label htmlFor="title">Add the descriptions for your task</label>
          <textarea
            name="description"
            id="description"
            placeholder="Add your description here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <small className={styles.formInfo}>
            <svg
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              height="16"
              aria-hidden="true"
              className={styles.markIcon}
            >
              <path
                fillRule="evenodd"
                d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"
              ></path>
            </svg>
            Styling with Markdown is supported
          </small>
        </div>

        <div className={styles.formField}>
          <button
            className={commonStyles.info}
            id="CreateCard"
            onClick={onSave}
          >
            {isAdd ? 'Add Card' : 'Edit Card'}
          </button>
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
    isArchive: false,
  };
}

function convertTeam(memebers) {
  return memebers.map((member) => ({
    label: member,
    value: member,
  }));
}
