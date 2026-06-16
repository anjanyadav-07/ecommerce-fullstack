const express = require('express');
const router = express.Router();
const { addOrderItems, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// Route to place a new order
router.post('/', protect, addOrderItems);

// Route to get personal order history
router.get('/myorders', protect, getMyOrders);

module.exports = router;