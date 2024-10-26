import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'; 
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
import GroupDetailScreen from './components/groupDetailScreen/GroupDetailScreen';

const App = () => {
    return (
        <BrowserRouter> 
            <div>
                <Routes>
                    <Route path="/" element={<LogoScreen />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/main" element={<MainScreen />} />
                    <Route path="/chat" element={<ChatScreen />} />
                    <Route path="/create" element={<CreateScreen />} />
                    <Route path="/favorite" element={<FavoriteScreen />} />
                    <Route path="/onboarding" element={<OnboardingScreen />} />
                    <Route path="/onboardingPw" element={<OnboardingPwScreen />} />
                    <Route path="/groupDetail" element={<GroupDetailScreen />} />
                    <Route path="/mypage" element={<MypageScreen />} />
                    <Route path="/search" element={<SearchScreen />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
