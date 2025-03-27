const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: process.env.SENDGRID_API_KEY,
        },
    })
);

const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            to,
            from: process.env.EMAIL_FROM,
            subject,
            html,
        });
        return true;
    } catch (error) {
        console.error('Email error:', error);
        return false;
    }
};

module.exports = { sendEmail };