import React, { useState, useContext } from 'react';
import { useCartWishlist } from '../context/CartWishlistContext'; // Ensure this matches your folder name
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
    // 1. We import 'clearCart' instead of 'updateQuantity'
    const { cart, clearCart } = useCartWishlist();
    const { user } = useContext(AuthContext) || {};
    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState({ address: '', city: '', postalCode: '' });
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [loading, setLoading] = useState(false);

    const totalPrice = cart.reduce((acc, item) => acc + (Number(item.price || 0) * Number(item.quantity || 0)), 0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user.token) {
            alert('Please sign in to complete your purchase.');
            return navigate('/login');
        }

        const orderData = {
            orderItems: cart,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            totalPrice: totalPrice
        };

        try {
            setLoading(true);
            
            await axios.post('http://localhost:5000/api/orders', orderData, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            alert('Order Placed Successfully!');
            
            // 2. Use clearCart() to wipe the cart state instantly
            clearCart(); 
            
            navigate('/');
        } catch (err) {
            console.error("Full error response from server:", err.response);
            const errorMessage = err.response?.data?.message || err.message || 'Server error';
            alert('Checkout failed: ' + errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '2.5rem', maxWidth: '600px', margin: '0 auto', color: '#fff' }}>
            <h2>Secure Checkout</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input 
                    placeholder="Street Address" 
                    required 
                    onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})} 
                    style={{ padding: '10px', color: '#000' }} 
                />
                <input 
                    placeholder="City" 
                    required 
                    onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})} 
                    style={{ padding: '10px', color: '#000' }} 
                />
                <button type="submit" disabled={loading} style={{ padding: '15px', background: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    {loading ? 'Processing...' : 'Place Order'}
                </button>
            </form>
        </div>
    );
}