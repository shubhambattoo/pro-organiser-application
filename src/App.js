import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './views/home/Home';
import { AddBoard } from './views/create-board/AddBoard';
import { Header } from './components/header/Header';
import { Board } from './views/board/Board';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/board/create" component={AddBoard} />
        <Route path="/board/:name" component={Board} />
        <Route exact path="*" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
