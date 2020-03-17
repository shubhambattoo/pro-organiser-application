import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <nav>
        <div className="brand">
          <Link to="/">Pro Organiser</Link>
        </div>
        <ul className="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create-board">Create a board</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
