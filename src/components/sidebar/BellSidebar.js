import React, { useEffect, useState } from 'react';
import './BellSidebar.css';
import { useNavigate } from 'react-router-dom';

const BellSidebar = ({ isOpen, closeBellSidebar }) => {

    const navigate = useNavigate();
    const [meetings, setMeetings] = useState([]);
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


    const handleAlertClick = () => {
        setIsAlertActive(true);
    };
    const handleCloseBellSidebar = () => {
        closeBellSidebar(); 
        navigate('/main');
    };



    return (
        <div className={`bellsidebar ${isOpen ? 'open' : ''}`}>
            <div className="bellsidebar-1">
                <p>
                    참여 목록
                </p>
            </div>

            <div className="bellsidebar-2">
                <ul>

                <li className="meeting-item">
                        <img src="/drawing.png" alt="Meeting" className="meeting-image" /> {/* Replace with your image URL */}
                        <div className="meeting-details">
                            <h4 className="meeting-title">멍충거위</h4> {/* Replace with your title */}
                            <p className='meeting-p'>귀여운 드로잉해요</p>
                        </div>
                    </li>


                    {meetings.map((meeting) => (
                        <li key={meeting.id} className="meeting-item">
                            <img src={meeting.image} alt={meeting.title} className="meeting-image" />
                            <div className="meeting-details">
                                <h4 className="meeting-title">{meeting.title}</h4>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bellsidebar-3">
                <button
                    className={`bellsidebar-3-btn`}
                    onClick={handleCloseBellSidebar}>   닫기
                </button>
            
            </div>
        </div>
    );
};

export default BellSidebar;
