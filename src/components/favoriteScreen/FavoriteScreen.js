import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import './FavoriteScreen.css';
import Sidebar from '../mainScreen/Sidebar';
import BellSidebar from '../mainScreen/BellSidebar';

const MainScreen = () => {
    const [listItems, setListItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
    const [loading, setLoading] = useState(true); 
    const [isBellSidebarOpen, setIsBellSidebarOpen] = useState(false);
    const [favoriteItems, setFavoriteItems] = useState([]); 
    const [selectedIcons, setSelectedIcons] = useState([]); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://codi.page/your-endpoint'); 
                setListItems(response.data);
                setLoading(false);
            } catch (error) {
                console.error("데이터를 가져오는데 실패했습니다:", error);
                setLoading(false); 
            }
        };

        fetchData();
    }, []);

    const handleSearch = () => {
        navigate(`/search?query=${searchQuery}`); 
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); 
    };
    
    const toggleBellSidebar = () => {
        setIsBellSidebarOpen(!isBellSidebarOpen); 
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false); 
    };
    
    const closeBellSidebar = () => {
        setIsBellSidebarOpen(false); 
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

    const isItemFavorited = (id) => favoriteItems.includes(id); 

    const handleIconClick = (icon) => {
        setSelectedIcons((prev) => {
            if (prev.includes(icon)) {
                return prev.filter((i) => i !== icon); 
            } else {
                return [...prev, icon]; 
            }
        });
    };

    return (
        <div className="main-screen">
              <header className="icon-bar">
                <button className="icon-img" onClick={toggleSidebar}>
                    <img src="/menu.png" alt="메뉴" />
                </button>
                <button className="icon-img">
                    <img src="/greenheart.png" alt="하트" onClick={handleHeartClick} />
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
            
            <div className="layout-section-favorite">
                <h2>찜한 모임의 목록을 모아볼 수 있어요</h2>
            </div>

            <div className="frame">
                <div className="icon-grid">
                    {['영화', '공연/예술', '운동', '사진/영상', '음식', '게임/오락', '자기계발', '책/글'].map((icon) => (
                        <button 
                            key={icon} 
                            className={`icon ${selectedIcons.includes(icon) ? 'selected' : ''}`} 
                            onClick={() => handleIconClick(icon)}
                        >
                            {icon}
                        </button>
                    ))}
                </div>
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
        </div>
    );
};

export default MainScreen;
