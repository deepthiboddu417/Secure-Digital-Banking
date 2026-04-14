import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [user, setUser] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', user);
            alert("✨ Account Created Successfully!");
            navigate('/');
        } catch (err) {
            alert("❌ Registration failed: Username might be taken");
        }
    };

    return (
        <div style={styles.pageBackground}>
            <div style={styles.container}>
                <h2 style={styles.title}>Open <span style={{color: '#fbc02d'}}>Account</span></h2>
                <p style={styles.subtitle}>Join the most secure banking network</p>
                
                <form onSubmit={handleRegister}>
                    <div style={styles.inputGroup}>
                        <input 
                            type="text" placeholder="Choose Username" required 
                            style={styles.input}
                            onChange={(e) => setUser({...user, username: e.target.value})} 
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <input 
                            type="password" placeholder="Set Password" required 
                            style={styles.input}
                            onChange={(e) => setUser({...user, password: e.target.value})} 
                        />
                    </div>
                    <button type="submit" style={styles.actionBtn}>Register Now</button>
                </form>
                
                <p style={styles.footerText}>
                    Already have an account? <Link to="/" style={styles.link}>Login here</Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    pageBackground: {
        backgroundColor: '#121212',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",
    },
    container: {
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#1e1e1e',
        padding: '40px',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        border: '1px solid #333',
        textAlign: 'center'
    },
    title: { color: '#fff', marginBottom: '10px', fontSize: '1.8rem' },
    subtitle: { color: '#888', fontSize: '0.9rem', marginBottom: '30px' },
    inputGroup: { marginBottom: '20px' },
    input: {
        width: '100%',
        padding: '14px',
        borderRadius: '12px',
        backgroundColor: '#2a2a2a',
        border: '1px solid #444',
        color: '#fff',
        fontSize: '0.9rem',
        outline: 'none',
        boxSizing: 'border-box'
    },
    actionBtn: {
        width: '100%',
        padding: '15px',
        background: 'linear-gradient(to right, #fbc02d, #f9a825)',
        color: '#000',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '700',
        marginTop: '10px'
    },
    footerText: { color: '#bbb', marginTop: '25px', fontSize: '0.85rem' },
    link: { color: '#fbc02d', textDecoration: 'none', fontWeight: 'bold' }
};

export default Register;