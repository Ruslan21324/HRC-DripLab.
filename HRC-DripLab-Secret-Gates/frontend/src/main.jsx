import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import App from './App'
import Admin from './pages/Admin'
import Orders from './pages/Orders'
import './styles.css'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/orders" element={<Orders/>} />
      <Route path="*" element={<div className="container"><h2>404</h2><Link to="/" className="btn">На головну</Link></div>} />
    </Routes>
  </BrowserRouter>
)