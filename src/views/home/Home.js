import React, { useEffect, useState, useContext } from 'react';
import styles from './Home.module.css';
import commonStyles from './../../common/styles/styles.module.css';
import { Link } from 'react-router-dom';
import { getBoards } from '../../utils/data';
import { Alert } from '../../common/alert/Alert';
import { Loader } from '../../common/loader/Loader';
import { AuthContext } from '../../context/Auth';

export const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getBoards(currentUser.email)
      .then((boards) => {
        setBoards(boards);
        setLoading(false);
      })
      .catch(() => {
        setBoards([]);
      });
  }, [currentUser]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <h2 className={commonStyles.title}>Boards</h2>
          {boards.length === 0 && (
            <Alert type="info" isClosable={false}>
              You haven't created any boards. Kindly click on the 'Create a
              Board' button in the navigation bar to create a board.
            </Alert>
          )}
          <div className={styles.boards}>
            {boards.map((board) => {
              return (
                <Link
                  to={'/board/' + board.id}
                  className={styles.board}
                  key={board.id}
                >
                  <div className={styles.boardName}>{board.name}</div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
