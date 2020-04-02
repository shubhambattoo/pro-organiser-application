import React, { useState } from 'react';
import styles from '../../common/styles/formStyles.module.css';
import commonStyle from '../../common/styles/styles.module.css';
import { withRouter, Link } from 'react-router-dom';
import { firebaseApp } from '../../firebase/init';
import { Alert } from '../../common/alert/Alert';

const SignUp = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  function handleSignUp() {
    if (!email || !password) {
      return alert('All fields are required');
    }

    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        history.push('/');
      })
      .catch(err => {
        setError(err.message);
      });
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>Getting started</div>
      {error && <Alert> {error} </Alert>}
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='mail@example.com'
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='******'
        />
      </div>
      <div className={styles.formGroup}>
        <button className={commonStyle.info} onClick={handleSignUp}>Sign Up</button>
      </div>
      <div className={styles.meta}>
        Have an account? <Link to="/login">login now</Link>.
      </div>
    </div>
  );
};

export default withRouter(SignUp);
