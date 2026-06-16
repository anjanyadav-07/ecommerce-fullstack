import React, { useState } from 'react';
import { useCartWishlist } from '../context/CartWishlistContext';

// Dummy categories for example. Replace with yours or backend fetched list.
const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Books', 'Home Appliances'];

export default function ProductCatalog({ products }) {
  const { addToCart, addToWishlist } = useCartWishlist();
  
  // States for Search, Category and Sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  // Logic pipeline: Filter -> Sort
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low-high') return a.price - b.price;
      if (sortBy === 'price-high-low') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating; // Assumes rating field exists
      return 0;
    });

  return (
    <div style={{ padding: '20px' }}>
      {/* Search & Filter Bar Controls */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', minWidth: '250px' }}
        />

        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ padding: '8px' }}>
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '8px' }}>
          <option value="default">Sort By: Featured</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="rating">Customer Rating</option>
        </select>
      </div>

      {/* Grid Display */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
        {filteredProducts.map((product) => (
          <div key={product._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <p style={{ fontWeight: 'bold' }}>${product.price}</p>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={() => addToCart(product)} style={{ cursor: 'pointer', padding: '5px 10px' }}>
                Add to Cart
              </button>
              <button onClick={() => addToWishlist(product)} style={{ cursor: 'pointer', padding: '5px 10px', background: '#e0e0e0' }}>
                ❤️ Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}