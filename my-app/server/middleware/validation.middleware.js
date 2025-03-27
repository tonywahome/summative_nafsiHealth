const { body, validationResult } = require('express-validator');

const registerValidation = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number')
        .matches(/[A-Z]/)
        .withMessage('Password must contain an uppercase letter'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('userType').isIn(['patient', 'practitioner', 'administrator'])
        .withMessage('Invalid user type'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    registerValidation,
    validate,
};