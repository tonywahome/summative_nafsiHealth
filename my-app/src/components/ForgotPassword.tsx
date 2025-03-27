import React, { useState, FC } from 'react';
import axios from 'axios';

const ForgotPassword: FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            setMessage(response.data.message);
            setError('');
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
            setMessage('');
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ForgotPassword;