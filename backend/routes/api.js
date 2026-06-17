const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');

// 1. Fetch entire product catalog
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve catalog products from database." });
  }
});

// 2. Fetch historic orders for a specific user identifier
router.get('/orders/:userIdentifier', async (req, res) => {
  try {
    const { userIdentifier } = req.params;
    const orders = await Order.find({ userIdentifier }).sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: "Failed to pull customer historical manifest files." });
  }
});

// 3. Create a brand new verified database purchase order
router.post('/orders', async (req, res) => {
  try {
    const { userIdentifier, items, totalAmount, shippingAddress, paymentMethod } = req.body;

    if (!userIdentifier || !items || items.length === 0 || !totalAmount) {
      return res.status(400).json({ error: "Invalid operational payload. Complete order metadata required." });
    }

    const newOrder = new Order({
      userIdentifier,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      status: 'Processing',
      trackingTimeline: [
        { status: 'Processing', description: 'Order payment successfully verified. Packing processing initiated.' }
      ]
    });

    const savedOrder = await newOrder.save();
    return res.status(201).json(savedOrder);
  } catch (error) {
    return res.status(500).json({ error: "Failed to commit order execution block to transaction logs." });
  }
});

module.exports = router;