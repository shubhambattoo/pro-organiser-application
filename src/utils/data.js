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
export const addBoard = async (id, board) => {
  try {
    const created = await db
      .collection('boards')
      .doc(id)
      .set(board);
    console.log(created.id);
    return created.id;
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
