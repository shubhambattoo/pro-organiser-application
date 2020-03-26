import React, { useState } from 'react';
import { Modal } from '../../common/modal/Modal';
import styles from './AddColumn.module.css';
import commonStyles from './../../common/styles/styles.module.css';

export const AddColumn = ({ handleAdd, handleClose }) => {
  const [columnName, setColumnName] = useState('');

  function handleAddCloumn() {
    if (!columnName) {
      return alert('Enter a column name');
    }

    handleAdd(columnName);
  }

  return (
    <Modal>
      <div className={styles.modalHead}>
        <div>Add Column</div>
        <div className={styles.close} onClick={handleClose}>
          &times;
        </div>
      </div>
      <div className={styles.modalBody}>
        <div className={styles.field}>
          <label htmlFor="column_name">Enter a Column Name:</label>
          <input
            type="text"
            value={columnName}
            name="column_name"
            id="column_name"
            onChange={e => setColumnName(e.target.value)}
          />
        </div>
        <div className={styles.action}>
          <button
            id="CreateColumn"
            onClick={handleAddCloumn}
            className={commonStyles.info}
          >
            Add Column
          </button>
        </div>
      </div>
    </Modal>
  );
};
