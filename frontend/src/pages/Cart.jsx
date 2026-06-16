import React from 'react';
import { useCartWishlist } from '../context/CartWishlistContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const { cart, updateQuantity, saveForLater } = useCartWishlist();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return <div style={{ padding: '40px', textAlign: 'center' }}><h2>Your Cart is currently empty.</h2></div>;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Shopping Cart Overview</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {cart.map(item => (
                    <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #ddd', borderRadius: '6px' }}>
                        <div>
                            <h4>{item.name}</h4>
                            <p style={{ margin: '5px 0' }}>Price: ${item.price}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <button onClick={() => updateQuantity(item._id, -1)} style={{ padding: '2px 8px' }}>-</button>
                                <span><strong>{item.quantity}</strong></span>
                                <button onClick={() => updateQuantity(item._id, 1)} style={{ padding: '2px 8px' }}>+</button>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                            <button onClick={() => saveForLater(item._id)} style={{ padding: '5px 10px', background: '#ff9800', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                Save for Later ❤️
                            </button>
                            <button onClick={() => updateQuantity(item._id, -item.quantity)} style={{ padding: '5px 10px', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                Remove Item 🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '30px', textAlign: 'right', borderTop: '2px solid #ddd', paddingTop: '20px' }}>
                <h3>Estimated Summary Subtotal: ${totalPrice.toFixed(2)}</h3>
                <button onClick={() => navigate('/checkout')} style={{ 
                    padding: '12px 24px', background: '#007bff', color: 'white', border: 'none', fontSize: '16px', fontWeight: 'bold', borderRadius: '5px', cursor: 'pointer', marginTop: '10px'
                }}>
                    Proceed to Place Order ➔
                </button>
            </div>
        </div>
    );
}