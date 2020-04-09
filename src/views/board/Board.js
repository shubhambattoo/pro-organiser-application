import React, { useEffect, useState } from 'react';
import commonStyles from './../../common/styles/styles.module.css';
import styles from './Board.module.css';
import {
  getBoard,
  getColumns,
  addColumn,
  updateColumn,
  deleteColumn,
  deleteBoard,
} from '../../utils/data';
import { Loader } from '../../common/loader/Loader';
import { Card } from '../../components/card/Card';
import { AddCard } from '../../components/add-card/AddCard';
import { AddColumn } from '../../components/add-column/AddColumn';
import { createDeepCopy } from '../../utils/utility';
import * as shortid from 'shortid';
import { Alert } from '../../common/alert/Alert';

export const Board = ({ match, history }) => {
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState({});
  const [isColumnAdd, setIsColumnAdd] = useState(false);
  const [columns, setColumns] = useState([]);
  const [isCardAdd, setIsCardAdd] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [isAdd, setIsAdd] = useState(true);
  const [inEditCard, setInEditCard] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
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
      created: Date.now(),
    };

    addColumn(newColumn)
      .then((value) => {
        if (value) {
          newColumn['id'] = value;
          setColumns([...columns, newColumn]);
          setIsColumnAdd(false);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function handleModalClose() {
    setIsColumnAdd(false);
  }

  function openAddCard(column) {
    setIsCardAdd(true);
    setSelectedColumn(column);
    setInEditCard(null);
  }

  async function addCard(card) {
    try {
      card['id'] = shortid();
      const cards = [...selectedColumn.cards, card];
      const uColumn = createDeepCopy(selectedColumn);
      uColumn.cards = cards;
      const val = await updateColumn(uColumn.id, uColumn);
      if (val) {
        afterUpdateColumn(columns, selectedColumn, uColumn, setColumns);
        setIsCardAdd(false);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  function openCardEdit(card, column) {
    setIsAdd(false);
    setIsCardAdd(true);
    setSelectedColumn(column);
    setInEditCard(card);
  }

  async function handleCardEdit(upCard) {
    try {
      const card = { id: inEditCard.id, ...upCard };
      const uColumn = createDeepCopy(selectedColumn);
      const cards = selectedColumn.cards.filter((c) => c.id !== inEditCard.id);
      const newCards = [...cards, card];
      uColumn.cards = newCards;
      const val = await updateColumn(selectedColumn.id, uColumn);
      if (val) {
        afterUpdateColumn(columns, selectedColumn, uColumn, setColumns);
        setIsAdd(true);
        setIsCardAdd(false);
        setSelectedColumn(null);
        setInEditCard(null);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleCardArchive(card, column) {
    try {
      card.isArchive = true;
      const newCards = column.cards.filter((c) => c.id !== card.id);
      const upColumn = createDeepCopy(column);
      upColumn.cards = [...newCards, card];
      const val = await updateColumn(column.id, upColumn);
      if (val) {
        afterUpdateColumn(columns, column, upColumn, setColumns);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  async function onDragDrop(ev, newColumn) {
    try {
      const card = JSON.parse(ev.dataTransfer.getData('card'));
      const oldColumn = JSON.parse(ev.dataTransfer.getData('columnFrom'));
      if (oldColumn.id === newColumn.id) {
        return;
      }
      oldColumn.cards = oldColumn.cards.filter((c) => c.id !== card.id);
      const val = await updateColumn(oldColumn.id, oldColumn);
      newColumn.cards = [...newColumn.cards, card];
      const val1 = await updateColumn(newColumn.id, newColumn);
      if (val && val1) {
        const newCols = columns.filter(
          (col) => col.id !== oldColumn.id && col.id !== newColumn.id
        );
        const sortedCols = [...newCols, oldColumn, newColumn].sort(
          (a, b) => a.created - b.created
        );
        setColumns(sortedCols);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  function handleDeleteColumn(column) {
    const newCols = columns
      .filter((c) => c.id !== column.id)
      .sort((a, b) => a.created - b.created);
    deleteColumn(column.id)
      .then(() => {
        setColumns(newCols);
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  async function handleBoardDelete() {
    if (window.confirm('Are you sure you want to delete the board?')) {
      setLoading(true);
      await Promise.all(
        columns.map(async (c) => {
          await deleteColumn(c.id);
        })
      );
      const val = await deleteBoard(board.id);
      if (val) {
        history.push('/');
      }
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <div className={styles.containerHeader}>
            <h2 className={commonStyles.title}>{board.name}</h2>
            <button className={commonStyles.danger} onClick={handleBoardDelete}>
              Delete Board
            </button>
          </div>
          {error && (
            <Alert type={'error'} canClose={() => setError(null)}>
              {error}
            </Alert>
          )}
          <div className={styles.ui}>
            <div className={styles.columns}>
              {columns.map((column) => {
                return (
                  <div
                    className={styles.column}
                    key={column.id}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      onDragDrop(e, column);
                    }}
                  >
                    <header>
                      {column.name}
                      <div
                        className={styles.trash}
                        onClick={() => handleDeleteColumn(column)}
                      >
                        <i
                          className="material-icons"
                          style={{ fontSize: '25px' }}
                        >
                          delete_outline
                        </i>
                      </div>
                    </header>
                    <ul>
                      {column.cards.map(
                        (card) =>
                          !card.isArchive && (
                            <Card
                              card={card}
                              board={board}
                              key={card.id}
                              hanldeEdit={() => openCardEdit(card, column)}
                              hanldeArchive={() =>
                                handleCardArchive(card, column)
                              }
                              column={column}
                            />
                          )
                      )}
                    </ul>
                    <footer>
                      <div
                        className={styles.add}
                        onClick={() => openAddCard(column)}
                      >
                        Add a card
                      </div>
                    </footer>
                  </div>
                );
              })}
              <button
                className={styles.addButton}
                onClick={() => setIsColumnAdd(true)}
              >
                Add a column
              </button>
            </div>
          </div>
        </div>
      )}
      {isColumnAdd && (
        <AddColumn handleClose={handleModalClose} handleAdd={handleAddCloumn} />
      )}
      {isCardAdd && (
        <AddCard
          board={board}
          handleCardAdd={addCard}
          handleClose={() => setIsCardAdd(false)}
          isAdd={isAdd}
          card={inEditCard}
          handleEdit={handleCardEdit}
        />
      )}
    </>
  );
};

function afterUpdateColumn(columns, selectedColumn, upColumn, setColumns) {
  const filColumns = columns.filter((cl) => cl.id !== selectedColumn.id);
  const newColumns = [...filColumns, upColumn];
  newColumns.sort((a, b) => a.created - b.created);
  setColumns(newColumns);
}

async function getAllColumns(id, setColumns) {
  const resCols = await getColumns(id);
  setColumns(resCols);
}
