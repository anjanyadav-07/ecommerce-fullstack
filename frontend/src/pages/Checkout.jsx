import React, { useState, useContext } from 'react';
import { useCartWishlist } from '../context/CartWishlistContext';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
    const { cart, updateQuantity } = useCartWishlist();
    const { user } = useContext(AuthContext) || {}; // Added fallback to prevent crash
    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState({ address: '', city: '', postalCode: '' });
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [loading, setLoading] = useState(false);

    const totalPrice = cart.reduce((acc, item) => acc + (Number(item.price || 0) * Number(item.quantity || 0)), 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Safety check if user is not logged in
        if (!user || !user.token) {
            alert('Please sign in to complete your purchase.');
            return navigate('/login');
        }

        try {
            setLoading(true);
            await axios.post('http://localhost:5000/api/orders', {
                orderItems: cart,
                shippingAddress,
                paymentMethod,
                totalPrice
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            alert('Order Placed Successfully!');
            cart.forEach(item => updateQuantity(item._id, -item.quantity));
            navigate('/');
        } catch (err) {
            alert('Checkout failed: ' + (err.response?.data?.message || 'Server error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '2.5rem', maxWidth: '600px', margin: '0 auto', color: '#fff' }}>
            <h2>Secure Checkout</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input placeholder="Street Address" required onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})} style={{ padding: '10px' }} />
                <input placeholder="City" required onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})} style={{ padding: '10px' }} />
                <button type="submit" disabled={loading} style={{ padding: '15px', background: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    {loading ? 'Processing...' : 'Place Order'}
                </button>
            </form>
        </div>
    );
}