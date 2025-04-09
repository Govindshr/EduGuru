// src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { config } from '../admin/services/config';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';


const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(config.Login, { email, password });
      if (res.data.code === 200 && res.data.token) {
        localStorage.setItem('adminToken', res.data.token);
        navigate('/admin/main-banner');
      } else {
        setErrorMsg(res.data.message || 'Login failed');
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Login error');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Admin Login</h2>
        {errorMsg && <div className="login-error">{errorMsg}</div>}
        <form onSubmit={handleLogin} className="login-form">
          <label className="login-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />

<label className="login-label">Password</label>
<div className="login-password-wrapper">
  <input
    type={showPassword ? 'text' : 'password'}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="login-input"
    required
  />
  <button
    type="button"
    className="login-toggle-password"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
  </button>
</div>


          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;