import React, { useState, useContext } from 'react';
import styles from '../../common/styles/formStyles.module.css';
import commonStyle from '../../common/styles/styles.module.css';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { firebaseApp } from '../../firebase/init';
import { Alert } from '../../common/alert/Alert';
import { AuthContext } from '../../context/Auth';

const SignUp = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  function handleSignUp() {
    if (!email || !password || !name) {
      return setError('All fields are required');
    }

    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebaseApp.auth().currentUser;
        user
          .updateProfile({ displayName: name })
          .then(() => {
            history.push('/');
          })
          .catch((err) => {
            throw Error(err);
          });
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  function handleAlertClose() {
    setError('');
  }

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>Getting started</div>
      {error && (
        <Alert type="error" canClose={handleAlertClose}>
          {error}
        </Alert>
      )}
      <div className={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="mail@example.com"
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"
        />
      </div>
      <div className={styles.formGroup}>
        <button className={commonStyle.info} onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
      <div className={styles.meta}>
        Have an account? <Link to="/login">login now</Link>.
      </div>
    </div>
  );
};

export default withRouter(SignUp);
