import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
    
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          <Route
            path="/main"
            element={<Main onLogout={handleLogout} isLoggedIn={isLoggedIn} />}
          />
        </Routes>
    
      {location.pathname === '/' && !isLoggedIn && (
        <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
      )}
      {location.pathname === '/signup' && !isLoggedIn && (
        <p>Have an account? <Link to="/">login here</Link></p>
      )}
    </div>
  );
}

export default App;
