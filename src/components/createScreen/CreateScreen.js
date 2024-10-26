import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Sidebar from '../sidebar/Sidebar';
import BellSidebar from '../sidebar/BellSidebar';

import './CreateScreen.css';

const CreateScreen = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isBellSidebarOpen, setIsBellSidebarOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [favoriteItems, setFavoriteItems] = useState([]); // 찜한 아이템 저장
    const [meetingName, setMeetingName] = useState('');
    const [meetingDescription, setMeetingDescription] = useState('');
    const [meetingDate, setMeetingDate] = useState('');
    const [categoryInput1, setCategoryInput1] = useState('');
    const [tempProfileImage, setTempProfileImage] = useState('/soccerking.png'); 
    const [categoryInput2, setCategoryInput2] = useState('');

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');

    const [buttonColor, setButtonColor] = useState('#C3C5CB'); 

    const handleSearch = () => {
        console.log("Search initiated:", searchQuery);
    };

    const handleLogin = () => {
        setButtonColor('#1F241E'); 
        setTimeout(() => {
            navigate('/main');
        }, 2000); // Delay of 2 seconds
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


    const handleCategoryClick = (category) => {
        setSelectedCategories((prevSelected) => {
            if (prevSelected.includes(category)) {
                return prevSelected.filter((item) => item !== category);
            } else {
                return [...prevSelected, category];
            }
        });
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

    const handleProfileImageClick = () => {
        setTempProfileImage(prevImage => 
            prevImage === '/soccerking.png' ? '/bakeit.png' : '/soccerking.png'
        );
    };
     useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://your-api-url-to-fetch-user-data'); // Replace with your API URL
                const data = await response.json();
                setUserName(data.username); // Adjust according to your API response structure
                setUserDescription(data.description); // Adjust according to your API response structure
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const isItemFavorited = (id) => favoriteItems.includes(id); // 해당 아이템이 찜 목록에 있는지 확


    return (
        <div className="create-screen">
           <div className="scroll-container">
           <header className="icon-bar">
                <button className="icon-img" onClick={toggleSidebar}>
                    <img src="/menu.png" alt="메뉴" />
                </button>
                <button className="icon-img" onClick={handleHeartClick}>
                    <img src="/heart.png" alt="하트" />
                </button>
                <div className="main-search-container">
                    <input
                        type="text1"
                        className="search-input"
                        placeholder=""
                        value={searchQuery}
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

            {/* First Layout */}
            <div className="layout1">
                <h2>어떤 모임을 만들고 싶으신가요?</h2>
            </div>

            {/* Second Layout */}
            <div className="layout2">
                <div className="layout2-left">
                    <img src="/soccerking.png" alt="Example" className="layout2-image" />
                </div>
                <div className="layout2-right">
                    <input
                        type="text"
                        value={userName} 
                        placeholder="유저네임"
                        className="layout2-right-username"
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
                        className="layout2-right-description"
                        readOnly
                    />
                </div>
        </div>


            <div className="layout3">
                <div className="layout3-double-set">
                    <div className="layout3-text-icons-group">
                        <div className="layout3-text">
                            <p>모임이름</p>
                        </div>
                        <div className="layout3-icons">
                            <input
                                type="text"
                                value={meetingName}
                                onChange={(e) => setMeetingName(e.target.value)}
                                className="meeting-name-input"
                            />
                        </div>
                    </div>
                    <div className="layout3-text-icons-group">
                        <div className="layout3-text">
                            <p>모임 설명</p>
                        </div>
                        <div className="layout3-icons">
                            <input
                                type="text"
                                value={meetingDescription}
                                onChange={(e) => setMeetingDescription(e.target.value)}
                                className="meeting-description-input"
                            />
                        </div>
                    </div>
                </div>

             <div className="layout3-text-icons-group">
                    <div className="layout3-text">
                        <p>모임일시</p>
                    </div>
                    <div className="layout3-icons">
                        <input
                            type="text"
                            value={meetingDate}
                            onChange={(e) => setMeetingDate(e.target.value)}
                            className="meeting-date-input"
                        />
                    </div>
                </div>


              <div className="frame">
                    <div className="layout3-text">
                        <p>카테고리 선택</p>
                    </div>
                    <div className="scrollable-list1">
                        <div className="icon-grid">
                            {["영화", "공연/예술", "운동", "사진/영상", "음식", "게임/오락", "자기계발", "책/글"].map((category) => (
                                <button
                                    key={category}
                                    className={`icon ${selectedCategories.includes(category) ? "selected" : ""}`}
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="layout3-double-set-3">
                    <div className="layout3-text-icons-group">
                        <div className="layout3-text">
                            <p>모임 설명 입력</p>
                        </div>
                        <div className="category-input-container">
                            <input
                                type="text"
                                value={categoryInput1}
                                onChange={(e) => setCategoryInput1(e.target.value)}
                                className="category-input"
                            />
                            <input
                                type="text"
                                value={categoryInput2}
                                onChange={(e) => setCategoryInput2(e.target.value)}
                                className="category-input"
                            />
                        </div>
                    </div>
                </div>

                <div className="layout3-image">
                    <div className="layout3-left">
                    <button onClick={handleProfileImageClick}>
                            <img src={tempProfileImage} alt="soccer" className="layout3-image" />
                    </button>                    
        </div>
                    <div className="layout3-right">
                        <p>좌측 원을 터치하여 <br />모임 사진을 고를 수 있습니다</p>
                    </div>
                </div>

                <button onClick={handleLogin} className="create-button"   style={{ backgroundColor: buttonColor }}>모임 만들기</button>
            </div>
           </div>
        </div>
    );
}


export default CreateScreen; 
