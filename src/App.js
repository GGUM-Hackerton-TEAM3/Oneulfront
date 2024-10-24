import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'; 
import LogoScreen from './components/logoScreen/LogoScreen';
import LoginScreen from './components/loginScreen/LoginScreen';
import MainScreen from './components/mainScreen/MainScreen';
import ChatScreen from './components/chatScreen/ChatScreen';


const App = () => {
    const [currentScreen, setCurrentScreen] = useState('logo'); //초기상태를 로고로 함.


    useEffect(() => {
        if (currentScreen === 'logo') {
            const timer = setTimeout(() => {
                setCurrentScreen('login'); 
            }, 5000); 
            return () => clearTimeout(timer);
        }
    }, [currentScreen]);


    const handleLogin = () => {
        setCurrentScreen('main'); 
    };
   

    return (
        <BrowserRouter> 
            <div>
                <Routes>
                    <Route path="/" element={currentScreen === 'logo' ? <LogoScreen /> : <Navigate to="/login" />} />
                    <Route path="/login" element={currentScreen === 'login' ? <LoginScreen onLogin={handleLogin} /> : <Navigate to="/main" />} />
                    <Route path="/main" element={currentScreen === 'main' ? <MainScreen /> : <Navigate to="/login" />} />
                    <Route path="/chat" element={currentScreen === 'chat' ? <ChatScreen /> : <Navigate to="/login" />} />
                    <Route path="*" element={<Navigate to="/" />} /> {/* 모든 경로에 대해 리다이렉트 */}
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
