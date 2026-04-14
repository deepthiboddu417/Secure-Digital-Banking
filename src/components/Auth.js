import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? '/auth/login' : '/auth/register';
        try {
            const { data } = await API.post(endpoint, formData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('accountNumber', data.accountNumber);
            localStorage.setItem('username', formData.username);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data || "Authentication failed");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '300px', margin: 'auto' }}>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" required 
                    onChange={(e) => setFormData({...formData, username: e.target.value})} /><br/><br/>
                <input type="password" placeholder="Password" required 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} /><br/><br/>
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            <p onClick={() => setIsLogin(!isLogin)} style={{cursor: 'pointer', color: 'blue'}}>
                {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
            </p>
        </div>
    );
};

export default Auth;