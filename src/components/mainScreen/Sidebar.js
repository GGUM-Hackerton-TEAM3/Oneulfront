import React from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, closeSidebar }) => {
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
    const handleMypage = () => {
        closeSidebar();
        navigate('/mypage');
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-1">
                <button  className= "sidebar-1-btn" onClick={closeSidebar}>닫기</button>
            </div>
            <div className="sidebar-2">
                <ul>
                <li> <button className="sidebar-2-btn" onClick={handleLogin}> 홈 </button>     </li>
                <li> <button className="sidebar-2-btn" onClick={handleMypage}>마이페이지</button> </li>
                <li> <button className="sidebar-2-btn" onClick={handleCreateClick}>모임 만들기</button>   </li>
                <li> <button className="sidebar-2-btn" onClick={handleLogout}>로그아웃</button> </li>

                </ul>
            </div>
        </div>
        
    );
};

export default Sidebar;