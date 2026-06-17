import React from 'react';
import { useCartWishlist } from '../context/CartWishlistContext';

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useCartWishlist();

  const handleMoveToCart = (product) => {
    addToCart(product);
    toggleWishlist(product);
  };

  return (
    <div style={{ padding: '2.5rem 1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      
      <h1 style={{
        textAlign: 'center',
        marginBottom: '3rem',
        fontSize: '2.5rem',
        fontWeight: '900',
        background: 'linear-gradient(90deg, #00f2fe 0%, #ec4899 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-0.02em'
      }}>
        My Saved Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '5rem 2rem',
          background: 'rgba(25, 30, 56, 0.45)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <h3 style={{ color: '#f1f5f9', fontSize: '1.3rem', margin: '0 0 0.5rem 0' }}>Your collection panel is completely clear.</h3>
          <p style={{ color: '#94a3b8', margin: 0 }}>Explore the product catalog grid workspace and save items to pin them here.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {wishlist.map((item) => (
            <div 
              key={item._id} 
              style={{ 
                background: 'rgba(22, 28, 54, 0.6)', 
                backdropFilter: 'blur(20px)',
                borderRadius: '20px', 
                padding: '1.75rem', 
                border: '1px solid rgba(255, 255, 255, 0.08)', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between', 
                textAlign: 'center',
                boxShadow: '0 12px 30px rgba(0,0,0,0.3)'
              }}
            >
              <div>
                <h3 style={{ color: '#ffffff', margin: '0 0 0.5rem 0', fontSize: '1.3rem', fontWeight: '700' }}>{item.name}</h3>
                <h2 style={{ color: '#f43f5e', margin: '0 0 1.5rem 0', fontSize: '1.75rem', fontWeight: '900' }}>${item.price}</h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <button 
                  onClick={() => handleMoveToCart(item)}
                  style={{ background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)', color: '#ffffff', border: 'none', padding: '0.8rem', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 15px rgba(236, 72, 153, 0.3)' }}
                >
                  Move to Cart Basket
                </button>
                <button 
                  onClick={() => toggleWishlist(item)}
                  style={{ background: 'transparent', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.15)', padding: '0.55rem', borderRadius: '12px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', transition: 'all 0.2s' }}
                >
                  Remove Pin
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;