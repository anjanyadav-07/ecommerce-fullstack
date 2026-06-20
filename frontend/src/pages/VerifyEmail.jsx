import React from 'react';

const VerifyEmail = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '80vh', 
      color: 'white',
      padding: '20px'
    }}>
      <h1 style={{ marginBottom: '1rem' }}>Verify Your Email</h1>
      <p style={{ color: '#94a3b8', fontSize: '1.2rem', textAlign: 'center' }}>
        Please check your email inbox to verify your account before logging in.
      </p>
    </div>
  );
};

export default VerifyEmail;