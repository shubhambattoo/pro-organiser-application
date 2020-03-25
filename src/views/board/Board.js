import React, { useEffect, useState } from 'react';
import commonStyles from './../../common/styles/styles.module.css';
import styles from './Board.module.css';
import { Modal } from './../../common/modal/Modal';
import { getBoard, getColumns, addColumn } from '../../utils/data';
import { Loader } from '../../common/loader/Loader';
import { Card } from '../../components/card/Card';

export const Board = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState({});
  const [isColumnAdd, setIsColumnAdd] = useState(false);
  const [columns, setColumns] = useState([]);
  const [columnName, setColumnName] = useState('');

  useEffect(() => {
    (async function() {
      const data = await getBoard(match.params.name);
      setBoard(data);
      await getAllColumns(data.id, setColumns);
      setLoading(false);
    })();
  }, [match]);

  function handleAddCloumn() {
    if (!columnName) {
      return alert('Enter a column name');
    }

    const newColumn = {
      boardId: board.id,
      name: columnName,
      cards: [],
      created: new Date()
    };

    addColumn(newColumn).then(value => {
      if (value) {
        getAllColumns(board.id, setColumns);
        setIsColumnAdd(false);
      }
    });
  }

  function handleModalClose() {
    setIsColumnAdd(false);
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <div className={styles.containerHeader}>
            <h2 className={commonStyles.title}>{board.name}</h2>
            <button className={commonStyles.danger}>Delete Board</button>
          </div>
          <div className={styles.ui}>
            <div className={styles.columns}>
              {columns.map(column => {
                return (
                  <div className={styles.column} key={column.id}>
                    <header>
                      {column.name}
                      <div className={styles.trash}>
                        <i
                          className="material-icons"
                          style={{ fontSize: '25px' }}
                        >
                          delete_outline
                        </i>
                      </div>
                    </header>
                    <ul>
                      {column.cards.map(card => (
                        <Card card={card} board={board} key={card.date} />
                      ))}
                    </ul>
                    <footer>
                      <button>Add a Card</button>
                    </footer>
                  </div>
                );
              })}
              <button
                id="CreateColumn"
                onClick={() => setIsColumnAdd(true)}
                className={styles.addButton}
              >
                Add column
              </button>
            </div>
          </div>
        </div>
      )}
      {isColumnAdd && (
        <Modal handleClose={handleModalClose}>
          <div className={styles.modalHead}>Add Column</div>
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
      )}
    </>
  );
};

async function getAllColumns(id, setColumns) {
  const resCols = await getColumns(id);
  setColumns(resCols);
}
