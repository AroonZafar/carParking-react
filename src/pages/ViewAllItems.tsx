import { useState, useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, query, orderBy, where, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './ViewAllItems.css';

interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  createdAt: any;
  userId: string;
  createdBy: string;
}

const ViewAllItems = memo(function ViewAllItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState('user');
  const isMounted = useRef(true);
  const cachedItems = useRef<Item[]>([]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    fetchUserRole();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [userRole]);

  const fetchUserRole = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists() && isMounted.current) {
        setUserRole(userDoc.data().role || 'user');
      }
    } catch (err) {
      console.error('Error fetching user role:', err);
    }
  };

  const fetchItems = async () => {
    setLoading(true);
    setError('');
    try {
      const user = auth.currentUser;
      if (!user) {
        setError('You must be logged in');
        setLoading(false);
        return;
      }

      let q;
      if (userRole === 'admin') {
        // Admin sees all items
        q = query(collection(db, 'items'), orderBy('createdAt', 'desc'));
      } else {
        // Regular users see only their items
        q = query(
          collection(db, 'items'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
      }

      const querySnapshot = await getDocs(q);
      const itemsData: Item[] = [];
      querySnapshot.forEach((document) => {
        itemsData.push({ id: document.id, ...document.data() } as Item);
      });
      
      if (isMounted.current) {
        cachedItems.current = itemsData;
        setItems(itemsData);
        setLoading(false);
      }
    } catch (err: any) {
      if (isMounted.current) {
        setError(err.message || 'Failed to fetch items');
        setLoading(false);
      }
    }
  };

  const handleDelete = async (id: string, itemUserId: string) => {
    const user = auth.currentUser;
    
    // Check if user can delete this item
    if (userRole !== 'admin' && user?.uid !== itemUserId) {
      setError('You can only delete your own items');
      return;
    }

    if (window.confirm('Are you sure you want to delete this item?')) {
      const originalItems = items;
      setItems(items.filter(item => item.id !== id));
      
      try {
        await deleteDoc(doc(db, 'items', id));
        cachedItems.current = items.filter(item => item.id !== id);
      } catch (err: any) {
        setItems(originalItems);
        setError(err.message || 'Failed to delete item');
      }
    }
  };

  return (
    <div className="view-all-items-container">
      <div className="view-all-items-header">
        <h1>All Items {userRole === 'user' && '(Your Items)'}</h1>
        <Link to="/create" className="btn btn-primary">+ Create New Item</Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading items...</div>
      ) : items.length === 0 ? (
        <div className="no-items">
          <p>No items found. <Link to="/create">Create your first item</Link></p>
        </div>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <div className="item-header">
                <h2>{item.title}</h2>
                {item.category && <span className="category-badge">{item.category}</span>}
              </div>

              <p className="item-description">{item.description}</p>

              <div className="item-price">
                <strong>${item.price.toFixed(2)}</strong>
              </div>

              {item.createdBy && (
                <div className="item-creator">
                  <small>Created by: {item.createdBy}</small>
                </div>
              )}

              <div className="item-actions">
                <Link to={`/items/${item.id}`} className="btn btn-primary">
                  View Details
                </Link>
                <Link to={`/items/${item.id}/edit`} className="btn btn-secondary">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item.id, item.userId)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default ViewAllItems;
