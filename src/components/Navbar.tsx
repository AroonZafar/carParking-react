import { memo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import './Navbar.css';

const Navbar = memo(function Navbar() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Item Manager</h1>
        <ul className="navbar-menu">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/create" className="nav-link">Create Item</Link></li>
          <li><Link to="/items" className="nav-link">All Items</Link></li>
        </ul>
        <div className="navbar-auth">
          {user ? (
            <>
              <span className="user-email">{user.email}</span>
              <Link to="/user-dashboard" className="nav-link">Dashboard</Link>
              <Link to="/delete-account" className="nav-link delete-link">Delete Account</Link>
              <button onClick={handleLogout} className="nav-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link auth-link">Login</Link>
              <Link to="/signup" className="nav-link auth-link signup-link">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
