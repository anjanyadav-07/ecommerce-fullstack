const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const orderSchema = new mongoose.Schema({
  userIdentifier: {
    type: String,
    required: true,
    index: true // Maps to 'Anjan' or your authenticated user session identifier
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['UPI', 'COD'],
    default: 'UPI'
  },
  status: {
    type: String,
    required: true,
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refund Requested', 'Refunded'],
    default: 'Processing'
  },
  trackingTimeline: [
    {
      status: String,
      timestamp: { type: Date, default: Date.now },
      description: String
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);