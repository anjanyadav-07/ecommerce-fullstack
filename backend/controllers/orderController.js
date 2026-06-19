const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        // Map the frontend data to your model's required fields
        // This bridges the gap between your UI and your Database schema
        const order = new Order({
            user: req.user._id,
            userIdentifier: req.user._id, // Mapping requirement
            orderItems,
            shippingAddress: {
                street: shippingAddress.address, // Mapping 'address' to 'street'
                city: shippingAddress.city,
                postalCode: shippingAddress.postalCode || "N/A", // Default if empty
                country: "Unknown" // Default if not sent by frontend
            },
            paymentMethod,
            totalAmount: totalPrice // Mapping 'totalPrice' to 'totalAmount'
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        console.error("Order creation error:", error);
        res.status(500).json({ message: 'Server error during checkout', error: error.message });
    }
};

// @desc    Get logged-in user's order history
// @route   GET /api/orders/myorders
const getMyOrders = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Authorization identity context missing.' });
        }

        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Failed to pull order manifests.", error: error.message });
    }
};

// Placeholder for missing functions to prevent 501 errors
const cancelOrder = async (req, res) => res.status(501).json({ message: "Not implemented" });
const updateOrderStatus = async (req, res) => res.status(501).json({ message: "Not implemented" });

// EXPORT ALL FUNCTIONS
module.exports = { 
    addOrderItems, 
    getMyOrders, 
    cancelOrder, 
    updateOrderStatus 
};