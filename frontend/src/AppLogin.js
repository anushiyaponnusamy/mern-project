// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; 
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState(false);
  const [token, setToken] = useState('');
const navigate=useNavigate();
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3001/user/signup', { email, userName, password });
      if (response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', response.data.userName);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('userId', response.data._id);
      }
      handleLogin();
    } catch (error) {
      console.error('Signup error:', error.response.data.error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/user/login', { email, password });
      const { token } = response.data;
      setToken(token);
      if(response.data==='Invalid credentials'){
        navigate('/login')
      }
      if (response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', response.data.userName);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('userId', response.data._id);
        
        navigate('/create')
      }
    } catch (error) {
      console.error('Login error:', error.response.data.error);
      setToken('');
    }
  };

  const handleType = () => setType(!type);

  return (
    <div className="container">
      <h1>Signup and Login</h1>
      <div className="button-container">
        <button className={type ? 'inactive' : 'active'} onClick={() => handleType()}>
          Signup
        </button>
        <button className={type ? 'active' : 'inactive'} onClick={handleType}>
          Login
        </button>
      </div>
      {!type && (
        <div className="form-container">
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" placeholder="UserName" value={userName} onChange={(e) => setUserName(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleSignup}>Signup</button>
        </div>
      )}
      {type && (
        <div className="form-container">
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
