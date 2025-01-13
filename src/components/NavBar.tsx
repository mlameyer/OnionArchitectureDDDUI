import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Order List</Link></li>
        <li><Link to="/create-order">Create Order</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
