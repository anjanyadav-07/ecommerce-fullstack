import React, { useState, useContext } from 'react';
import { useCartWishlist } from '../context/CartWishlistContext';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
    const { cart, updateQuantity } = useCartWishlist();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState({ address: '', city: '', postalCode: '' });
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [upiId, setUpiId] = useState('');
    const [loading, setLoading] = useState(false);

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please sign in to finish your transaction.');
            return navigate('/login');
        }

        if (paymentMethod === 'UPI' && !upiId.includes('@')) {
            alert('Please enter a valid mock UPI ID format (e.g., user@okhdfcbank)');
            return;
        }

        const orderItems = cart.map(item => ({
            name: item.name,
            qty: item.quantity,
            price: item.price,
            product: item._id
        }));

        try {
            setLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            };

            await axios.post('http://localhost:5000/api/orders', {
                orderItems,
                shippingAddress,
                paymentMethod,
                totalPrice
            }, config);

            alert(`Order Placed Successfully via ${paymentMethod}!`);
            
            // Empty the client-side cart array on local state
            cart.forEach(item => updateQuantity(item._id, -item.quantity));
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.message || 'Something went wrong during checkout.');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Your checkout basket is empty!</h2>
                <button onClick={() => navigate('/')} style={{ padding: '10px 20px', cursor: 'pointer' }}>Return to Catalog</button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '500px', margin: '40px auto', padding: '25px', border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: 'var(--bg)' }}>
            <h2 style={{ marginBottom: '20px', color: 'var(--text-h)' }}>Secure Checkout Portal</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <h3 style={{ margin: '0', fontSize: '16px' }}>1. Shipping Details</h3>
                <input type="text" placeholder="Street Address" required value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                
                <input type="text" placeholder="City" required value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                
                <input type="text" placeholder="Postal / Zip Code" required value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />

                <hr style={{ border: '0', borderTop: '1px solid var(--border)', margin: '10px 0' }} />

                <h3 style={{ margin: '0', fontSize: '16px' }}>2. Payment Engine (Demo Integration)</h3>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '5px', textAlign: 'left' }}>
                    <strong>Select Gateway:</strong>
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} style={{ padding: '10px', borderRadius: '4px' }}>
                        <option value="COD">Cash On Delivery (COD)</option>
                        <option value="UPI">Unified Payments Interface (UPI Demo)</option>
                    </select>
                </label>

                {paymentMethod === 'UPI' && (
                    <div style={{ padding: '10px', background: '#f0f4f8', borderRadius: '5px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Enter Virtual Payment Address (VPA):</label>
                        <input type="text" placeholder="username@bankhandle" required value={upiId} onChange={(e) => setUpiId(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #999' }} />
                        <span style={{ fontSize: '11px', color: '#666' }}>No real funds will be deducted. Enter any dummy VPA to pass validation checks.</span>
                    </div>
                )}

                <div style={{ marginTop: '15px', padding: '15px', border: '1px dashed green', borderRadius: '5px', textAlign: 'center' }}>
                    <h4 style={{ margin: '0' }}>Total Amount Due: ${totalPrice.toFixed(2)}</h4>
                </div>
                
                <button type="submit" disabled={loading} style={{ 
                    padding: '12px', background: 'green', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px'
                }}>
                    {loading ? 'Processing Transaction...' : 'Place Secure Order'}
                </button>
            </form>
        </div>
    );
}