import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Auth.css';

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        role: 'student',
        idNumber: '', // Student ID or Employee ID
        password: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (!formData.fullName || !formData.email || !formData.password || !formData.idNumber) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            setLoading(true);
            // Simulating API call
            const response = await import('../services/authService').then(m => m.authService.signup(formData));

            if (response.success) {
                toast.success('Account Created Successfully!');
                console.log("Registered user:", response.data);
                // navigate('/login'); 
            }
        } catch (error) {
            toast.error(error.message || "Signup failed");
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
                        <h2>Create Account</h2>
                        <p>Join the LMS portal as {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}</p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        {/* Role Selection */}
                        <div className="mb-3">
                            <select
                                name="role"
                                className="form-select"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="student">Student</option>
                                <option value="faculty">Faculty</option>
                                <option value="admin">Admin</option>
                                <option value="subadmin">Sub-Admin</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                name="fullName"
                                className="form-control"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>

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
                                type="text"
                                name="idNumber"
                                className="form-control"
                                placeholder={formData.role === 'student' ? "Student Enrollment ID" : "Employee ID"}
                                value={formData.idNumber}
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

                        <div className="mb-4">
                            <input
                                type="password"
                                name="confirmPassword"
                                className="form-control"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn submit-btn" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="toggle-text">
                        Already have an account?
                        <Link to="/login" className="toggle-link">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
