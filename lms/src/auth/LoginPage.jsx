import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Auth.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            // Simulating API call using the service
            const response = await import('../services/authService').then(m => m.authService.login(formData));

            if (response.success) {
                toast.success('Login Successful! Redirecting...', { theme: "light" });
                console.log("Logged in user:", response.data);
                // Redirect logic here (e.g., navigate('/dashboard'))
                // navigate('/dashboard'); 
            }
        } catch (error) {
            toast.error(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>

            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', zIndex: 10 }}>
                <div className="glass-card col-12 col-md-8 col-lg-5">
                    <div className="auth-header">
                        <h2>Welcome Back</h2>
                        <p>Login to your LMS portal</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="d-flex justify-content-end mb-4">
                            <Link to="/forgot-password" style={{ color: '#fff', fontSize: '0.9rem', textDecoration: 'none', opacity: 0.8 }}>
                                Forgot Password?
                            </Link>
                        </div>

                        <button type="submit" className="btn submit-btn" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="toggle-text">
                        Don't have an account?
                        <Link to="/signup" className="toggle-link">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
