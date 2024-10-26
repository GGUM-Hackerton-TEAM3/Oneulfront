import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BellSidebar from '../sidebar/BellSidebar';
import { fetchItems, call } from "../../service/ApiService"; 
import './GroupDetailScreen.css'; // CSS 파일 임포트

const GroupDetailScreen = () => {
  const [location, setLocation] = useState(''); // 장소 상태
  const [activeButton, setActiveButton] = useState('home'); // 활성 버튼 상태
  const [isHeartActive, setIsHeartActive] = useState(false); // 하트 상태
  const [listItems, setListItems] = useState([]); // 목록 아이템 상태
  const [isBellSidebarOpen, setIsBellSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // 검색 쿼리 상태
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 열기 상태
  const [favoriteItems, setFavoriteItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedIcon, setSelectedIcon] = useState(null);

  
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  
  const openBellSidebar = () => setIsBellSidebarOpen(true);
  const closeBellSidebar = () => setIsBellSidebarOpen(false);
  // 모임 장소 데이터 요청
  const fetchLocation = async () => {
    try {
      const response = await fetch('/api/meeting-location'); // API 호출
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setLocation(data.location); // 데이터 삽입
    } catch (error) {
      console.error('Error fetching location:', error);
      setLocation('장소 정보 불러오기 실패');
    }
  };

  // 백엔드에서 데이터를 가져오는 함수
  useEffect(() => {
    fetchLocation();

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

  const handleButtonClick = (content) => {
    setActiveButton(content); // 활성 버튼 업데이트
  };

  const toggleHeart = () => {
    setIsHeartActive(prev => !prev); // 하트 상태 토글
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = () => {
    navigate(`/search?query=${searchQuery}`);
  };
  const handleHeartClick = (item) => {
    setFavoriteItems(prev => {
        const isFavorite = prev.includes(item.id);
        return isFavorite ? prev.filter(id => id !== item.id) : [...prev, item.id];
    });
    navigate('/favorite'); 
};
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

  return (
    <div className="scrollable-list">
    <div>
         <header className="icon-bar">
              <button className="icon-img" onClick={openSidebar}>
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

      {isSidebarOpen && (
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-1">
            <button className="sidebar-1-btn" onClick={() => setIsSidebarOpen(false)}>닫기</button>
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

      <div className="navigation">
        <button
          className={`nav-btn ${activeButton === 'home' ? 'active' : ''}`}
          onClick={() => handleButtonClick('home')}
        >
          홈
        </button>
        <button
          className={`nav-btn ${activeButton === 'board' ? 'active' : ''}`}
          onClick={() => handleButtonClick('board')}
        >
          게시판
        </button>
        <button
          className={`nav-btn ${activeButton === 'members' ? 'active' : ''}`}
          onClick={() => handleButtonClick('members')}
        >
          멤버
        </button>
      </div>

      <div className="message22" id="message">
        <img
          src= "/drawing.png"
          alt="멍충거위"
          width="50%"
        />
        <p>'멍충거위'의 모임,</p>
        <p>귀여운 드로잉해요.</p>
        <button className="option">24살</button>
        <button className="option">남자</button>
        <button className="option">바메솦</button>
        <p className="comment">잉~ 똥손도 가능~</p>

        <div className="map-container">
          <div className="location-info" id="location-info">
            <p><span id="location">{location}</span></p>
          </div>
        </div>

        <button className="outer-btn">
          <span
            className="heart-icon"
            id="heart-icon"
            onClick={toggleHeart}
          >
            {isHeartActive ? '♥' : '♡'} {/* 하트 모양 */}
          </span>
          <span className="status-text">현재 3/7명, 10월 28일</span>
          <a href="#" className="inner-btn">참여하기</a>
        </button>

        <div className="containers">
          <span className="group-tag">모임 관련 태그</span>
          <div className="rounded-rectangle">#드로잉</div>
          <div className="rounded-rectangle">#부천시</div>
        </div>
      </div>
    </div></div>
  );
};

export default GroupDetailScreen;
