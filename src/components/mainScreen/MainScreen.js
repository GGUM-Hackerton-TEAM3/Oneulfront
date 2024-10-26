import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { call } from "../../service/ApiService"; 
import Sidebar from '../sidebar/Sidebar';
import BellSidebar from '../sidebar/BellSidebar';
import './MainScreen.css';

const MainScreen = ({ setCurrentScreen }) => {
    const [listItems, setListItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [isBellSidebarOpen, setIsBellSidebarOpen] = useState(false);
    const [favoriteItems, setFavoriteItems] = useState([]); 
    const navigate = useNavigate(); 
    const [selectedIcon, setSelectedIcon] = useState(null);

    const categoryMapping = {
        '영화': 'Movie',
        '공연/예술': 'Performance/Art',
        '운동': 'Exercise',
        '음식': 'Food',
        '자기계발': 'Self-Development',
        '사진/영상': 'Photography/Video',
        '책/글': 'Book/Writing',
        '게임/오락': 'Game/Entertainment'
    };

    const fetchMeetingsByCategory = async (categoryName) => {
        return call(`/api/categories/search/meetings?categoryName=${categoryName}`, 'GET');
    };

    const fetchMeetingsByKeyword = async (keyword) => {
        return call(`/api/meetings/search?keyword=${keyword}`, 'GET');
    };

    const handleIconClick = async (iconText) => {
        setSelectedIcon(iconText);
        const backendCategory = categoryMapping[iconText];
        try {
            if (backendCategory) {
                const response = await fetchMeetingsByCategory(backendCategory);
                setListItems(response);
            } else {
                console.error("Invalid category:", iconText);
            }
        } catch (error) {
            console.error("Failed to fetch category data:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchMeetingsByCategory('all'); 
                setListItems(data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            const data = await fetchMeetingsByCategory('all');
            setListItems(data);
        } else {
            try {
                const response = await fetchMeetingsByKeyword(searchQuery);
                setListItems(response);
            } catch (error) {
                console.error("검색 실패:", error);
            }
        }
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);
    const toggleBellSidebar = () => setIsBellSidebarOpen(!isBellSidebarOpen);
    const closeBellSidebar = () => setIsBellSidebarOpen(false);

    const handleHeartClick = (item) => {
        setFavoriteItems(prev => {
            const isFavorite = prev.includes(item.id);
            return isFavorite ? prev.filter(id => id !== item.id) : [...prev, item.id];
        });
        navigate('/favorite'); 
    };

    const isItemFavorited = (id) => favoriteItems.includes(id); 

    return (
        <div className="main-screen">
            <header className="icon-bar">
                <button className="icon-img" onClick={toggleSidebar}>
                    <img src="/menu.png" alt="메뉴" />
                </button>
                <button className="icon-img" onClick={() => navigate('/favorite')}>
                    <img src="/heart.png" alt="찜한 목록" />
                </button>
                <div className="main-search-container">
                    <input
                        type="text1"
                        className="search-input"
                        placeholder="검색어를 입력하세요"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="search-button" onClick={handleSearch}>
                        <img src="/search.png" alt="검색" />
                    </button>
                </div>
                <button className="icon-img" onClick={toggleBellSidebar}>
                    <img src="/bell.png" alt="알림" />
                </button>
            </header>

            <div className="frame">
                <div className="icon-grid">
                    {Object.keys(categoryMapping).map((iconText, index) => (
                        <button
                            key={index}
                            className="icon"
                            onClick={() => handleIconClick(iconText)}
                            style={{
                                backgroundColor: selectedIcon === iconText ? '#93C296' : 'transparent',
                                color: selectedIcon === iconText ? 'white' : 'black'
                            }} 
                        >
                            {iconText}
                        </button>
                    ))}
                </div>
            </div>

            <div className="layout-section-main">
                <h2>이번 주의 인기 모임을 소개합니다!</h2>
            </div>

            <div className="scrollable-list">
                {listItems.map(item => (
                    <div className="list-item" key={item.id}>
                        <div className="image-container">
                            <img src={item.image || "/default-image.png"} alt={`이미지 ${item.title}`} className="item-image" />
                        </div>
                        <div className="description-frame">
                            <div className="title">
                                {item.title}
                                <button className="heart-button" onClick={() => handleHeartClick(item)}>
                                    <img src={isItemFavorited(item.id) ? "/heart-filled.png" : "/heart.png"} alt="찜하기" />
                                </button>
                            </div>
                            <div className="icon-row">
                                {item.hashtags && item.hashtags.map((hashtag, index) => (
                                    <button className="grid-icon" key={index}>{hashtag}</button> 
                                ))}
                            </div>
                            <div className="description">{item.description}</div>
                        </div>
                    </div>
                ))}
            </div>
            {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />}
            {isBellSidebarOpen && <BellSidebar isOpen={isBellSidebarOpen} closeBellSidebar={closeBellSidebar} />}
        </div>
    );
};

export default MainScreen;
