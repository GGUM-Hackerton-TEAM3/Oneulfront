import React, { useState } from 'react';
import Sidebar from '../mainScreen/Sidebar'; 
import './CreateScreen.css';

const CreateScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSearch = () => {
        console.log("Search initiated:", searchQuery);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); 
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false); 
    };

    
    const icons = [
        '아이콘 1', '아이콘 2', '아이콘 3', '아이콘 4',
        '아이콘 5', '아이콘 6', '아이콘 7', '아이콘 8'
    ];
    return (
        <div className="create-screen">
           <div className="scroll-container">
            <header className="icon-bar">
                <button className="icon-img" onClick={toggleSidebar}>
                    <img src="/menu.png" alt="메뉴" />
                </button>
                <button className="icon-img">
                    <img src="/heart.png" alt="하트" />
                </button>
                <div className="search-container">
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
                <button className="icon-img">
                    <img src="/bell.png" alt="벨" />
                </button>
            </header>

            <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />

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
                    <h3>축구왕헤르</h3>
                    <div className="icon-grid">
                        <button className="icon">아이콘 1</button>
                        <button className="icon">아이콘 2</button>
                    </div>
                    <p>축구가 좋아요!</p>
                </div>
            </div>



        <div className="layout3">
                <div className="layout3-double-set">
                    {/* 모임이름, 모임설명*/}
                    <div className="layout3-text-icons-group">
                        <div className="layout3-text">
                            <p>모임이름</p>
                        </div>
                        <div className="layout3-icons">
                            <button className="icon">뻥뻥축구슛</button>
                        </div>
                    </div>
                    {/* 오른쪽 텍스트와 아이콘 */}
                    <div className="layout3-text-icons-group">
                        <div className="layout3-text">
                            <p>모임 설명</p>
                        </div>
                        <div className="layout3-icons">
                            <button className="icon wide">역곡 축구장</button>
                        </div>
                    </div>
                </div>


                     {/* 모임일시*/}                   
                    <div className="layout3-text-icons-group">
                        <div className="layout3-text">
                            <p>모임일시</p>
                        </div>
                        <div className="layout3-icons">
                            <button className="icon">11월 29일</button>
                        </div>
                    </div>



                    {/* 카테고리 선택*/}
                    <div className="frame">
                    <div className="layout3-text">
                            <p>카테고리 선택</p>
                        </div>
                    <div className="scrollable-list1">
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
            </div>



                    {/* 모임 설명 입력(2개)*/}
              <div className="layout3-double-set-2">
                    <div className="layout3-text-icons-group">
                        <div className="layout3-text">
                            <p>모임 설명입력</p>
                        </div>
                        <div className="layout3-icons">
                            <button className="icon"> 축구</button>
                            <button className="icon"> 20대남</button>

                        </div>
                    </div>
                    </div>
                


                    <div className="layout3-image">
                <div className="layout3-left">
                    <img src="/soccer.png" alt="soccer" className="layout3-image" />
                </div>
                <div className="layout3-right">
                    <p> 좌측 원을 터치하여 모임 사진을 고를 수 있습니다</p>
                </div>
            </div>

                
                
                <button className="long-button">모임만들기</button>
            </div>
</div>
</div>
    )}
export default CreateScreen;
