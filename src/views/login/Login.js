import React, { useState, useContext } from 'react';
import styles from './Login.module.css';
import { firebaseApp } from '../../firebase/init';
import { withRouter, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    if (!email || !password) {
      return alert('All fields are required');
    }

    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  }

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Login Now</h1>
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
        <button onClick={handleLogin}>Sign In</button>
      </div>
    </div>
  );
};

export default withRouter(Login);
