import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { fetchItems, call } from "../../service/ApiService"; 
import Sidebar from '../sidebar/Sidebar';
import BellSidebar from '../sidebar/BellSidebar';
import './MainScreen.css';
import { fetchMeetingsByCategory } from '../../service/ApiService'; // Change or keep this line


const MainScreen = ({ setCurrentScreen }) => {
    const [listItems, setListItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [isBellSidebarOpen, setIsBellSidebarOpen] = useState(false);
    const [favoriteItems, setFavoriteItems] = useState([]); 
    const navigate = useNavigate(); 
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [isHeartSidebarOpen, setIsHeartSidebarOpen] = useState(false);


    const fetchMeetingsByCategory = async (categoryName) => {
        return call(`/api/categories/search/meetings?categoryName=${categoryName}`, "GET");
    };
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

    const handleIconClick = async (iconText) => {
        setSelectedIcon(iconText);
        const backendCategory = categoryMapping[iconText]; 
    
        console.log('선택한 카테고리:', backendCategory); // 디버깅
    
        if (backendCategory) {
            try {
                const response = await fetchMeetingsByCategory(backendCategory); // 전용 함수 사용
                setListItems(response); 
            } catch (error) {
                console.error("카테고리 데이터 가져오기 실패:", error);
            }
        } else {
            console.error("잘못된 카테고리:", iconText);
        }
    };
    
    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true);
    //         try {
    //             const data = await fetchItems(); 
    //             setListItems(data);
    //         } catch (error) {
    //             console.error("Failed to fetch data:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

    const handleSearch = () => {
        navigate(`/search?query=${searchQuery}`); 
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); 
    };

   

    const toggleBellSidebar = () => {
        setIsBellSidebarOpen(!isBellSidebarOpen); 
    };

    const openSidebar = () => setIsSidebarOpen(true);
    const closeSidebar = () => setIsSidebarOpen(false);
    
    const openBellSidebar = () => setIsBellSidebarOpen(true);
    const closeBellSidebar = () => setIsBellSidebarOpen(false);

    const handleHeartClick = (item) => {
        setFavoriteItems(prev => {
            const isFavorite = prev.includes(item.id);
            return isFavorite ? prev.filter(id => id !== item.id) : [...prev, item.id];
        });
        closeBellSidebar(); // BellSidebar를 닫음
        navigate('/favorite'); 
    };

    const isItemFavorited = (id) => favoriteItems.includes(id); 

    return (
        <div className="main-screen">
            
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
                <button className="icon-img" onClick={openBellSidebar}>
                    <img src="/bell.png" alt="벨" />
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
                <h2>이번주의 인기모임을 소개합니다!</h2>
            </div>

            <div className="scrollable-list">
                {listItems.map(item => (
                    <div className="list-item" key={item.id}>
                        <div className="image-container">
                            <img src={item.image} alt={`이미지 ${item.title}`} className="item-image" />
                        </div>
                        <div className="description-frame">
                            <div className="title">
                                {item.title}
                                <button className="heart-button" onClick={() => handleHeartClick(item)}>
                                    <img src="/heart.png" alt="찜하기" />
                                </button>
                            </div>
                            <div className="icon-row">
                                {item.icons.map((iconText, index) => (
                                    <button className="grid-icon" key={index}>{iconText}</button> 
                                ))}
                            </div>
                            <div className="description">{item.description}</div>
                        </div>
                    </div>
                ))}
            </div>
            {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />}
            {isBellSidebarOpen && (
                <BellSidebar
                    isOpen={isBellSidebarOpen}
                    closeBellSidebar={closeBellSidebar} // Ensure the correct function is passed
                />
            )}
        </div>
    );
};

export default MainScreen;
