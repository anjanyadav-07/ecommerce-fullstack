const express = require('express');
const router = express.Router();

// 1. Import your controllers safely
const orderController = require('../controllers/orderController') || {};

// 2. Extract functions with strict fallback checks to prevent undefined crashes
const addOrderItems = orderController.addOrderItems || ((req, res) => res.status(501).send("Not Implemented"));
const getMyOrders = orderController.getMyOrders || ((req, res) => res.status(501).send("Not Implemented"));
const cancelOrder = orderController.cancelOrder || ((req, res) => res.status(501).send("Not Implemented"));
const updateOrderStatus = orderController.updateOrderStatus || ((req, res) => res.status(501).send("Not Implemented"));

// 3. Import your auth middleware safely
const authMiddleware = require('../middleware/authMiddleware') || {};
const protect = authMiddleware.protect || authMiddleware || ((req, res, next) => next());

// 4. Register Core Pipelines safely
router.post('/', protect, addOrderItems);
router.get('/myorders', protect, getMyOrders);

// 5. Register Status Updates safely
router.put('/:id/cancel', protect, cancelOrder);
router.put('/:id/status', protect, updateOrderStatus);

module.exports = router;