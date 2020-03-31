import React, { useState } from 'react';
import styles from './SignUp.module.css';
import { withRouter } from 'react-router-dom';
import { firebaseApp } from '../../firebase/init';

const SignUp = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignUp() {
    if (!email || !password) {
      return alert('All fields are required');
    }

    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        history.push('/');
      });
  }

  return (
    <div>
      <h1>Getting started</h1>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
