import React, { useState } from 'react';
import './Onboarding5Screen.css'; // CSS 파일을 가져옵니다.
import { useNavigate } from 'react-router-dom'; 

const Onboarding5Screen = () => {
const [substance, setSubstance] = useState('');
const handleInputChange = (e) => {
    setSubstance(e.target.value);
};

const navigate = useNavigate(); 

return (
    <div>
        <div className="title-box">
            <h1>모든 정보 입력이 끝났어요!</h1>
            <div className="progress-bar">
                <div className="progress" style={{ width: '100%' }}></div>
            </div>
        </div>
        <div className="message">
            <p>비밀번호 설정 및 인증을 완료하였습니다.</p>
        </div>
        <div className="message">
            <p>모든 프로필 설정을 완료하였습니다.</p>
        </div>
        <div className="container">
            <p className="substance">초록색 토끼님의</p>
            <p className="substance">한마디</p>
            <input
                type="text"
                id="substance"
                placeholder="나의 한마디!"
                required
                value={substance}
                onChange={handleInputChange}
            />
        </div>
    </div>
);
};

export default FinalStep;