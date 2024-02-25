// Navegacion.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav style={{ backgroundColor: "blue" }}>
      <ul>
        <li><Link to="/">Login</Link></li>
        <li><Link to="/home">Home</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
