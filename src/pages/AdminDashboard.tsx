import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
import './AdminDashboard.css';

function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Fetch user role from Firestore
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            const role = userDocSnap.data().role;
            setUserRole(role);
            
            // If not admin, redirect to user dashboard
            if (role !== 'admin') {
              navigate('/user-dashboard');
              return;
            }
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }

        // Fetch user and item counts
        try {
          const usersSnapshot = await getDocs(collection(db, 'users'));
          setUserCount(usersSnapshot.size);

          const itemsSnapshot = await getDocs(collection(db, 'items'));
          setItemCount(itemsSnapshot.size);
        } catch (error) {
          console.error('Error fetching counts:', error);
        }

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

  if (userRole !== 'admin') {
    return <div className="dashboard-container"><p>Unauthorized access</p></div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>

        <div className="user-info">
          <h2>Welcome, Admin</h2>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>UID:</strong> {user?.uid}</p>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <h3>{userCount}</h3>
            <p>Total Users</p>
          </div>
          <div className="stat-card">
            <h3>{itemCount}</h3>
            <p>Total Items</p>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="section">
            <h3>System Features</h3>
            <ul>
              <li>✅ Manage all user items</li>
              <li>✅ View all system data</li>
              <li>✅ Monitor user statistics</li>
              <li>✅ Full data access</li>
            </ul>
          </div>

          <div className="section">
            <h3>Quick Actions</h3>
            <Link to="/items" className="action-button">View All Items</Link>
            <Link to="/" className="action-button">Return to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
