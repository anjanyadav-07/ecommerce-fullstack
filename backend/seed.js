require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/eshop';

const seedProducts = [
  {
    name: "Quantum Mechanical Keyboard",
    description: "Ultra-responsive mechanical switches with full dynamic RGB backlighting and tactile response profiles.",
    price: 129.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format&fit=crop&q=60",
    rating: 4.8,
    stock: 25
  },
  {
    name: "Ergonomic Mesh Office Chair",
    description: "High-back construction featuring breathable performance mesh, adjustable lumbar support, and 4D armrests.",
    price: 249.50,
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=500&auto=format&fit=crop&q=60",
    rating: 4.6,
    stock: 12
  },
  {
    name: "Noise-Cancelling Wireless Headphones",
    description: "Active adaptive noise cancellation with studio-grade audio drivers and up to 40 hours of continuous runtime.",
    price: 199.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
    rating: 4.7,
    stock: 40
  },
  {
    name: "Minimalist Leather Daily Wallet",
    description: "Top-grain genuine leather composition with hardware integrated RFID blocking security sheets.",
    price: 45.00,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=60",
    rating: 4.3,
    stock: 100
  },
  {
    name: "Stainless Steel Smart Thermal Flask",
    description: "Double-walled vacuum insulated flask built with an integrated LCD real-time lid temperature tracker.",
    price: 34.99,
    category: "Home & Kitchen",
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    stock: 65
  },
  {
    name: "Ultra-Wide Precision Gaming Desk Pad",
    description: "Micro-woven cloth surface optimized for precise high-DPI mouse tracing with durable anti-fray stitched seams.",
    price: 22.50,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=500&auto=format&fit=crop&q=60",
    rating: 4.4,
    stock: 80
  }
];

async function runSeed() {
  try {
    console.log("Connecting to database at:", MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log("Database connection successful.");

    // Clear collection completely
    await Product.deleteMany({});
    console.log("Stale product collections successfully dropped.");

    // Populate catalog items
    const insertedItems = await Product.insertMany(seedProducts);
    console.log(`Successfully populated database catalog with ${insertedItems.length} products.`);

    process.exit(0);
  } catch (error) {
    console.error("Critical error seeding database collections:", error);
    process.exit(1);
  }
}

runSeed();