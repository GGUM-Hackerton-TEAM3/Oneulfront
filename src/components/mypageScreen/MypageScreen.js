import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Sidebar from '../sidebar/Sidebar';
import BellSidebar from '../sidebar/BellSidebar';
import './MypageScreen.css';

const MypageScreen = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isBellSidebarOpen, setIsBellSidebarOpen] = useState(false);
    const [profileImage, setProfileImage] = useState('/soccerking.png');
    const [tempProfileImage, setTempProfileImage] = useState('/soccerking.png'); 
    const [favoriteItems, setFavoriteItems] = useState([]); // 찜한 아이템 저장
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [buttonColor, setButtonColor] = useState('#C3C5CB'); 

    const handleRewrite = () => {
        setProfileImage(tempProfileImage); 
        setButtonColor('#1F241E'); 
        setTimeout(() => {
            setButtonColor('#C3C5CB');
        }, 2000); 
    };

    const handleLogout = () => {
        navigate('/logo');
    };

    const handleSearch = () => {
        console.log("Search initiated:", searchQuery);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); 
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false); 
    };

    const toggleBellSidebar = () => {
        setIsBellSidebarOpen(!isBellSidebarOpen); 
    };

    const closeBellSidebar = () => {
        setIsBellSidebarOpen(false); 
    };

    const handleProfileImageClick = () => {
        setTempProfileImage(prevImage => 
            prevImage === '/soccerking.png' ? '/bakeit.png' : '/soccerking.png'
        );
    };
    const handleHeartClick = (item) => {
        setFavoriteItems(prev => {
            const isFavorite = prev.includes(item.id);
            if (isFavorite) {
                return prev.filter(id => id !== item.id); 
            } else {
                return [...prev, item.id];
            }
        });
        navigate('/favorite'); 
    };
        const isItemFavorited = (id) => favoriteItems.includes(id); // 해당 아이템이 찜 목록에 있는지 확


    return (
        <div className="create-screenm">
            <div className="scroll-container">    
            <header className="icon-bar">
                <button className="icon-img" onClick={toggleSidebar}>
                    <img src="/menu.png" alt="메뉴" />
                </button>
                <button className="icon-img">
                    <img src="/heart.png" alt="하트" onClick={handleHeartClick} />
                </button>
                <div className="main-search-container">
                    <input
                        type="text1"
                        className="search-input"
                        placeholder=""
                        value={searchQuery}
                        onClick={handleSearch}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="search-button" onClick={handleSearch}>
                        <img src="/search.png" alt="검색" />
                    </button>
                </div>
                <button className="icon-img" onClick={toggleBellSidebar}>
                    <img src="/bell.png" alt="벨" />
                </button>
            </header>

        
                <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
                <BellSidebar isOpen={isBellSidebarOpen} closeSidebar={closeBellSidebar} />

                <div className="layout1-mypage">
                    <h2>마이페이지에서 내 정보를 자유로이 수정할 수 있어요.</h2>
                </div>

                <div className="layout2m">
                    <div className="layout2m-left">
                        <img src={profileImage} alt="Profile" className="layout2m-image" /> 
                    </div>
                    <div className="layout2m-right">
                        <input
                            type="text"
                            value={userName} 
                            placeholder="유저네임"
                            className="layout2m-right-username"
                            readOnly 
                        />
                        <div className="icon-grid">
                            <button className="icon">아이콘 1</button>
                            <button className="icon">아이콘 2</button>
                        </div>
                        <input
                            type="text"
                            value={userDescription} 
                            placeholder="사용자 설명"
                            className="layout2m-right-description"
                            readOnly
                        />
                    </div>
                </div>

                <div className="mypage-layout3">
                    <div className="mypage-layout3-left">
                        <h3>닉네임 </h3>
                        <input
                            type="text"
                            className="mypage-layout3-input"
                        />
                    </div>
                    <div className="mypage-layout3-right">
                        <h3>상태메시지 </h3>
                        <input
                            type="text"
                            className="mypage-layout3-input"
                        />
                    </div>
                </div>

                <div className="mypage-layout4">
                    <div className="mypage-layout4-top">
                        <h3>프로필사진</h3>
                    </div>
                    <div className="mypage-layout4-bottom">
                        <button onClick={handleProfileImageClick}>
                            <img src={tempProfileImage} alt="Profile" className="mypage-layout4-image" />
                        </button>
                    </div>
                    <div>
                        <button onClick={handleRewrite} className="rewrite-button" style={{ backgroundColor: buttonColor }}>수정 완료하기</button>
                    </div>    
                </div>

                <div className="mypage-layout-buttons">
                    <button className="mypage-button">회원탈퇴</button>
                    <button className="mypage-button" onClick={handleLogout}>로그아웃</button>
                </div>
            </div>
        </div>
    );
}

export default MypageScreen;