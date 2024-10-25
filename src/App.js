import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import LogoScreen from './components/logoScreen/LogoScreen';
import LoginScreen from './components/loginScreen/LoginScreen';
import MainScreen from './components/mainScreen/MainScreen';
import ChatScreen from './components/chatScreen/ChatScreen';
import CreateScreen from './components/createScreen/CreateScreen';
import FavoriteScreen from './components/favoriteScreen/FavoriteScreen';
import MypageScreen from './components/mypageScreen/MypageScreen';
import OnboardingScreen from './components/onboardingScreen/OnboardingScreen';
import OnboardingPwScreen from './components/onboardingPwScreen/OnboardingPwScreen';
import SearchScreen from './components/searchScreen/SearchScreen';


const App = () => {
    const [currentScreen, setCurrentScreen] = useState('logo'); 

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
                    <Route path="/favorite" element={<FavoriteScreen />} />
                    <Route path="/onboarding" element={<OnboardingScreen />} />
                    <Route path="/onboardingPw" element={<OnboardingPwScreen />} />
                    <Route path="/mypage" element={<MypageScreen />} />
                    <Route path="/search" element={<SearchScreen />} />
                    <Route path="*" element={<Navigate to="/" />} />

                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
