import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateItem from './pages/CreateItem';
import ViewAllItems from './pages/ViewAllItems';
import ViewSingleItem from './pages/ViewSingleItem';
import EditItem from './pages/EditItem';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import DeleteAccount from './pages/DeleteAccount';
import './App.css';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div className="loading-container"><p>Loading...</p></div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      // Track auth state for future use
    });

    return () => unsubscribe();
  }, []);

  // Hide Navbar on auth pages
  const isAuthPage = window.location.pathname === '/signup' || 
                     window.location.pathname === '/login';

  return (
    <Router>
      {!isAuthPage && <Navbar />}
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />

          {/* Protected CRUD Routes */}
          <Route 
            path="/create" 
            element={
              <ProtectedRoute>
                <CreateItem />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/items" 
            element={
              <ProtectedRoute>
                <ViewAllItems />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/items/:id" 
            element={
              <ProtectedRoute>
                <ViewSingleItem />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/items/:id/edit" 
            element={
              <ProtectedRoute>
                <EditItem />
              </ProtectedRoute>
            } 
          />

          {/* Dashboard Routes */}
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/user-dashboard" 
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/delete-account" 
            element={
              <ProtectedRoute>
                <DeleteAccount />
              </ProtectedRoute>
            } 
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
