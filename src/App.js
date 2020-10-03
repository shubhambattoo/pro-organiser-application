import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
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
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/createboard" component={AddBoard} />
          <PrivateRoute path="/board/:name" component={Board} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="*" render={() => <Redirect to='/' />} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
