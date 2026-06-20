import React, { useState } from 'react';
import { useCartWishlist } from '../context/CartWishlistContext';
import { useNavigate } from 'react-router-dom'; // 1. Import this

const Catalog = ({ products = [] }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCartWishlist();
  const navigate = useNavigate(); // 2. Initialize this hook

  // State for Search and Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const catalogItems = products.length > 0 ? products : [
    { _id: '1', name: 'Premium Wireless Headphones', price: 199, category: 'ELECTRONICS', rating: 4.8, description: 'Active adaptive noise cancellation.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e' },
    { _id: '2', name: 'Vintage Leather Jacket', price: 145, category: 'CLOTHING', rating: 4.6, description: 'Top-grain premium style.', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5' },
    { _id: '3', name: 'Mechanical Gaming Keyboard', price: 89, category: 'ELECTRONICS', rating: 4.7, description: 'Ultra-responsive tactile key switches.', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212' },
    { _id: '4', name: 'Ergonomic Office Chair', price: 249, category: 'FURNITURE', rating: 4.5, description: 'High-back lumbar configuration setup.', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1' },
    { _id: '5', name: 'Stainless Steel Water Bottle', price: 29, category: 'FITNESS', rating: 4.3, description: 'Vacuum insulated thermal core structure.', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8' },
    { _id: '6', name: 'Ultra-Wide Curved Monitor', price: 349, category: 'ELECTRONICS', rating: 4.9, description: 'Immersive panorama screen landscape.', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3a35' }
  ];

  const filteredItems = catalogItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: '2.5rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', background: 'linear-gradient(90deg, #00f2fe 0%, #4facfe 40%, #00f2fe 70%, #f355da 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0' }}>
          Explore Next-Gen Catalog Gear
        </h1>
        
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '10px 20px', borderRadius: '25px', border: '1px solid #444', background: '#1a1d2e', color: 'white' }}
          />
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ padding: '10px 20px', borderRadius: '25px', border: '1px solid #444', background: '#1a1d2e', color: 'white' }}
          >
            <option value="ALL">All Categories</option>
            <option value="ELECTRONICS">Electronics</option>
            <option value="CLOTHING">Clothing</option>
            <option value="FURNITURE">Furniture</option>
            <option value="FITNESS">Fitness</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '2.25rem' }}>
        {filteredItems.map((product) => {
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
            <div key={product._id} style={{ background: 'rgba(20, 30, 54, 0.55)', backdropFilter: 'blur(20px)', borderRadius: '20px', padding: '1.75rem', border: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {/* Image Section */}
              <div style={{ width: '100%', height: '200px', marginBottom: '1.5rem', borderRadius: '12px', overflow: 'hidden' }}>
                <img src={product.image || 'https://via.placeholder.com/400x200?text=No+Image'} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              
              {/* Content */}
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', padding: '5px 12px', borderRadius: '30px', background: badgeBg, color: accentColor, display: 'inline-block', marginBottom: '1.25rem' }}>{product.category}</span>
                <h3 style={{ fontSize: '1.4rem', margin: '0 0 0.5rem 0', color: '#ffffff' }}>{product.name}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '0 0 1.25rem 0' }}>{product.description}</p>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '0.85rem' }}>
                <button onClick={() => addToCart(product)} style={{ flex: 1, background: `linear-gradient(135deg, ${accentColor} 0%, #3b82f6 100%)`, color: '#ffffff', border: 'none', padding: '0.85rem', borderRadius: '12px', cursor: 'pointer' }}>Add to Cart</button>
                <button onClick={() => navigate(`/product/${product._id}`)} style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff', padding: '0.85rem', borderRadius: '12px', cursor: 'pointer' }}>View Details</button>
                <button onClick={() => toggleWishlist(product)} style={{ background: saved ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.04)', border: saved ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)', color: saved ? '#fc8181' : '#cbd5e1', width: '50px', borderRadius: '12px', cursor: 'pointer' }}>{saved ? '❤️' : '🤍'}</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Catalog;