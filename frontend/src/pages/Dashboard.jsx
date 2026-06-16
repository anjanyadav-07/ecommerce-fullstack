import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Seller creation states
    const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', description: '', stock: '' });

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!user || !user.token) {
                setLoading(false);
                return;
            }
            try {
                const config = { 
                    headers: { 
                        Authorization: `Bearer ${user.token}` 
                    } 
                };
                
                // Route endpoints mapping selectors
                const endpoint = user.role === 'buyer' 
                    ? 'http://localhost:5000/api/orders/myorders' 
                    : 'http://localhost:5000/api/orders';
                
                const { data } = await axios.get(endpoint, config);
                setOrders(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error retrieving dashboard operational tracking pipeline:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, [user]);

    const handleCancel = async (orderId) => {
        if (!window.confirm("Are you sure you want to cancel this order and request an immediate refund?")) return;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`http://localhost:5000/api/orders/${orderId}/cancel`, {}, config);
            alert("Order cancelled and payment refund initialized!");
            window.location.reload();
        } catch (err) {
            alert(err.response?.data?.message || "Cancellation error occurred.");
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus }, config);
            alert("Delivery shipment tracking status updated!");
            window.location.reload();
        } catch (err) {
            alert("Failed to adjust tracking states.");
        }
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('http://localhost:5000/api/products', newProduct, config);
            alert("New product catalog listing published successfully!");
            setNewProduct({ name: '', price: '', category: '', description: '', stock: '' });
        } catch (err) {
            alert("Error publishing catalog listing unit.");
        }
    };

    if (!user) return <h2 style={{ padding: '40px', textAlign: 'center' }}>Please log in to access your tracking metrics dashboard workspace.</h2>;

    return (
        <div style={{ padding: '30px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'sans-serif', color: '#fff', backgroundColor: '#121212', minHeight: '80vh' }}>
            <h2 style={{ color: '#007bff' }}>Personal operational Workspace ({user.role.toUpperCase()} View)</h2>
            <hr style={{ border: '0', borderTop: '1px solid #333', marginBottom: '25px' }} />

            {/* SELLER & ADMIN CONTROLS PANEL: LIST PRODUCTS FORM */}
            {(user.role === 'seller' || user.role === 'admin') && (
                <div style={{ padding: '20px', background: '#1e1e1e', borderRadius: '8px', border: '1px solid #333', marginBottom: '40px' }}>
                    <h3 style={{ color: '#fff' }}>Inventory Creation: Publish New Product</h3>
                    <form onSubmit={handleCreateProduct} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <input type="text" placeholder="Product Name" required value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} style={{ padding: '10px', background: '#2d2d2d', color: '#fff', border: '1px solid #444' }} />
                        <input type="number" placeholder="Price ($)" required value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} style={{ padding: '10px', background: '#2d2d2d', color: '#fff', border: '1px solid #444' }} />
                        <input type="text" placeholder="Category (e.g. Electronics)" required value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} style={{ padding: '10px', background: '#2d2d2d', color: '#fff', border: '1px solid #444' }} />
                        <input type="number" placeholder="Stock Inventory Units Count" required value={newProduct.stock} onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})} style={{ padding: '10px', background: '#2d2d2d', color: '#fff', border: '1px solid #444' }} />
                        <textarea placeholder="Product Description Detail Text" required value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} style={{ padding: '10px', gridColumn: 'span 2', height: '60px', background: '#2d2d2d', color: '#fff', border: '1px solid #444' }}></textarea>
                        <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer', gridColumn: 'span 2' }}>Add to Storefront Listing</button>
                    </form>
                </div>
            )}

            {/* ORDER TRACKING & MANIFEST LOG MODULE */}
            <h3 style={{ marginBottom: '20px' }}>{user.role === 'buyer' ? "🛍️ Your Historical Purchase Manifests" : "📦 Customer Order Management Queue"}</h3>
            
            {loading ? (
                <h4>Fetching pipeline tracking feeds...</h4>
            ) : orders.length === 0 ? (
                <div style={{ padding: '40px', border: '2px dashed #444', borderRadius: '8px', textAlign: 'center', background: '#1e1e1e' }}>
                    <p style={{ color: '#aaa', fontSize: '16px', margin: '0 0 10px 0' }}>No active order rows linked to account identifier: <strong>{user.name}</strong></p>
                    <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>To pop this timeline, head to the <strong>Catalog</strong>, insert items into your <strong>Cart</strong>, and finish out a mock payment checkout sequence!</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {orders.map(order => {
                        const currentStatus = order.orderStatus || 'Processing';
                        return (
                            <div key={order._id} style={{ padding: '20px', border: '1px solid #333', borderRadius: '8px', background: '#1e1e1e', position: 'relative' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                    <div>
                                        <strong style={{ color: '#aaa' }}>Order Reference ID:</strong> <span style={{ fontFamily: 'monospace', color: '#007bff' }}>{order._id}</span><br />
                                        <div style={{ marginTop: '5px' }}>
                                            <strong>Total Charged Amount:</strong> <span style={{ color: '#28a745', fontWeight: 'bold' }}>${order.totalPrice?.toFixed(2)}</span> | <strong>Gateway:</strong> {order.paymentMethod}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        {user.role === 'buyer' && currentStatus === 'Processing' && (
                                            <button onClick={() => handleCancel(order._id)} style={{ padding: '6px 12px', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Cancel & Refund 💸</button>
                                        )}
                                        {currentStatus === 'Cancelled' && <span style={{ color: '#dc3545', fontWeight: 'bold' }}>CANCELLED (Refunded)</span>}
                                    </div>
                                </div>

                                {/* STEP-BY-STEP TRACKING VISUAL PROGRESS BAR */}
                                {currentStatus !== 'Cancelled' && (
                                    <div style={{ margin: '25px 0 15px 0' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>
                                            <span style={{ color: '#28a745' }}>✓ Processing</span>
                                            <span style={{ color: (currentStatus === 'Shipped' || currentStatus === 'Delivered') ? '#28a745' : '#666' }}>
                                                {(currentStatus === 'Shipped' || currentStatus === 'Delivered') ? '✓ Shipped' : '○ Shipped'}
                                            </span>
                                            <span style={{ color: currentStatus === 'Delivered' ? '#28a745' : '#666' }}>
                                                {currentStatus === 'Delivered' ? '✓ Delivered' : '○ Delivered'}
                                            </span>
                                        </div>
                                        <div style={{ height: '8px', background: '#333', borderRadius: '4px', overflow: 'hidden' }}>
                                            <div style={{ 
                                                height: '100%', 
                                                background: '#28a745', 
                                                width: currentStatus === 'Processing' ? '15%' : currentStatus === 'Shipped' ? '60%' : '100%',
                                                transition: 'width 0.4s ease'
                                            }} />
                                        </div>
                                    </div>
                                )}

                                {/* SELLER DISPATCH EDIT CONTROLS */}
                                {(user.role === 'seller' || user.role === 'admin') && currentStatus !== 'Cancelled' && (
                                    <div style={{ marginTop: '15px', background: '#2d2d2d', padding: '10px', borderRadius: '5px', border: '1px solid #444' }}>
                                        <label style={{ marginRight: '10px', fontSize: '14px', fontWeight: 'bold', color: '#aaa' }}>Update Delivery Step Status:</label>
                                        <select value={currentStatus} onChange={(e) => handleStatusUpdate(order._id, e.target.value)} style={{ padding: '5px', background: '#121212', color: '#fff', border: '1px solid #444' }}>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}