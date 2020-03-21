import React, { useEffect, useState } from 'react';
import commonStyles from './../../common/styles/styles.module.css';
import styles from './Board.module.css';
import { getBoard } from '../../utils/data';

export const Board = ({ match }) => {
  const [board, setBoard] = useState({});

  useEffect(() => {
    getBoard(match.params.name)
      .then(data => {
        setBoard(data);
      })
      .catch(() => {
        setBoard({});
      });
  }, [match]);

  return (
    <div className={styles.container}>
      <h2 className={commonStyles.title}>
        {match.params.name.split('-').join(' ')}
      </h2>
      <div className={styles.ui}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <header>Main Website</header>
            <ul>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
                incidunt?
              </li>
              <li>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptate voluptatem veritatis soluta, blanditiis cum ab
                exercitationem. Unde nostrum incidunt soluta vel tenetur. Ipsam
                atque non, debitis ipsa consectetur aperiam saepe officiis
                assumenda est animi aut fugit optio esse eos tenetur laudantium.
                Nisi quos adipisci numquam maiores deleniti praesentium id
                repudiandae et assumenda earum harum, architecto provident
                ducimus perspiciatis rem ipsum beatae sequi error veritatis
                culpa fugit? Quis quasi alias molestias unde error assumenda
                magni velit corporis consequatur nostrum architecto minus id
                quidem facere veritatis, tempore dolore ipsum earum delectus ad,
                vel repudiandae? Tempore aliquid nesciunt modi laboriosam vero
                explicabo nostrum.
              </li>
            </ul>
            <footer>Add a Card</footer>
          </div>
          <button id="CreateColumn" className={styles.addButton}>Add column</button>
        </div>
      </div>
    </div>
  );
};
