// LogoScreen.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoScreen.css';

const LogoScreen = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };


    return (

        <button2 className="logo-screen" onClick={handleLogin}>
                                    <img src="/logo.png" alt="logo" />
                                </button2>
    );
};

export default LogoScreen;
