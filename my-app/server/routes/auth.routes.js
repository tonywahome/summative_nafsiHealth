const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('../db');
const { sendEmail } = require('../services/email.service');
const { registerValidation, validate } = require('../middleware/validation.middleware');

// Register with email verification
router.post('/register', registerValidation, validate, async (req, res) => {
    try {
        const { email, password, userType, firstName, lastName } = req.body;

        // Check if user exists
        const [existingUser] = await db.execute(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Create verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const hashedPassword = await bcrypt.hash(password, 8);

        // Insert user with verification token
        const [result] = await db.execute(
            'INSERT INTO users (email, password, user_type, verification_token, is_verified) VALUES (?, ?, ?, ?, false)',
            [email, hashedPassword, userType, verificationToken]
        );

        const userId = result.insertId;

        // Insert into role-specific table
        const roleTable = `${userType}s`;
        await db.execute(
            `INSERT INTO ${roleTable} (user_id, first_name, last_name) VALUES (?, ?, ?)`,
            [userId, firstName, lastName]
        );

        // Send verification email
        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
        await sendEmail(
            email,
            'Verify Your Email',
            `Please click this link to verify your email: <a href="${verificationUrl}">Verify Email</a>`
        );

        res.status(201).json({ message: 'Registration successful. Please check your email to verify your account.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Email verification
router.get('/verify-email/:token', async (req, res) => {
    try {
        const { token } = req.params;

        const [user] = await db.execute(
            'SELECT id FROM users WHERE verification_token = ?',
            [token]
        );

        if (user.length === 0) {
            return res.status(400).json({ message: 'Invalid verification token' });
        }

        await db.execute(
            'UPDATE users SET is_verified = true, verification_token = NULL WHERE id = ?',
            [user[0].id]
        );

        res.json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Password reset request
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        const [user] = await db.execute(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

        await db.execute(
            'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?',
            [resetToken, resetTokenExpiry, user[0].id]
        );

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        await sendEmail(
            email,
            'Reset Your Password',
            `Please click this link to reset your password: <a href="${resetUrl}">Reset Password</a>`
        );

        res.json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Password reset
router.post('/reset-password/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const [user] = await db.execute(
            'SELECT id FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()',
            [token]
        );

        if (user.length === 0) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        await db.execute(
            'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?',
            [hashedPassword, user[0].id]
        );

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;