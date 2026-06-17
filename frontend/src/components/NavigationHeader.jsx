import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useCartWishlist } from '../context/CartWishlistContext';
import AuthContext from '../context/AuthContext';

export default function NavigationHeader() {
  const { cart, wishlist } = useCartWishlist();
  const { user, logout } = useContext(AuthContext);

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const wishlistCount = wishlist.length;

  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '1rem 2rem', background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'sticky', top: 0, zIndex: 1000
    }}>
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '900', textDecoration: 'none', background: 'linear-gradient(90deg, #00f2fe, #4facfe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        E-Shop
      </Link>

      <div style={{ display: 'flex', gap: '2rem' }}>
        <Link to="/" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Catalog</Link>
        <Link to="/wishlist" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Wishlist ({wishlistCount})</Link>
        <Link to="/cart" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Cart ({cartCount})</Link>
      </div>

      <div>
        {user ? (
          <button onClick={logout} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0.4rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>
            Logout
          </button>
        ) : (
          <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
        )}
      </div>
    </nav>
  );
}