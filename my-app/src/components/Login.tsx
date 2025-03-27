import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userType: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);

            // Store token in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userType', response.data.userType);

            // Redirect based on user type
            switch (response.data.userType) {
                case 'practitioner':
                    navigate('/practitioner-dashboard');
                    break;
                case 'patient':
                    navigate('/patient-dashboard');
                    break;
                case 'administrator':
                    navigate('/admin-dashboard');
                    break;
                default:
                    navigate('/');
            }
        } catch (error) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>User Type:</label>
                    <select
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select User Type</option>
                        <option value="patient">Patient</option>
                        <option value="practitioner">Practitioner</option>
                        <option value="administrator">Administrator</option>
                    </select>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;