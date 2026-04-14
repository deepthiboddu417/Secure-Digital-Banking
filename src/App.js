import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login'; // Changed from Auth to Login
import Register from './components/Register'; // Added Register
import Dashboard from './components/Dashboard';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/" />;
};


const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? <Navigate to="/dashboard" /> : children;
};

function App() {
  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh' }}>
      <Router>
        <Routes>
          {/* Login Page */}
          <Route path="/" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />

          {/* Register Page */}
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />

          {/* Protected Dashboard */}
          <Route path="/dashboard" element={
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
          } />

          {/* Catch-all: Redirect unknown URLs to Login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;