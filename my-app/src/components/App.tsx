import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Profile from './Profile';
import PractitionerDashboard from './PractitionerDashboard';
import PrivateRoute from './PrivateRoute';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/practitioner-dashboard"
                    element={
                        <PrivateRoute>
                            <PractitionerDashboard />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;