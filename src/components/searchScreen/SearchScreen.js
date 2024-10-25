import React, { useState } from 'react';
import './SearchScreen.css'; 
import { useNavigate } from 'react-router-dom';
import Sidebar from '../mainScreen/Sidebar';

const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const [selectedSchedule, setSelectedSchedule] = useState('');
    const [results, setResults] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isBellSidebarOpen, setIsBellSidebarOpen] = useState(false);
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (query.trim()) {
            const searchResults = [
                `결과 1: ${query}`,
                `결과 2: ${query}`,
                `결과 3: ${query}`,
            ];
            setResults(searchResults);
            navigate('/search');
        } else {
            setResults(['검색어를 입력하세요.']);
        }
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

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleTopicClick = (topic) => {
        setSelectedTopic(topic);
    };

    const handleScheduleClick = (schedule) => {
        setSelectedSchedule(schedule);
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

    return (
        <div className="container">
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

            {isSidebarOpen && <Sidebar onClose={closeSidebar} />}

            <div className="buttons">
                {['영화', '공연/예술', '운동', '사진/영상', '음식', '게임오락', '자기계발', '책/글'].map((topic) => (
                    <button
                        key={topic}
                        className={`topic-button ${selectedTopic === topic ? 'selected' : ''}`}
                        onClick={() => handleTopicClick(topic)}
                    >
                        {topic}
                    </button>
                ))}
            </div>

            <div className="schedule-buttons">
                {['주말모임', '마감된 모임 제외', '당일모임', '평일모임'].map((schedule) => (
                    <button
                        key={schedule}
                        className={`schedule-button ${selectedSchedule === schedule ? 'selected' : ''}`}
                        onClick={() => handleScheduleClick(schedule)}
                    >
                        {schedule}
                    </button>
                ))}
            </div>

            <div id="results">
                {results.map((result, index) => (
                    <div key={index} className="result-item">{result}</div>
                ))}
            </div>
        </div>
    );
};

export default SearchScreen;
