const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 1. Protect Routes: Checks if the user has a valid JWT token
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (Format is "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch the user from the database (excluding their password) and attach it to the request
            req.user = await User.findById(decoded.id).select('-password');
            
            next(); // Move on to the next piece of logic
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// 2. Role Authorization: Checks if the logged-in user is a Seller or Admin
const isSellerOrAdmin = (req, res, next) => {
    if (req.user && (req.user.role === 'seller' || req.user.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as a Seller or Admin' });
    }
};

module.exports = { protect, isSellerOrAdmin };