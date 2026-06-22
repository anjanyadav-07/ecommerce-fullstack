const Order = require('../models/Order');

// @desc    Place a new order
const addOrderItems = async (req, res) => {
    try {
        const { items, totalAmount, shippingAddress, paymentMethod } = req.body;
        const order = new Order({
            user: req.user._id,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user orders
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('items.productId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Request a refund (Buyer)
const requestRefund = async (req, res) => {
    try {
        const { reason } = req.body;
        const order = await Order.findById(req.params.id);

        if (order && order.user.toString() === req.user._id.toString()) {
            order.refundStatus = 'Requested';
            order.refundReason = reason;
            await order.save();
            res.json({ message: 'Refund request submitted successfully' });
        } else {
            res.status(404).json({ message: 'Order not found or unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Cancel an order (Buyer)
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order && order.user.toString() === req.user._id.toString()) {
            order.status = 'Cancelled';
            order.trackingTimeline.push({ status: 'Cancelled', description: 'Order cancelled by user' });
            await order.save();
            res.json({ message: 'Order cancelled successfully' });
        } else {
            res.status(404).json({ message: 'Order not found or unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status/tracking (Seller/Admin)
const updateOrderStatus = async (req, res) => {
    try {
        const { status, trackingNumber, description } = req.body;
        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = status;
            if (trackingNumber) order.trackingNumber = trackingNumber;
            
            order.trackingTimeline.push({
                status,
                description: description || `Status updated to ${status}`
            });

            await order.save();
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    addOrderItems, 
    getMyOrders, 
    requestRefund, 
    cancelOrder, 
    updateOrderStatus 
};