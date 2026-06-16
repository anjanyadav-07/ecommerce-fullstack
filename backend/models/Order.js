const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User' // Links to the Buyer who placed the order
        },
        orderItems: [
            {
                name: { type: String, required: true },
                qty: { type: Number, required: true },
                price: { type: Number, required: true },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product' // Links to the specific items ordered
                }
            }
        ],
        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true }
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ['UPI', 'COD'], // Enforces your requested payment methods
            default: 'COD'
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false
        },
        orderStatus: {
            type: String,
            required: true,
            enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
            default: 'Processing'
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;