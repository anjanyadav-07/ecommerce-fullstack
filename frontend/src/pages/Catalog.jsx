import React from 'react';
import { useCartWishlist } from '../context/CartWishlistContext';

const Catalog = ({ products = [] }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCartWishlist();

  const catalogItems = products.length > 0 ? products : [
    { _id: '1', name: 'Premium Wireless Headphones', price: 199, category: 'ELECTRONICS', rating: 4.8, description: 'Active adaptive noise cancellation.' },
    { _id: '2', name: 'Vintage Leather Jacket', price: 145, category: 'CLOTHING', rating: 4.6, description: 'Top-grain premium style.' },
    { _id: '3', name: 'Mechanical Gaming Keyboard', price: 89, category: 'ELECTRONICS', rating: 4.7, description: 'Ultra-responsive tactile key switches.' },
    { _id: '4', name: 'Ergonomic Office Chair', price: 249, category: 'FURNITURE', rating: 4.5, description: 'High-back lumbar configuration setup.' },
    { _id: '5', name: 'Stainless Steel Water Bottle', price: 29, category: 'FITNESS', rating: 4.3, description: 'Vacuum insulated thermal core structure.' },
    { _id: '6', name: 'Ultra-Wide Curved Monitor', price: 349, category: 'ELECTRONICS', rating: 4.9, description: 'Immersive panorama screen landscape.' }
  ];

  return (
    <div style={{ padding: '2.5rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem', padding: '10px 0' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '900',
          lineHeight: '1.4',
          background: 'linear-gradient(90deg, #00f2fe 0%, #4facfe 40%, #00f2fe 70%, #f355da 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0',
          letterSpacing: '-0.02em',
          display: 'inline-block'
        }}>
          Explore Next-Gen Catalog Gear
        </h1>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
        gap: '2.25rem'
      }}>
        {catalogItems.map((product) => {
          const saved = isInWishlist(product._id);
          const isClothing = product.category === 'CLOTHING';
          const isFurniture = product.category === 'FURNITURE';
          const isFitness = product.category === 'FITNESS';
          
          let accentColor = '#00f2fe'; 
          let badgeBg = 'rgba(0, 242, 254, 0.12)';
          if (isClothing) { accentColor = '#f43f5e'; badgeBg = 'rgba(244, 63, 94, 0.12)'; }
          else if (isFurniture) { accentColor = '#a855f7'; badgeBg = 'rgba(168, 85, 247, 0.12)'; }
          else if (isFitness) { accentColor = '#10b981'; badgeBg = 'rgba(16, 185, 129, 0.12)'; }

          return (
            <div key={product._id} style={{
              background: 'rgba(20, 30, 54, 0.55)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '1.75rem',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div>
                <span style={{
                  fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.08em', padding: '5px 12px',
                  borderRadius: '30px', background: badgeBg, color: accentColor, display: 'inline-block',
                  marginBottom: '1.25rem', border: `1px solid ${accentColor}40`
                }}>
                  {product.category}
                </span>
                <h3 style={{ fontSize: '1.4rem', margin: '0 0 0.5rem 0', fontWeight: '700', color: '#ffffff', lineHeight: '1.3' }}>{product.name}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '0 0 1.25rem 0', minHeight: '38px', lineHeight: '1.5' }}>{product.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#ffb800', marginBottom: '1.75rem', fontSize: '0.95rem' }}>
                  <span style={{ fontSize: '1.1rem' }}>★</span> <strong style={{ color: '#f1f5f9' }}>{product.rating}</strong>
                </div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: '#ffffff', marginBottom: '1.5rem', display: 'flex', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '1.25rem', color: accentColor, marginRight: '2px' }}>$</span>{product.price}
                </div>
                <div style={{ display: 'flex', gap: '0.85rem' }}>
                  <button onClick={() => addToCart(product)} style={{
                    flex: 1, background: `linear-gradient(135deg, ${accentColor} 0%, #3b82f6 100%)`, color: '#ffffff',
                    border: 'none', padding: '0.85rem 1rem', borderRadius: '12px', fontWeight: '800', fontSize: '0.95rem', cursor: 'pointer'
                  }}>Add to Cart</button>
                  <button onClick={() => toggleWishlist(product)} style={{
                    background: saved ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    border: saved ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: saved ? '#fc8181' : '#cbd5e1', width: '50px', borderRadius: '12px', cursor: 'pointer'
                  }}>{saved ? '❤️' : '🤍'}</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Catalog;