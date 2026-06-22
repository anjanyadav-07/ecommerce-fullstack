const express = require('express');
const router = express.Router();
const { 
    getMyOrders, 
    requestRefund, 
    updateOrderStatus, 
    addOrderItems, 
    cancelOrder 
} = require('../controllers/orderController');
const { protect, isSellerOrAdmin } = require('../middleware/authMiddleware');

// 1. Buyer: Place an order
router.post('/', protect, addOrderItems);

// 2. Buyer: View their own order history
router.get('/my-orders', protect, getMyOrders);

// 3. Buyer: Request a refund for a specific order
router.put('/:id/refund', protect, requestRefund);

// 4. Buyer: Cancel an order (if applicable)
router.put('/:id/cancel', protect, cancelOrder);

// 5. Seller/Admin: Update order status (Tracking/Shipping updates)
router.put('/:id/status', protect, isSellerOrAdmin, updateOrderStatus);

module.exports = router;