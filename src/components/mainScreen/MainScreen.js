import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import './MainScreen.css';


const MainScreen = ({ setCurrentScreen }) => {
    const [listItems, setListItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [isBellSidebarOpen, setIsBellSidebarOpen] = useState(false);
    const [favoriteItems, setFavoriteItems] = useState([]); // 찜한 아이템 저장
    const navigate = useNavigate(); 

    // 백엔드에서 데이터를 가져오는 함수
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://codi.page/your-endpoint'); // 변경 필요
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
    const closeSidebar = () => {
        setIsSidebarOpen(false); 
    };

    const toggleBellSidebar = () => {
        setIsBellSidebarOpen(!isBellSidebarOpen); 
    };
    const closeBellSidebar = () => {
        setIsBellSidebarOpen(false); 
    };


   

     // 이미 찜한 경우에는 삭제, 아닌 경우에는 추가
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
                <button className="icon-img" onClick={toggleBellSidebar}>
                    <img src="/bell.png" alt="벨" />
                </button>
            </header>



            {isSidebarOpen && (
                <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                    <div className="sidebar-1">
                        <button className="sidebar-1-btn" onClick={closeSidebar}>닫기</button>
                    </div>
                    <div className="sidebar-2">
                        <ul>
                            <li><button className="sidebar-2-btn" onClick={() => navigate('/main')}>홈</button></li>
                            <li><button className="sidebar-2-btn" onClick={() => navigate('/mypage')}>마이페이지</button></li>
                            <li><button className="sidebar-2-btn" onClick={() => navigate('/create')}>모임 만들기</button></li>
                            <li><button className="sidebar-2-btn" onClick={() => navigate('/login')}>로그아웃</button></li>
                        </ul>
                    </div>
                </div>
            )}

            {isBellSidebarOpen && (
                            <div className={`bellsidebar ${isBellSidebarOpen ? 'open' : ''}`}>
                                <div className="bellsidebar-1">
                                    <button className="bellsidebar-1-btn" onClick={closeBellSidebar}>닫기</button>
                                </div>
                                <div className="bellsidebar-2">
                                    <ul>
                                        <li><button className="bellsidebar-2-btn" onClick={() => navigate('/main')}>홈</button></li>
                                        <li><button className="bellsidebar-2-btn" onClick={() => navigate('/mypage')}>마이페이지</button></li>
                                        <li><button className="bellsidebar-2-btn" onClick={() => navigate('/create')}>모임 만들기</button></li>
                                        <li><button className="bellsidebar-2-btn" onClick={() => navigate('/login')}>로그아웃</button></li>
                                    </ul>
                                </div>
                            </div>
                        )}


            <div className="frame">
                <div className="icon-grid">
                    <button className="icon">영화</button>
                    <button className="icon">공연/예술</button>
                    <button className="icon">운동</button>
                    <button className="icon">사진/영상</button>
                    <button className="icon">음식</button>
                    <button className="icon">게임/오락</button>
                    <button className="icon">자기계발</button>
                    <button className="icon">책/글</button>
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
        </div>
    );
};

export default MainScreen;
