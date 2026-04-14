import React, { useState, useEffect } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [transfer, setTransfer] = useState({ toAccount: '', amount: '' });
    const [balance, setBalance] = useState(null);
    const [showBalance, setShowBalance] = useState(false);
    
    // Fallback logic: If localStorage is empty, show 'User' instead of 'UNDEFINED'
    const [userData, setUserData] = useState({
        username: localStorage.getItem('username') || 'User',
        accountNumber: localStorage.getItem('accountNumber') || 'Pending...'
    });

    // Sync state with localStorage on mount (prevents the 'UNDEFINED' flash)
    useEffect(() => {
        const storedUser = localStorage.getItem('username');
        const storedAcc = localStorage.getItem('accountNumber');
        if (storedUser && storedAcc) {
            setUserData({ username: storedUser, accountNumber: storedAcc });
        }
    }, []);

    const getMyBalance = async () => {
        try {
            const response = await API.get(`/accounts/${userData.accountNumber}/balance`);
            setBalance(response.data);
            setShowBalance(true);
        } catch (err) {
            alert("⚠️ " + (err.response?.data || "Error fetching balance"));
            // If the error is 401, the token expired
            if (err.response?.status === 401) {
                localStorage.clear();
                navigate('/');
            }
        }
    };

    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
            await API.post('/accounts/transfer', {
                fromAccount: userData.accountNumber,
                toAccount: transfer.toAccount,
                amount: transfer.amount
            });
            alert("✨ Transfer Successful!");
            setTransfer({ toAccount: '', amount: '' });
            setShowBalance(false); 
        } catch (err) {
            alert("❌ " + (err.response?.data || "Transfer failed"));
        }
    };

    return (
        <div style={styles.pageBackground}>
            <div style={styles.container}>
                {/* Header Section */}
                <div style={styles.header}>
                    <h2 style={styles.welcomeText}>
                        Welcome back, <span style={styles.userHighlight}>{userData.username}</span>
                    </h2>
                    <button 
                        onClick={() => { localStorage.clear(); navigate('/'); }} 
                        style={styles.logoutBtn}
                    >
                        Logout
                    </button>
                </div>
                
                {/* Premium Black & Yellow Balance Card */}
                <div style={styles.card}>
                    <div style={styles.cardOverlay}>
                        <p style={styles.label}>GOLD PREMIER ACCOUNT</p>
                        <h3 style={styles.accNumber}>{userData.accountNumber}</h3>
                        
                        <div style={styles.balanceContainer}>
                            {showBalance ? (
                                <div style={{animation: 'fadeIn 0.5s'}}>
                                    <p style={styles.balanceLabel}>Current Balance</p>
                                    <h1 style={styles.balanceAmount}>${balance}</h1>
                                    <button onClick={() => setShowBalance(false)} style={styles.hideBtn}>Hide Balance</button>
                                </div>
                            ) : (
                                <button onClick={getMyBalance} style={styles.showBalanceBtn}>
                                    Reveal Balance
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Transfer Section */}
                <div style={styles.transferSection}>
                    <h3 style={styles.sectionTitle}>Secure Money Transfer</h3>
                    <form onSubmit={handleTransfer}>
                        <div style={styles.inputGroup}>
                            <input 
                                type="text" placeholder="Recipient Account Number" required 
                                style={styles.input}
                                value={transfer.toAccount}
                                onChange={(e) => setTransfer({...transfer, toAccount: e.target.value})} 
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <input 
                                type="number" placeholder="Amount ($)" required 
                                style={styles.input}
                                value={transfer.amount}
                                onChange={(e) => setTransfer({...transfer, amount: e.target.value})} 
                            />
                        </div>
                        <button type="submit" style={styles.transferBtn}>Transfer Now</button>
                    </form>
                </div>
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
        maxWidth: '450px',
        backgroundColor: '#1e1e1e',
        padding: '30px',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        border: '1px solid #333'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px'
    },
    welcomeText: { fontSize: '1rem', color: '#bbb', margin: 0, fontWeight: '400' },
    userHighlight: { color: '#fbc02d', fontWeight: '700', textTransform: 'uppercase' },
    logoutBtn: { 
        color: '#888', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' 
    },
    card: {
        background: 'linear-gradient(135deg, #fbc02d 0%, #f9a825 100%)',
        padding: '2px',
        borderRadius: '18px',
        marginBottom: '30px',
        boxShadow: '0 10px 20px rgba(251, 192, 45, 0.15)'
    },
    cardOverlay: {
        background: '#1a1a1a',
        padding: '25px',
        borderRadius: '16px',
        color: '#fbc02d',
    },
    label: { margin: 0, fontSize: '0.7rem', letterSpacing: '2px', opacity: 0.8 },
    accNumber: { margin: '8px 0 25px 0', fontSize: '1.2rem', color: '#fff', fontWeight: '300' },
    balanceLabel: { margin: 0, fontSize: '0.75rem', color: '#bbb' },
    balanceAmount: { margin: '5px 0', fontSize: '2.2rem', color: '#fbc02d', fontWeight: '700' },
    showBalanceBtn: {
        backgroundColor: '#fbc02d',
        color: '#000',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        transition: 'transform 0.2s',
    },
    hideBtn: { background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.8rem', marginTop: '10px' },
    transferSection: { padding: '5px' },
    sectionTitle: { color: '#fff', marginBottom: '20px', fontSize: '1rem', fontWeight: '500' },
    inputGroup: { marginBottom: '15px' },
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
    transferBtn: {
        width: '100%',
        padding: '15px',
        background: 'linear-gradient(to right, #fbc02d, #f9a825)',
        color: '#000',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '700',
        marginTop: '10px',
        transition: 'opacity 0.2s'
    }
};

export default Dashboard;