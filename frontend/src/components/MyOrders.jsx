import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            // 1. Retrieve the user info from localStorage using the 'user' key
            const user = JSON.parse(localStorage.getItem('user'));

            // 2. If no token exists, the user isn't logged in
            if (!user || !user.token) {
                console.error("No token found. Please log in.");
                setLoading(false);
                return;
            }

            // 3. Include the Authorization header with the Bearer token
            const { data } = await axios.get('/api/orders/my-orders', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleRefund = async (id) => {
        if (window.confirm("Request a refund for this order?")) {
            const user = JSON.parse(localStorage.getItem('user'));
            await axios.put(`/api/orders/${id}/refund`, {}, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            fetchOrders(); 
        }
    };

    const handleCancel = async (id) => {
        if (window.confirm("Are you sure you want to cancel this order?")) {
            const user = JSON.parse(localStorage.getItem('user'));
            await axios.put(`/api/orders/${id}/cancel`, {}, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            fetchOrders(); 
        }
    };

    if (loading) return <div>Loading your orders...</div>;

    return (
        <div className="container">
            <h2>My Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Refund Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>${order.totalAmount}</td>
                                <td>
                                    <span className={`badge ${order.status}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge ${order.refundStatus}`}>
                                        {order.refundStatus}
                                    </span>
                                </td>
                                <td>
                                    {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                                        <button onClick={() => handleCancel(order._id)}>Cancel</button>
                                    )}
                                    {order.refundStatus === 'None' && order.status === 'Delivered' && (
                                        <button onClick={() => handleRefund(order._id)}>Request Refund</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyOrders;