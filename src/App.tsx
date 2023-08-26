import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import ProductDetail from './components/ProductDetail/ProductDetail'; // Import the ProductDetail component
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {/* You can add more routes as needed */}
      </Routes>
    </Router>
  );
}


export default App;
