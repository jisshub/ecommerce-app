import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Cart from './components/Cart/Cart';
import { CartContext, CartItem } from './contexts/cartContext';
import './App.css';

function App() {
  const [carts, setCarts] = useState<CartItem[]>([]);
  
  return (
    <Router>
      <CartContext.Provider value={{ carts, setCarts }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartContext.Provider>
    </Router>
  );
}

export default App;
