import React from 'react';
import styles from './Modal.module.css';

export const Modal = ({ children, handleClose }) => {
  return (
    <div className={styles.modalContainer}>
      <div onClick={handleClose} className={styles.close}>&times;</div>
      <div className={styles.modal}>{children}</div>
    </div>
  );
};
