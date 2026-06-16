const Order = require('../models/Order');

// @desc    Create a new order (Checkout)
// @route   POST /api/orders
const addOrderItems = async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

        // 1. Check if the cart is empty
        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'No items in the order' });
        }

        // 2. Create the order, linking it to the logged-in user's ID
        const order = new Order({
            user: req.user._id, // Provided by the auth middleware!
            orderItems,
            shippingAddress,
            paymentMethod, // Your requested UPI or COD
            totalPrice
        });

        // 3. Save to database
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged-in user's order history
// @route   GET /api/orders/myorders
const getMyOrders = async (req, res) => {
    try {
        // Find all orders where the user ID matches the logged-in user
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addOrderItems, getMyOrders };