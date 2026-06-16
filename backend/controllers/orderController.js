const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order items and update corresponding inventory metrics
// @route   POST /api/orders
const addOrderItems = async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'Transaction abandoned: Checkout matrix cannot be empty.' });
        }

        // 1. Double check stock ceilings across all purchased structural units
        for (const item of orderItems) {
            const dbProduct = await Product.findById(item.product);
            if (!dbProduct) {
                return res.status(404).json({ message: `Product record targeting reference '${item.name}' could not be resolved.` });
            }
            if (dbProduct.stock < item.qty) {
                return res.status(400).json({ message: `Out of Stock allocation alert! Only ${dbProduct.stock} unit(s) of '${item.name}' remaining.` });
            }
        }

        // 2. Perform the reduction mutation operations safely
        for (const item of orderItems) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { stock: -item.qty }
            });
        }

        // 3. Document order generation mapping records to current logged-in user context
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);

    } catch (error) {
        res.status(500).json({ message: "Backend Engine tracking execution failure", error: error.message });
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

// Make sure BOTH functions are exported cleanly!
module.exports = { 
    addOrderItems, 
    getMyOrders 
};