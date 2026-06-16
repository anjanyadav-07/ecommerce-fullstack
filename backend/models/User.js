const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name']
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true, // Prevents duplicate accounts
            lowercase: true
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 6 // Basic security requirement
        },
        role: {
            type: String,
            enum: ['buyer', 'seller', 'admin'], // These are the exact permissions you requested
            default: 'buyer' // Anyone who signs up is a normal user by default
        }
    },
    {
        timestamps: true // Automatically creates 'createdAt' and 'updatedAt' fields
    }
);

// Mongoose Hook: Hash the password before saving to the database
userSchema.pre('save', async function (next) {
    // If the password wasn't modified (e.g., just updating the user's name), skip hashing
    if (!this.isModified('password')) {
        next();
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method: Compare entered password with hashed database password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;