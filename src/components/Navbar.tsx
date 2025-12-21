import { memo } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = memo(function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Item Manager</h1>
        <ul className="navbar-menu">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/create" className="nav-link">Create Item</Link></li>
          <li><Link to="/items" className="nav-link">All Items</Link></li>
        </ul>
      </div>
    </nav>
  );
});

export default Navbar;
