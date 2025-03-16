import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';

dotenv.config();
// Register a new user
// Register a new user with basic validation
export const registerUser = async (req, res) => {
    try {
        const { username, email, password, TPNumber } = req.body;

        if (!username || !email || !password || !TPNumber) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if email or TPNumber already exists
        const existingUser = await User.findOne({ $or: [{ email }, { TPNumber }] });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists with this email or phone number" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User (password hashing happens in the model)
        const newUser = new User({ username, email, password: hashedPassword, TPNumber });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email, TPNumber } = req.body;

        const user = await User.findOne({ email });

        if (!user || user.TPNumber !== TPNumber) {
            return res.status(400).json({ error: "Invalid email or phone number" });
        }

        // Generate a secure reset token
        const resetToken = jwt.sign(
            { userId: user._id, email: user.email }, // Include email in the token
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        user.resetToken = resetToken;
        await user.save();

        // Send email with reset link
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "nethmamalshani2002@gmail.com", // Replace with your email
                pass: "uhpf dtex dbty wrbe", // Use an app password (NOT your email password)
            },
        });

        const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
        await transporter.sendMail({
            from: '"Support Team" <nethmamalshani2002@gmail.com>',
            to: user.email,
            subject: "Password Reset Request",
            html: `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
        });

        res.json({ message: "Password reset email sent!" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        // Validate input
        if (!token || !newPassword) {
            return res.status(400).json({ message: "Token and new password are required." });
        }

        // Token verification
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);// Check the structure of the decoded token
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token has expired. Please request a new one." });
            }
            return res.status(400).json({ message: "Invalid token." });
        }

        // Find the user using the decoded token's userId
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check for valid password length
        if (newPassword.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }

        // Hash the new password before saving
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        // Respond with success message
        res.status(200).json({ message: "Password reset successful. You can now log in with your new password." });
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login and JWT Authentication System
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //  Validate input fields
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        //  Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        //  Ensure JWT secret exists
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in .env file");
            return res.status(500).json({ message: "Server error: missing JWT secret" });
        }

        //  Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET, // Use secret from .env
            { expiresIn: "1h" } // Token expires in 1 hour
        );

        res.status(200).json({
            message: "Login successful",
            user: { username: user.username, email: user.email },
            token: token,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password field
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users', details: error.message });
    }
};

// Get a user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user', details: error.message });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        // Ensure the logged-in user is either an admin or the user requesting the deletion
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ message: 'You are not authorized to delete this account' });
        }

        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user', details: error.message });
    }
};

// Update a user
export const updateUser = async (req, res) => {
    try {
        // Ensure user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        // Ensure the logged-in user is authorized
        if (req.user.userId !== req.params.id) {
            console.log('Unauthorized update attempt:', req.user.id, req.params.id);
            return res.status(403).json({ message: 'You are not authorized to update this account' });
        }
        console.log(req.user);

        // Validate request body fields
        const { username, email, TPNumber } = req.body;
        if (!username || !email || !TPNumber ) {
            return res.status(400).json({ message: 'All fields are required' });

        }

        // Update user in database
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { username, email, TPNumber },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user', details: error.message });
    }
};