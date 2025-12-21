import { memo } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = memo(function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Item Manager</h1>
        <p>Manage your items efficiently with our CRUD application.</p>
        
        <div className="features">
          <div className="feature-card">
            <h3>Create Items</h3>
            <p>Add new items to your collection with ease.</p>
            <Link to="/create" className="btn btn-primary">Create New Item</Link>
          </div>
          
          <div className="feature-card">
            <h3>View All Items</h3>
            <p>Browse all items in your collection.</p>
            <Link to="/items" className="btn btn-primary">View Items</Link>
          </div>
          
          <div className="feature-card">
            <h3>Edit & Delete</h3>
            <p>Update or remove items from your collection.</p>
            <Link to="/items" className="btn btn-primary">Manage Items</Link>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Home;
