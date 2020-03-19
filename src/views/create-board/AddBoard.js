import React, { useState } from 'react';
import commonStyles from './../../common/styles/styles.module.css';
import styles from './AddBoard.module.css';

export const AddBoard = () => {
  const [name, setName] = useState('');
  const [teamMember, setTeamMember] = useState('');
  const [type, setType] = useState('');

  const saveBoard = () => {
    if (!name && !teamMember) {
      return alert('Name and Team Members are required fields');
    }

    const teamMembers = teamMember.split(',');

    const newBoard = {
      name,
      teamMembers,
      type
    }

    console.log(newBoard);
  }

  return (
    <div className={styles.container}>
      <h2 className={commonStyles.title}>Create a board</h2>
      <div className={styles.field}>
        <label htmlFor="name">Enter a name for your board</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          id="name"
          placeholder="eg. Agile Sprint Board"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="team">Add your Team members</label>
        <input
          type="text"
          name="team"
          id="team"
          value={teamMember}
          onChange={e => setTeamMember(e.target.value)}
          placeholder="Add your team members(separated by commas)"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="type">Enter the type for your board</label>
        <input
          type="text"
          name="type"
          id="type"
          value={type}
          onChange={e => setType(e.target.value)}
          placeholder="eg. Design UX"
        />
      </div>
      <div className={styles.field}>
        <button type="submit" onClick={saveBoard} className={commonStyles.info} id="CreateBoard">
          Create
        </button>
      </div>
    </div>
  );
};
