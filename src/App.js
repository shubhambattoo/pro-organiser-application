import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './views/home/Home';
import { AddBoard } from './views/create-board/AddBoard';
import { Header } from './components/header/Header';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/create-board">
          <AddBoard />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
