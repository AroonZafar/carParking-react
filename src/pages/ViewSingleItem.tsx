import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import './ViewSingleItem.css';

interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  createdAt: any;
}

export default function ViewSingleItem() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (id) {
      fetchItem(id);
    }
  }, [id]);

  const fetchItem = async (itemId: string) => {
    try {
      const docSnap = await getDoc(doc(db, 'items', itemId));
      if (isMounted.current) {
        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() } as Item);
        } else {
          setError('Item not found');
        }
        setLoading(false);
      }
    } catch (err: any) {
      if (isMounted.current) {
        setError(err.message || 'Failed to fetch item');
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <div className="loading-container">Loading item...</div>;
  }

  if (error) {
    return (
      <div className="view-single-item-container">
        <div className="error-message">{error}</div>
        <Link to="/items" className="btn btn-secondary">Back to Items</Link>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="view-single-item-container">
        <div className="no-item">Item not found</div>
        <Link to="/items" className="btn btn-secondary">Back to Items</Link>
      </div>
    );
  }

  return (
    <div className="view-single-item-container">
      <div className="back-link">
        <Link to="/items">← Back to Items</Link>
      </div>

      <div className="item-detail">
        <div className="item-detail-header">
          <div>
            <h1>{item.title}</h1>
            {item.category && (
              <span className="category-badge-large">{item.category}</span>
            )}
          </div>
        </div>

        <div className="item-detail-content">
          <div className="detail-section">
            <h3>Description</h3>
            <p>{item.description}</p>
          </div>

          <div className="detail-info">
            <div className="info-item">
              <label>Price</label>
              <p className="price-tag">${item.price.toFixed(2)}</p>
            </div>

            {item.category && (
              <div className="info-item">
                <label>Category</label>
                <p>{item.category}</p>
              </div>
            )}

            {item.createdAt && (
              <div className="info-item">
                <label>Created</label>
                <p>
                  {new Date(item.createdAt.toDate?.() || item.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="item-detail-actions">
          <Link to={`/items/${id}/edit`} className="btn btn-primary">
            Edit Item
          </Link>
          <Link to="/items" className="btn btn-secondary">
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
}
