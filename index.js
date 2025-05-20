import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from 'react-router-dom';
import './App.css';

const API_BASE = 'https://fakestoreapi.com/';
const AUTH_API = 'https://reqres.in/api/login';

const CartContext = createContext();

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <CartContext.Provider value={useCart()}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header user={user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login onLogin={setUser} />} />
          </Routes>
        </div>
      </Router>
    </CartContext.Provider>
  );
};