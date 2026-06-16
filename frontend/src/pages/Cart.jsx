import React from 'react';
import { useCartWishlist } from '../context/CartWishlistContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, addToWishlist } = useCartWishlist();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSaveForLater = (item) => {
    addToWishlist(item);
    removeFromCart(item._id);
  };

  if (cart.length === 0) {
    return <div style={{ padding: '20px' }}><h2>Your Cart is empty.</h2></div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Shopping Cart</h2>
      <div>
        {cart.map((item) => (
          <div key={item._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '10px 0' }}>
            <div>
              <h4>{item.name}</h4>
              <p>${item.price} x {item.quantity}</p>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button onClick={() => updateQuantity(item._id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item._id, 1)}>+</button>
              
              <button onClick={() => handleSaveForLater(item)} style={{ background: '#f0f0f0' }}>Save for Later</button>
              <button onClick={() => removeFromCart(item._id)} style={{ color: 'red' }}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button onClick={() => navigate('/checkout')} style={{ padding: '10px 20px', background: 'green', color: '#fff', fontSize: '16px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Place Order
        </button>
      </div>
    </div>
  );
}