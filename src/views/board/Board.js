import React, { useEffect, useState } from 'react';
import commonStyles from './../../common/styles/styles.module.css';
import styles from './Board.module.css';
import { Modal } from './../../common/modal/Modal';
import { getBoard, getColumns, addColumn } from '../../utils/data';

export const Board = ({ match }) => {
  const [board, setBoard] = useState({});
  const [isColumnAdd, setIsColumnAdd] = useState(false);
  const [columns, setColumns] = useState([]);
  const [columnName, setColumnName] = useState('');

  useEffect(() => {
    (async function() {
      const data = await getBoard(match.params.name);
      setBoard(data);
      getAllColumns(data.id, setColumns);
    })();
  }, [match]);

  function handleAddCloumn() {
    if (!columnName) {
      return alert('Enter a column name');
    }

    const newColumn = {
      boardId: board.id,
      name: columnName,
      cards: []
    };

    addColumn(newColumn).then(value => {
      if (value) {
        getAllColumns(board.id, setColumns);
        setIsColumnAdd(false)
      }
    });
  }

  return (
    <>
      <div className={styles.container}>
        <h2 className={commonStyles.title}>
          {board.name}
        </h2>
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
                    <li>
                      <div className={styles.text}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Itaque, incidunt?
                      </div>
                      <div className={styles.actions}>
                        <div style={{ alignSelf: 'center', cursor: 'pointer' }}>
                          <i
                            className="material-icons"
                            style={{ fontSize: '30px' }}
                          >
                            list
                          </i>
                        </div>
                        <div className={styles.team}>
                          <div className={styles.circle}>NN</div>
                          <div className={styles.circle}>AB</div>
                        </div>
                      </div>
                    </li>
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
      {isColumnAdd && (
        <Modal>
          <div className={styles.modalHead}>Add Column</div>
          <div className={styles.modalBody}>
            <div className={styles.field}>
              <label htmlFor="column_name">Enter a Column Name:</label>
              <input
                type="text"
                value={columnName}
                name="column_name"
                id="column_name"
                onChange={(e) => setColumnName(e.target.value)}
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
