import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import './UserDashboard.css';

function UserDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return <div className="dashboard-container"><p>Loading...</p></div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h1>User Dashboard</h1>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>

        <div className="user-info">
          <h2>Welcome, {user?.displayName || 'User'}</h2>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>UID:</strong> {user?.uid}</p>
        </div>

        <div className="dashboard-content">
          <div className="section">
            <h3>Your Account</h3>
            <ul>
              <li>View profile information</li>
              <li>Update account settings</li>
              <li>Change password</li>
              <li>Manage preferences</li>
            </ul>
          </div>

          <div className="section">
            <h3>Available Actions</h3>
            <button className="action-button">View Profile</button>
            <button className="action-button">Account Settings</button>
            <button className="action-button">View History</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
