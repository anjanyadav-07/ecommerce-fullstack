const mongoose = require('mongoose');

// 1. Create a schema just for the reviews
const reviewSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    { timestamps: true }
);

// 2. Add the reviews array and rating averages to the main product schema
const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true, default: 0 },
        category: { type: String, required: true },
        stock: { type: Number, required: true, default: 0 },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        reviews: [reviewSchema], // An array of the reviews created above
        rating: { type: Number, required: true, default: 0 }, // Average rating
        numReviews: { type: Number, required: true, default: 0 } // Total number of reviews
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;