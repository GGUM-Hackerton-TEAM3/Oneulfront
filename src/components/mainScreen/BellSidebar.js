import React from 'react';
import './BellSidebar.css';
import { useNavigate } from 'react-router-dom';

const BellSidebar = ({ isOpen, closeSidebar }) => {
    const navigate = useNavigate();

    const handleCreateClick = () => {
        closeSidebar();  
        navigate('/create');
    };

    const handleLogin = () => {
        closeSidebar();
        navigate('/login');
    };

    const handleLogout = () => {
        closeSidebar();
        navigate('/logo');
    };

    return (
        <div className={`bell-sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div className="bell-sidebar-header">
                <button className="bell-sidebar-close-btn" onClick={closeSidebar}>닫기</button>
            </div>
            <div className="bell-sidebar-content">
                <ul className="bell-sidebar-menu">
                    <li><button className="bell-sidebar-menu-item" onClick={handleLogin}>홈</button></li>
                    <li><button className="bell-sidebar-menu-item" onClick={handleLogin}>마이페이지</button></li>
                    <li><button className="bell-sidebar-menu-item" onClick={handleCreateClick}>모임 만들기</button></li>
                    <li><button className="bell-sidebar-menu-item" onClick={handleLogout}>로그아웃</button></li>
                </ul>
            </div>
        </div>
    );
};

export default BellSidebar;
