const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 }
});

const orderSchema = new mongoose.Schema({
  // Use 'user' ref instead of userIdentifier for better database relationships
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  
  // Status and Tracking
  status: {
    type: String,
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Processing'
  },
  trackingNumber: { type: String, default: null },
  trackingTimeline: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
    description: String
  }],

  // NEW: Refund Workflow Fields
  refundStatus: {
    type: String,
    enum: ['None', 'Requested', 'Approved', 'Rejected', 'Refunded'],
    default: 'None'
  },
  refundReason: { type: String, default: null }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);