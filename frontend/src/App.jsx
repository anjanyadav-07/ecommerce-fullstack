import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartWishlistProvider, useCartWishlist } from './context/CartWishlistContext';
import { AuthProvider, default as AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import VerifyEmail from './pages/VerifyEmail'; 
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
// 1. Import your new components
import SellerRoute from './components/SellerRoute';
import SellerDashboard from './pages/SellerDashboard';
import MyOrders from './components/MyOrders';

const NavigationHeader = () => {
  const { cart, wishlist } = useCartWishlist();
  const auth = useContext(AuthContext); 
  const user = auth ? auth.user : null;
  const logout = auth ? auth.logout : () => {};

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const wishlistCount = wishlist.length;

  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '1rem 2rem', background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'sticky', top: 0, zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.5rem' }}>🏪</span>
        <span style={{ fontSize: '1.5rem', fontWeight: '900', background: 'linear-gradient(90deg, #00f2fe, #4facfe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          E-Shop
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link to="/" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '600' }}>Catalog</Link>
        <Link to="/wishlist" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '600' }}>💖 Wishlist ({wishlistCount})</Link>
        <Link to="/cart" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '600' }}>🛒 Cart ({cartCount})</Link>
        
        {/* 2. Optional: Add a link in header for quick access if user is a seller */}
        {user?.role === 'seller' && <Link to="/seller/dashboard" style={{ color: '#f59e0b', textDecoration: 'none', fontWeight: '600' }}>Seller Portal</Link>}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {user ? (
          <>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
              {user.name} <span style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem' }}>{user.role}</span>
            </div>
            <button onClick={logout} style={{ background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', color: '#fff', border: 'none', padding: '0.45rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{ color: '#fff', fontWeight: 'bold' }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartWishlistProvider>
          <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #090d16 0%, #11102b 40%, #20092c 75%, #071524 100%)',
            backgroundAttachment: 'fixed',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#ffffff',
            overflowX: 'hidden'
          }}>
            <NavigationHeader />
            <Routes>
              <Route path="/" element={<Catalog />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
              
              <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              {/* 3. Added the new Seller Route */}
              <Route path="/seller/dashboard" element={<SellerRoute><SellerDashboard /></SellerRoute>} />
            </Routes>
          </div>
        </CartWishlistProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;