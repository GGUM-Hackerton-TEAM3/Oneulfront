import React, { useState } from 'react';
import './MainScreen.css';

const MainScreen = () => {
    // 목록 아이템 데이터
    const listItems = [
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
        }
    ];

    // 검색어 상태 정의
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        console.log("Search initiated:", searchQuery); // 검색어 출력
        // 검색 동작 추가 가능
    };
    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="main-screen">
            <header className="icon-bar">
                <button className="icon-img">
                    <img src="/menu.png" alt="메뉴" />
                </button>
                <button className="icon-img">
                    <img src="/heart.png" alt="하트" />
                </button>
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder=""
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="search-button" onClick={handleSearch}>
                        <img src="/search.png" alt="검색" />
                    </button>
                </div>
                <button className="icon-img">
                    <img src="/bell.png" alt="벨" />
                </button>
            </header>

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

            <div className="layout-section">
                <h2>이번주의 인기모임을 소개합니다!</h2>
            </div>

    <div className="scrollable-list">
             {listItems.map(item => (
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

        </div>
    );
};

export default MainScreen;
