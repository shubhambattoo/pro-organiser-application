import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Home } from './views/home/Home';
import { AddBoard } from './views/create-board/AddBoard';
import { Header } from './components/header/Header';
import { Board } from './views/board/Board';
import SignUp from './views/signUp/SignUp';
import Login from './views/login/Login';
import { AuthProvider } from './context/Auth';
import PrivateRoute from './common/guards/PrivateRoute';
import './common/styles/markdown.scss';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/createboard"
            element={
              <PrivateRoute>
                <AddBoard />
              </PrivateRoute>
            }
          />
          <Route
            path="/board/:name"
            element={
              <PrivateRoute>
                <Board />
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
