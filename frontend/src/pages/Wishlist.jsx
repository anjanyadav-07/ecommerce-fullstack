import React from 'react';
import { useCartWishlist } from '../context/CartWishlistContext';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, moveToCart } = useCartWishlist();

  if (wishlist.length === 0) {
    return <div style={{ padding: '20px' }}><h2>Your Wishlist is empty.</h2></div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Wishlist</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {wishlist.map((item) => (
          <div key={item._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <h4>{item.name}</h4>
            <p>${item.price}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              <button onClick={() => moveToCart(item)} style={{ background: 'orange', color: 'white', border: 'none', padding: '5px', cursor: 'pointer' }}>
                Move to Cart
              </button>
              <button onClick={() => removeFromWishlist(item._id)} style={{ color: 'gray', background: 'none', border: '1px solid gray', padding: '5px', cursor: 'pointer' }}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}