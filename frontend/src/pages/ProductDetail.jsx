import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCartWishlist } from '../context/CartWishlistContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCartWishlist();

  // Mock database - Ensure the _id matches what is in your Catalog.jsx
  const allProducts = [
    { _id: '1', name: 'Premium Wireless Headphones', price: 199, category: 'ELECTRONICS', description: 'Active adaptive noise cancellation.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e' },
    { _id: '2', name: 'Vintage Leather Jacket', price: 145, category: 'CLOTHING', description: 'Top-grain premium style.', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5' },
    { _id: '3', name: 'Mechanical Gaming Keyboard', price: 89, category: 'ELECTRONICS', description: 'Ultra-responsive tactile key switches.', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212' },
    { _id: '4', name: 'Ergonomic Office Chair', price: 249, category: 'FURNITURE', description: 'High-back lumbar configuration setup.', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1' },
    { _id: '5', name: 'Stainless Steel Water Bottle', price: 29, category: 'FITNESS', description: 'Vacuum insulated thermal core structure.', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8' },
    { _id: '6', name: 'Ultra-Wide Curved Monitor', price: 349, category: 'ELECTRONICS', description: 'Immersive panorama screen landscape.', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3a35' }
  ];

  const product = allProducts.find(p => p._id === id);

  if (!product) return <div style={{ padding: '40px', color: 'white', textAlign: 'center' }}>Product not found.</div>;

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', color: 'white' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', marginBottom: '20px' }}
      >
        ← Back
      </button>
      <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '20px', marginBottom: '20px' }} />
      <h1>{product.name}</h1>
      <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>{product.description}</p>
      <h2 style={{ fontSize: '2rem', margin: '20px 0' }}>${product.price}</h2>
      <button 
        onClick={() => addToCart(product)} 
        style={{ padding: '15px 30px', background: '#00f2fe', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;