import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const SellerRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Checks if the user is logged in AND has the correct role
  if (user && (user.role === 'seller' || user.role === 'admin')) {
    return children;
  }

  // Redirect to login if they aren't authorized
  return <Navigate to="/login" />;
};

export default SellerRoute;