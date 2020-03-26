import React, { useEffect, useState } from 'react';
import commonStyles from './../../common/styles/styles.module.css';
import styles from './Board.module.css';
import { getBoard, getColumns, addColumn } from '../../utils/data';
import { Loader } from '../../common/loader/Loader';
import { Card } from '../../components/card/Card';
import { AddCard } from '../../components/add-card/AddCard';
import { AddColumn } from '../../components/add-column/AddColumn';

export const Board = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState({});
  const [isColumnAdd, setIsColumnAdd] = useState(false);
  const [columns, setColumns] = useState([]);
  const [isCardAdd, setIsCardAdd] = useState(false);

  useEffect(() => {
    (async function() {
      const data = await getBoard(match.params.name);
      setBoard(data);
      await getAllColumns(data.id, setColumns);
      setLoading(false);
    })();
  }, [match]);

  function handleAddCloumn(columnName) {
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

  function addCard(card) {
    
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
                      <button onClick={() => setIsCardAdd(true)}>Add a Card</button>
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
        <AddColumn handleClose={handleModalClose} handleAdd={handleAddCloumn} />
      )}
      {isCardAdd && (
        <AddCard board={board} handleCardAdd={addCard} />
      )}
    </>
  );
};

async function getAllColumns(id, setColumns) {
  const resCols = await getColumns(id);
  setColumns(resCols);
}
