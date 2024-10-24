import React from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, closeSidebar }) => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        closeSidebar();  
        navigate('/main');
    };
    
    const handleCreateClick = () => {
        navigate('/create');
        closeSidebar();  

    };



    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-1">
                <button  className= "sidebar-1-btn" onClick={closeSidebar}>닫기</button>
            </div>
            <div className="sidebar-2">
                <ul>
                <li> <button className="sidebar-2-btn" onClick={handleHomeClick}>홈</button>     </li>
                <li> <button className="sidebar-2-btn"  onClick={handleHomeClick}>마이페이지</button> </li>
                <li> <button className="sidebar-2-btn" onClick={handleCreateClick}>모임 만들기</button>   </li>
                </ul>
            </div>
        </div>
        
    );
};

export default Sidebar;
