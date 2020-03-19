import db from './../firebase/init';

export const getBoards = async () => {
  try {
    const snapshot = await db.collection('boards').get();
    const boards = snapshot.docs.map(d => ({ ...d.data(), id: d.id }));
    return boards;
  } catch (error) {
    console.error(error);
    return [];
  }
};
