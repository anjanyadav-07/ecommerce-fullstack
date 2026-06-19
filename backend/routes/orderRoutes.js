const express = require('express');
const router = express.Router();

// 1. Explicitly import the modules
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// 2. Log contents to the console to verify successful import
console.log("--- DEBUG START ---");
console.log("Controller loaded:", orderController);
console.log("Middleware loaded:", authMiddleware);

// 3. Destructure the functions
const { 
    addOrderItems, 
    getMyOrders, 
    cancelOrder, 
    updateOrderStatus 
} = orderController;

const { protect } = authMiddleware;

// 4. Force-check to pinpoint the undefined variable
if (typeof protect !== 'function') {
    throw new Error("CRITICAL ERROR: 'protect' is not a function! Check middleware/authMiddleware.js exports.");
}
if (typeof addOrderItems !== 'function') {
    throw new Error("CRITICAL ERROR: 'addOrderItems' is not a function! Check controllers/orderController.js exports.");
}

console.log("--- DEBUG SUCCESS: All handlers are valid functions ---");

// 5. Define Routes
router.post('/', protect, addOrderItems);
router.get('/myorders', protect, getMyOrders);
router.put('/:id/cancel', protect, cancelOrder);
router.put('/:id/status', protect, updateOrderStatus);

module.exports = router;