import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile: React.FC = () => {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: ''
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/profile', {
                headers: { 'x-access-token': token }
            });
            setProfile(response.data);
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/api/profile', profile, {
                headers: { 'x-access-token': token }
            });
            setMessage('Profile updated successfully');
            setError('');
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
            setMessage('');
        }
    };

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={profile.email}
                        disabled
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <textarea
                        value={profile.address}
                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;