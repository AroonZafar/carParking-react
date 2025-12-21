import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateItem from './pages/CreateItem';
import ViewAllItems from './pages/ViewAllItems';
import ViewSingleItem from './pages/ViewSingleItem';
import EditItem from './pages/EditItem';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateItem />} />
          <Route path="/items" element={<ViewAllItems />} />
          <Route path="/items/:id" element={<ViewSingleItem />} />
          <Route path="/items/:id/edit" element={<EditItem />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
