import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './EditItem.css';

interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
}

export default function EditItem() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isMounted = useRef(true);
  const [formData, setFormData] = useState<Item>({
    id: '',
    title: '',
    description: '',
    price: 0,
    category: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
          const data = docSnap.data();
          setFormData({
            id: docSnap.id,
            title: data.title,
            description: data.description,
            price: data.price,
            category: data.category || ''
          });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    if (!formData.title || !formData.description || formData.price <= 0) {
      setError('Please fill in all required fields with valid values');
      setSubmitting(false);
      return;
    }

    try {
      await updateDoc(doc(db, 'items', formData.id), {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        updatedAt: new Date()
      });
      
      if (isMounted.current) {
        setSuccess('Item updated successfully!');
        setTimeout(() => {
          navigate(`/items/${formData.id}`);
        }, 400);
      }
    } catch (err: any) {
      if (isMounted.current) {
        setError(err.message || 'Failed to update item');
        setSubmitting(false);
      }
    }
  };

  if (loading) {
    return <div className="loading-container">Loading item...</div>;
  }

  if (error && !formData.title) {
    return (
      <div className="edit-item-container">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate('/items')} className="btn btn-secondary">
          Back to Items
        </button>
      </div>
    );
  }

  return (
    <div className="edit-item-container">
      <div className="edit-item-form-wrapper">
        <h1>Edit Item</h1>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit} className="edit-item-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter item title"
              required
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter item description"
              rows={4}
              required
              disabled={submitting}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                step="0.01"
                required
                disabled={submitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={submitting}
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Home">Home</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-success" disabled={submitting}>
              {submitting ? 'Updating...' : 'Update Item'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(`/items/${formData.id}`)}
              disabled={submitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
