import React, { useEffect } from 'react';
import './LogoScreen.css';
import { useNavigate } from 'react-router-dom';

const LogoScreen = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login'); // Redirect to login screen after 3 seconds
        }, 3000);

        return () => clearTimeout(timer); // Clean up the timer if the component unmounts
    }, [navigate]);

    return (
        <div className="logo-screen">
            <img src="/logo.png" alt="Logo" />
        </div>
    );
};

export default LogoScreen;

