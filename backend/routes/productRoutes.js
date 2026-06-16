const express = require('express');
const router = express.Router();
const { getProducts, createProduct, createProductReview } = require('../controllers/productController');
const { protect, isSellerOrAdmin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getProducts)
    .post(protect, isSellerOrAdmin, createProduct);

router.route('/:id/reviews')
    .post(protect, createProductReview);

module.exports = router;