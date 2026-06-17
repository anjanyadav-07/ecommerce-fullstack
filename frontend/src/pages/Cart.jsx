import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartWishlist } from '../context/CartWishlistContext';

const Cart = () => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity, toggleWishlist, isInWishlist } = useCartWishlist();
  const navigate = useNavigate();

  const handleSaveForLater = (item) => {
    if (!isInWishlist(item._id)) {
      toggleWishlist(item);
    }
    removeFromCart(item._id);
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 0)), 0).toFixed(2);
  };

  return (
    <div style={{ padding: '2.5rem 1.5rem', maxWidth: '850px', margin: '0 auto' }}>
      
      {/* Fixed Header with padding for clipping prevention */}
      <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '15px 0' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '900',
          lineHeight: '1.4',
          background: 'linear-gradient(90deg, #d946ef 0%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em',
          display: 'inline-block',
          margin: '0'
        }}>
          Shopping Cart Terminal
        </h1>
      </div>

      {cart.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4.5rem 2rem',
          background: 'rgba(25, 30, 56, 0.45)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)'
        }}>
          <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '2rem' }}>Your workspace shopping basket is empty.</p>
          <button 
            onClick={() => navigate('/')} 
            style={{ 
              background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)', 
              color: '#ffffff', 
              border: 'none', 
              padding: '0.9rem 2.25rem', 
              borderRadius: '12px', 
              fontWeight: '800', 
              cursor: 'pointer', 
              boxShadow: '0 8px 24px -4px rgba(0, 242, 254, 0.4)' 
            }}
          >
            Go Back To Products Catalog
          </button>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {cart.map((item) => (
              <div key={item._id} style={{ 
                  background: 'rgba(22, 28, 54, 0.65)', 
                  backdropFilter: 'blur(20px)',
                  borderRadius: '18px', 
                  padding: '1.5rem 1.75rem', 
                  border: '1px solid rgba(255, 255, 255, 0.08)', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  flexWrap: 'wrap', 
                  gap: '1.5rem',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.25)'
                }}>
                <div>
                  <h3 style={{ margin: '0 0 0.4rem 0', color: '#ffffff', fontSize: '1.3rem', fontWeight: '700' }}>{item.name}</h3>
                  <p style={{ margin: 0, color: '#00f2fe', fontWeight: '800', fontSize: '1.15rem' }}>${item.price}</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(9, 13, 26, 0.7)', padding: '6px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <button onClick={() => decrementQuantity(item._id)} style={{ background: '#2d3748', color: '#ffffff', border: 'none', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', fontWeight: '900', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                    <span style={{ minWidth: '38px', textAlign: 'center', fontWeight: '800', fontSize: '1.15rem', color: '#ffffff' }}>{item.quantity}</span>
                    <button onClick={() => incrementQuantity(item._id)} style={{ background: '#2d3748', color: '#ffffff', border: 'none', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', fontWeight: '900', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <button onClick={() => handleSaveForLater(item)} style={{ background: 'rgba(234, 179, 8, 0.12)', color: '#facc15', border: '1px solid rgba(234, 179, 8, 0.35)', padding: '0.65rem 1.25rem', borderRadius: '12px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '700' }}>Save for Later ❤️</button>
                    <button onClick={() => removeFromCart(item._id)} style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.35)', padding: '0.65rem 1.25rem', borderRadius: '12px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '700' }}>Remove Item 🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'linear-gradient(135deg, rgba(26, 32, 62, 0.8) 0%, rgba(124, 58, 237, 0.15) 100%)', borderRadius: '24px', padding: '2.25rem', border: '1px solid rgba(255, 255, 255, 0.12)', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1.75rem', fontWeight: '800', fontSize: '1.85rem', color: '#ffffff' }}>
              Estimated Summary Subtotal: <span style={{ color: '#10b981', marginLeft: '6px' }}>${calculateSubtotal()}</span>
            </h2>
            <button 
              onClick={() => navigate('/checkout')} // Added navigation
              style={{ 
                background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 50%, #a855f7 100%)', 
                color: '#ffffff', border: 'none', padding: '1.1rem 3.5rem', borderRadius: '14px', fontWeight: '900', fontSize: '1.2rem', cursor: 'pointer', boxShadow: '0 8px 24px -4px rgba(99, 102, 241, 0.5)' 
              }}
            >
              Proceed to Place Order →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;