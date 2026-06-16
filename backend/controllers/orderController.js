// @desc    Get logged-in user's order history safely
// @route   GET /api/orders/myorders
const getMyOrders = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Authorization identity context missing.' });
        }

        // Query looking across standard ObjectId and raw string allocations
        const orders = await Order.find({
            $or: [
                { user: req.user._id },
                { user: req.user._id.toString() }
            ]
        }).sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Failed to pull dashboard order manifests.", error: error.message });
    }
};