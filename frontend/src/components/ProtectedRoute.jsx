import React from 'react';
import { Navigate } from 'react-router-dom';
// Import your custom auth context here
// import { useAuth } from '../context/AuthContext'; 

export default function ProtectedRoute({ children, allowedRoles }) {
  // Hardcoded for testing fallback — wire this directly into your real AuthContext
  const user = JSON.parse(localStorage.getItem('user')); 

  if (!user) {
    // Not logged in -> kick out to login page
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Logged in but doesn't have the permission tier -> redirect to safe homepage
    return <Navigate to="/" replace />;
  }

  return children;
}