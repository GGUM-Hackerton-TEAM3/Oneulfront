import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { call } from "../../service/ApiService"; 
import Sidebar from '../sidebar/Sidebar';
import BellSidebar from '../sidebar/BellSidebar';
import './MainScreen.css';

const MainScreen = ({ setCurrentScreen }) => {
    const [searchQuery, setSearchQuery] = useState(''); // Define searchQuery state
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [isBellSidebarOpen, setIsBellSidebarOpen] = useState(false);
    const [favoriteItems, setFavoriteItems] = useState([]); 
    const [listItems, setListItems] = useState([]); // Define listItems state
    const navigate = useNavigate(); 
    const [selectedIcon, setSelectedIcon] = useState(null);

    const listItems2 = [
        {
            id: 1,
            image: '/bucheon.png', // 이미지 경로
            title: '부천시 명상해용',
            icons: ['자기계발', '영상'], 
            description: '모여서 명상해요'
        },
        {
            id: 2,
            image: '/bakeit.png', 
            title: '쿠키베이킷(Bake it)',
            icons: ['음식', '베이킹'], 
            description: '함께 구움과자를 구워요'
        },
        {
            id: 3,
            image: '/drawing.png', 
            title: '귀여운 드로ing해요',
            icons: ['공연/예술', '드로잉'], 
            description: '잉~똥손도 가능~'
        },
        {
            id: 4,
            image: '/cinema.png', 
            title: '씨네모아',
            icons: ['영화', '부천시'],
            description: '대관해서도 봐요!'
        },
        {
            id: 5,
            image: '/sport.png', 
            title: '룰루랄라풋볼 고고',
            icons: ['운동', '3040'],
            description: '뭐해 당장 일어나서 운동가야지'
        },
        {
            id: 1,
            image: '/bucheon.png', 
            title: '부천시 명상해용',
            icons: ['자기계발', '영상'], 
            description: '모여서 명상해요'
        },
        {
            id: 2,
            image: '/bakeit.png', 
            title: '쿠키베이킷(Bake it)',
            icons: ['음식', '베이킹'], 
            description: '함께 구움과자를 구워요'
        },
        {
            id: 3,
            image: '/drawing.png', 
            title: '귀여운 드로ing해요',
            icons: ['공연/예술', '드로잉'], 
            description: '잉~똥손도 가능~'
        },
        {
            id: 4,
            image: '/cinema.png', 
            title: '씨네모아',
            icons: ['영화', '부천시'],
            description: '대관해서도 봐요!'
        },
        {
            id: 5,
            image: '/sport.png', 
            title: '룰루랄라풋볼 고고',
            icons: ['운동', '3040'],
            description: '뭐해 당장 일어나서 운동가야지'
        }
    ];
    // Your existing listItems data
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
                setListItems(response); // Use setListItems to update state
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

    const openSidebar = () => { 
        setIsSidebarOpen(true); 
        setIsBellSidebarOpen(false); 
    };

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
                <button className="icon-img" onClick={openSidebar}>
                    <img src="/menu.png" alt="메뉴" />
                </button>
                <button className="icon-img" onClick={() => navigate('/favorite')}>
                    <img src="/heart.png" alt="찜한 목록" />
                </button>
                <div className="main-search-container">
                    <input
                        type="text"
                        className="search-input"
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
                {isBellSidebarOpen && (
                    <BellSidebar isOpen={isBellSidebarOpen} closeBellSidebar={closeBellSidebar} />
                )}
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
                {listItems2.map(item => (
                    <div className="list-item" key={item.id}>
                        <div className="image-container">
                            <img src={item.image} alt={`이미지 ${item.title}`} className="item-image" />
                        </div>
                        <div className="description-frame">
                            <div className="title">{item.title}</div>
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
        </div>
    );
};

export default MainScreen;
