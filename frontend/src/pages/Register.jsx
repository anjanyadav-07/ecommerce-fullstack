import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 1. Add role state
  const [role, setRole] = useState('buyer'); 
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // 2. Pass the role to the register function
      await register(name, email, password, role);
      alert("Registration successful! Please login with your credentials.");
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
      <div style={{ background: 'rgba(20, 30, 54, 0.7)', padding: '2.5rem', borderRadius: '20px', width: '100%', maxWidth: '400px', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '2rem' }}>Create Account</h2>
        
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" placeholder="Full Name" required onChange={(e) => setName(e.target.value)} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #444', background: '#1a1d2e', color: 'white' }} />
          <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #444', background: '#1a1d2e', color: 'white' }} />
          <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #444', background: '#1a1d2e', color: 'white' }} />
          
          {/* 3. Dropdown for Role */}
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            style={{ padding: '12px', borderRadius: '10px', border: '1px solid #444', background: '#1a1d2e', color: 'white', cursor: 'pointer' }}
          >
            <option value="buyer">Register as Buyer</option>
            <option value="seller">Register as Seller</option>
          </select>

          <button type="submit" style={{ padding: '12px', borderRadius: '10px', border: 'none', background: '#00f2fe', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }}>
            Register
          </button>
        </form>
        
        <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '1.5rem' }}>
          Already have an account? <Link to="/login" style={{ color: '#00f2fe' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;