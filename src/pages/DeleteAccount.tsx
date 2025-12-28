import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { deleteUser } from 'firebase/auth';
import { doc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';
import './DeleteAccount.css';

function DeleteAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    if (!confirmDelete) {
      setError('Please confirm deletion');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const user = auth.currentUser;
      if (!user) {
        setError('No user logged in');
        return;
      }

      // Delete all items created by this user
      const itemsQuery = query(
        collection(db, 'items'),
        where('userId', '==', user.uid)
      );
      const itemsSnapshot = await getDocs(itemsQuery);
      
      for (const itemDoc of itemsSnapshot.docs) {
        await deleteDoc(itemDoc.ref);
      }

      // Delete user document from Firestore
      await deleteDoc(doc(db, 'users', user.uid));

      // Delete user from Firebase Authentication
      await deleteUser(user);

      setTimeout(() => {
        navigate('/signup');
      }, 500);
    } catch (err: any) {
      console.error('Delete error:', err);
      setError(err.message || 'Failed to delete account');
      setLoading(false);
    }
  };

  return (
    <div className="delete-account-container">
      <div className="delete-account-card">
        <h2>Delete Account</h2>
        <p className="warning">⚠️ This action cannot be undone!</p>
        
        <div className="warning-box">
          <p><strong>Deleting your account will:</strong></p>
          <ul>
            <li>Remove all your personal data from our servers</li>
            <li>Delete all your items and records</li>
            <li>Permanently remove your account access</li>
          </ul>
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="confirm"
            checked={confirmDelete}
            onChange={(e) => setConfirmDelete(e.target.checked)}
          />
          <label htmlFor="confirm">
            I understand and want to delete my account permanently
          </label>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button
          onClick={handleDeleteAccount}
          disabled={!confirmDelete || loading}
          className="btn-delete"
        >
          {loading ? 'Deleting...' : 'Delete My Account'}
        </button>

        <button
          onClick={() => navigate(-1)}
          disabled={loading}
          className="btn-cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteAccount;
