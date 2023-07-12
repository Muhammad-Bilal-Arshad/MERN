import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Main = ({ onLogout, isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/user/logout');
      onLogout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div>
      <h2>Welcome, logged-in user!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Main;
