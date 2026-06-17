import React, { useState, useEffect } from 'react';
import { useCartWishlist } from '../context/CartWishlistContext';

const ProductCatalog = ({ initialProducts = [] }) => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  
  const { addToCart, toggleWishlist, isInWishlist } = useCartWishlist();

  // Watch for changes in inherited pipeline properties
  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      setProducts(initialProducts);
    }
  }, [initialProducts]);

  // 1. Filter processing logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 2. Sorting processing logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    if (sortBy === 'Top Rated') return b.rating - a.rating;
    return 0;
  });

  const categories = ['All', ...new Set(products.map((p) => p.category).filter(Boolean))];

  return (
    <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Search and Filters Strip */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem', background: '#111827', padding: '1.25rem', borderRadius: '12px', border: '1px solid #1f2937' }}>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search items by name or tags..." 
          style={{ flex: '2', minWidth: '250px', padding: '0.75rem 1rem', borderRadius: '8px', background: '#1f2937', border: '1px solid #374151', color: '#fff', fontSize: '1rem', outline: 'none' }}
        />
        
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ flex: '1', minWidth: '150px', padding: '0.75rem', borderRadius: '8px', background: '#1f2937', border: '1px solid #374151', color: '#fff', fontSize: '1rem', cursor: 'pointer' }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ flex: '1', minWidth: '150px', padding: '0.75rem', borderRadius: '8px', background: '#1f2937', border: '1px solid #374151', color: '#fff', fontSize: '1rem', cursor: 'pointer' }}
        >
          <option value="Featured">Sort By: Featured</option>
          <option value="Price: Low to High">Price: Low to High</option>
          <option value="Price: High to Low">Price: High to Low</option>
          <option value="Top Rated">Top Rated</option>
        </select>
      </div>

      {/* Grid Layout Canvas */}
      {sortedProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af', background: '#111827', borderRadius: '12px', border: '1px solid #1f2937' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#fff' }}>No Matching Products Found</h3>
          <p style={{ margin: 0 }}>Try clearing your filters to view the full collection.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {sortedProducts.map((product) => {
            const isSaved = isInWishlist(product._id);
            return (
              <div key={product._id} style={{ background: '#111827', borderRadius: '14px', padding: '1.5rem', border: '1px solid #1f2937', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ textTransform: 'uppercase', color: '#06b6d4', fontSize: '0.75rem', letterSpacing: '1.5px', fontWeight: '800', background: 'rgba(6,182,212,0.1)', padding: '4px 10px', borderRadius: '20px' }}>
                    {product.category || "General"}
                  </span>
                  <h3 style={{ color: '#fff', margin: '1.25rem 0 0.5rem 0', fontSize: '1.3rem', fontWeight: '600' }}>{product.name}</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: '0 0 1rem 0', height: '40px', overflow: 'hidden' }}>
                    {product.description}
                  </p>
                  <p style={{ color: '#f59e0b', fontSize: '0.95rem', margin: '0 0 1rem 0' }}>★ {product.rating || "4.5"}</p>
                  <h2 style={{ color: '#fff', margin: '0 0 1.5rem 0', fontSize: '1.85rem', fontWeight: '700' }}>${product.price}</h2>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button 
                    onClick={() => addToCart(product)}
                    style={{ flex: '2', background: '#10b981', color: '#fff', border: 'none', padding: '0.8rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => toggleWishlist(product)}
                    style={{ flex: '1', background: isSaved ? '#ef4444' : '#374151', color: '#fff', border: 'none', padding: '0.8rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    {isSaved ? '❤️' : '🤍'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;