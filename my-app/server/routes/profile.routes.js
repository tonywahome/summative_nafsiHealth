const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware');
const db = require('../db');

// Get user profile
router.get('/', verifyToken, async (req, res) => {
    try {
        const [user] = await db.execute(
            'SELECT u.email, u.user_type, COALESCE(p.first_name, pr.first_name, a.first_name) as first_name, ' +
            'COALESCE(p.last_name, pr.last_name, a.last_name) as last_name ' +
            'FROM users u ' +
            'LEFT JOIN patients p ON u.id = p.user_id ' +
            'LEFT JOIN practitioners pr ON u.id = pr.user_id ' +
            'LEFT JOIN administrators a ON u.id = a.user_id ' +
            'WHERE u.id = ?',
            [req.userId]
        );

        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user profile
router.put('/', verifyToken, async (req, res) => {
    try {
        const { firstName, lastName, phone, address } = req.body;
        const userType = req.userType;
        const table = `${userType}s`;

        await db.execute(
            `UPDATE ${table} SET first_name = ?, last_name = ?, phone = ?, address = ? WHERE user_id = ?`,
            [firstName, lastName, phone, address, req.userId]
        );

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Change password
router.put('/change-password', verifyToken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const [user] = await db.execute(
            'SELECT password FROM users WHERE id = ?',
            [req.userId]
        );

        const isValidPassword = await bcrypt.compare(currentPassword, user[0].password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 8);
        await db.execute(
            'UPDATE users SET password = ? WHERE id = ?',
            [hashedPassword, req.userId]
        );

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;