import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top"
            style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                zIndex: 1000
            }}>
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/" style={{ color: '#fff', fontSize: '1.5rem', letterSpacing: '1px' }}>
                    LMS Portal
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav align-items-center">
                        <li className="nav-item">
                            <Link className="nav-link text-white mx-2" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link btn btn-light text-primary px-4 py-2 rounded-pill mx-2" to="/signup" style={{ background: '#fff', color: '#667eea', fontWeight: 'bold' }}>
                                Sign Up
                            </Link>
                        </li>
                        <li className="nav-item ms-md-3 border-start border-light ps-md-3">
                            <Link className="nav-link text-warning fw-bold" to="/exam/dashboard">
                                Exam Admin
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-info fw-bold" to="/student-portal">
                                Student Portal
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
