import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import React, { useState } from 'react';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            setLoading(false);
            console.log(response.data);
            navigate('/dashboard');
        } catch (err) {
            setLoading(false);
            setError('Failed to login. Please check your credentials.');
            console.error(err);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register Here</Link></p>
        </div>
    );
};

export default Login;
