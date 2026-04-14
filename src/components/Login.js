import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', credentials);
            
            console.log("Login Success Data:", res.data);

            // SAVE TO LOCAL STORAGE
            localStorage.setItem('token', res.data.token);
            // Fallback: if res.data.username is missing, use credentials.username
            localStorage.setItem('username', res.data.username || credentials.username); 
            localStorage.setItem('accountNumber', res.data.accountNumber);
            
            navigate('/dashboard');
        } catch (err) {
            console.error("Login Error:", err);
            alert("❌ Login Failed: Check credentials");
        }
    };

    return (
        <div style={styles.pageBackground}>
            <div style={styles.container}>
                <h2 style={styles.title}>Secure <span style={{color: '#fbc02d'}}>Login</span></h2>
                <p style={styles.subtitle}>Enter credentials to access your gold vault</p>
                
                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <input 
                            type="text" placeholder="Username" required 
                            style={styles.input}
                            onChange={(e) => setCredentials({...credentials, username: e.target.value})} 
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <input 
                            type="password" placeholder="Password" required 
                            style={styles.input}
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
                        />
                    </div>
                    <button type="submit" style={styles.actionBtn}>Access Account</button>
                </form>
                
                <p style={styles.footerText}>
                    New to Gold Bank? <Link to="/register" style={styles.link}>Create an account</Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    pageBackground: { backgroundColor: '#121212', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif" },
    container: { width: '100%', maxWidth: '400px', backgroundColor: '#1e1e1e', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '1px solid #333', textAlign: 'center' },
    title: { color: '#fff', marginBottom: '10px', fontSize: '1.8rem', fontWeight: 'bold' },
    subtitle: { color: '#888', fontSize: '0.9rem', marginBottom: '30px' },
    inputGroup: { marginBottom: '20px' },
    input: { width: '100%', padding: '14px', borderRadius: '12px', backgroundColor: '#2a2a2a', border: '1px solid #444', color: '#fff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' },
    actionBtn: { width: '100%', padding: '15px', background: 'linear-gradient(to right, #fbc02d, #f9a825)', color: '#000', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '1rem', fontWeight: '700', marginTop: '10px' },
    footerText: { color: '#bbb', marginTop: '25px', fontSize: '0.85rem' },
    link: { color: '#fbc02d', textDecoration: 'none', fontWeight: 'bold' }
};

export default Login;