import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
      <div style={{ background: 'rgba(20, 30, 54, 0.7)', padding: '2.5rem', borderRadius: '20px', width: '100%', maxWidth: '400px', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '2rem' }}>Welcome Back</h2>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="email" placeholder="Email" required
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '12px', borderRadius: '10px', border: '1px solid #444', background: '#1a1d2e', color: 'white' }}
          />
          <input 
            type="password" placeholder="Password" required
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '12px', borderRadius: '10px', border: '1px solid #444', background: '#1a1d2e', color: 'white' }}
          />
          <button type="submit" style={{ padding: '12px', borderRadius: '10px', border: 'none', background: '#00f2fe', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }}>
            Login
          </button>
        </form>
        
        <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '1.5rem' }}>
          Don't have an account? <Link to="/register" style={{ color: '#00f2fe' }}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;