import React, { useEffect, useState } from 'react';
import './BellSidebar.css';
import { useNavigate } from 'react-router-dom';

const BellSidebar = ({ isOpen, closeBellSidebar }) => {

    const navigate = useNavigate();
    const [meetings, setMeetings] = useState([]);
    const [isChatActive, setIsChatActive] = useState(false);
    const [isAlertActive, setIsAlertActive] = useState(false);

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await fetch('https://your-api-endpoint/meetings'); 
                const data = await response.json();
                setMeetings(data);
            } catch (error) {
                console.error('Error fetching meetings:', error);
            }
        };

        if (isOpen) {
            fetchMeetings();
        }
    }, [isOpen]);

    const handleChatClick = () => {
        setIsChatActive(true);
        setIsAlertActive(false);
    };

    const handleAlertClick = () => {
        setIsAlertActive(true);
        setIsChatActive(false);
    };
    const closeBell = () => {
        closeBellSidebar(); // Ensure this function is passed correctly
        navigate('/main');
    };



    return (
        <div className={`bellsidebar ${isOpen ? 'open' : ''}`}>
            <div className="bellsidebar-1">
                <button
                    className={`bellsidebar-1-btn ${isChatActive ? 'active' : ''}`}
                    onClick={handleChatClick}>   채팅
                </button>
                <button
                    className={`bellsidebar-alert-btn ${isAlertActive ? 'active' : ''}`}
                    onClick={handleAlertClick}>    알림
                </button>
            </div>

            <div className="bellsidebar-2">
                <ul>

                <li className="meeting-item">
                        <img src="https://via.placeholder.com/50" alt="Meeting" className="meeting-image" /> {/* Replace with your image URL */}
                        <div className="meeting-details">
                            <h4 className="meeting-title">모임 제목</h4> {/* Replace with your title */}
                            <p className="meeting-description">모임 설명 내용입니다.</p> {/* Replace with your description */}
                        </div>
                    </li>


                    {meetings.map((meeting) => (
                        <li key={meeting.id} className="meeting-item">
                            <img src={meeting.image} alt={meeting.title} className="meeting-image" />
                            <div className="meeting-details">
                                <h4 className="meeting-title">{meeting.title}</h4>
                                <p className="meeting-description">{meeting.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bellsidebar-3">
                <button
                    className={`bellsidebar-3-btn`}
                    onClick={closeBell}>   닫기
                </button>
            
            </div>
        </div>
    );
};

export default BellSidebar;
