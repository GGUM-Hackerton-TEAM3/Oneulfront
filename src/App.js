import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'; 
import LogoScreen from './components/logoScreen/LogoScreen';
import LoginScreen from './components/loginScreen/LoginScreen';
import MainScreen from './components/mainScreen/MainScreen';
import ChatScreen from './components/chatScreen/ChatScreen';
import CreateScreen from './components/createScreen/CreateScreen';

const App = () => {
    const [currentScreen, setCurrentScreen] = useState('logo'); // 초기 상태를 로고로 설정

    useEffect(() => {
        if (currentScreen === 'logo') {
            const timer = setTimeout(() => {
                setCurrentScreen('login'); 
            }, 3000); 
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
                    <Route path="/main" element={currentScreen === 'main' ? <MainScreen setCurrentScreen={setCurrentScreen} /> : <Navigate to="/login" />} />
                    <Route path="/chat" element={currentScreen === 'chat' ? <ChatScreen /> : <Navigate to="/main" />} />
                    <Route path="/create" element={<CreateScreen />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
