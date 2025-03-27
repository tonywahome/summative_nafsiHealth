import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword: React.FC = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;