import React, { useState } from 'react';
import './Onboarding3Screen.css';
import { useNavigate } from 'react-router-dom';


const Onboarding3Screen = () => {
const navigate = useNavigate(); 

const [nickname, setNickname] = useState('');
const [message, setMessage] = useState('');
const handleSubmit = (e) => {
    e.preventDefault();
    if (nickname.length > 0 && nickname.length <= 5) {
        setMessage('닉네임이 설정되었습니다: ' + nickname);
    } else {
        setMessage('닉네임은 1자에서 5자 사이여야 합니다.');
    }
};

return (
    <div>
        <div className="title-box">
            <h1>기본 정보를 입력해주세요.</h1>
            <div className="progress-bar">
                <div className="progress" style={{ width: '50%' }}></div>
            </div>
        </div>
        <div className="message">
            <p>비밀번호 설정 및 인증을 완료하였습니다.</p>
        </div>
        <div className="container">
            <form id="authForm" onSubmit={handleSubmit}>
                <div className="name-email-group">
                    <div className="form-group">
                        <label htmlFor="name">
                            당신의 닉네임을 설정해주세요. <span className="text5">(최대 5자)</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="닉네임"
                            required
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                        <div className="button-group">
                            <button type="submit" className="btn">다음으로</button>
                        </div>
                    </div>
                </div>
            </form>
            {message && <p id="message">{message}</p>}
        </div>
    </div>
);
};

export default Onboarding3Screen;