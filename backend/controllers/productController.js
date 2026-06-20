const Product = require('../models/Product');

// @desc    Fetch all products (Public)
// @route   GET /api/products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new product (Protected - Requires Auth Middleware)
// @route   POST /api/products
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, imageUrl, stock } = req.body;

        // Ensure all required fields are provided
        if (!name || !description || !price || !category || !imageUrl || !stock) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const product = new Product({
            name,
            description,
            price,
            category,
            imageUrl,
            stock,
            sellerId: req.user._id // Links product to the logged-in user via JWT
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
const createProductReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            // Check if user has already reviewed
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            );

            if (alreadyReviewed) {
                return res.status(400).json({ message: 'You have already reviewed this product' });
            }

            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id,
            };

            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            
            // Calculate average rating
            product.rating = 
                product.reviews.reduce((acc, item) => item.rating + acc, 0) / 
                product.reviews.length;

            await product.save();
            res.status(201).json({ message: 'Review added successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProducts, createProduct, createProductReview };