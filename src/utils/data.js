import db from './../firebase/init';

export const getBoards = async () => {
  try {
    const snapshot = await db
      .collection('boards')
      .orderBy('name', 'desc')
      .get();
    const boards = snapshot.docs.map(d => ({ ...d.data(), id: d.id }));
    return boards;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Method which adds a board
 * @param {string} id for the doc
 * @param {object} board the board which has to be created
 */
export const addBoard = async (board) => {
  try {
    await db
      .collection('boards')
      .add(board);
    return true;
  } catch (error) {
    console.error(error);
    return error;
  }
};

/**
 * Gets a single board with a given ID
 * @param {string} id single board ID
 */
export const getBoard = async id => {
  try {
    const board = await db
      .collection('boards')
      .doc(id)
      .get();
    return { ...board.data(), id: board.id };
  } catch (error) {
    console.log(error);
  }
};

export const getColumns = async boardId => {
  try {
    const snapshot = await db
      .collection('columns')
      .where('boardId', '==', boardId)
      .orderBy('created')
      .get();
    const boards = snapshot.docs.map(d => ({ ...d.data(), id: d.id }));
    return boards;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addColumn = async (column) => {
  try {
    await db.collection('columns').add(column);
    return true;
  } catch (error) {
    console.error(error);
    return error;
  }
};
