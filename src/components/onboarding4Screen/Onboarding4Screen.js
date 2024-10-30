import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Onboarding4Screen.css'; // Ensure you have this CSS file

const Onboarding4Screen = () => {
const navigate = useNavigate(); 

const [name, setName] = useState('');
const [school, setSchool] = useState('');
const [major, setMajor] = useState('');
const [date, setDate] = useState('');
const [gender, setGender] = useState('');
const [message, setMessage] = useState('');
const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., validation, API call, etc.)
    setMessage('정보가 성공적으로 저장되었습니다!');
};

return (
    <div>
        <div className="title-box">
            <h1>기본 정보를 입력해주세요.</h1>
            <div className="progress-bar">
                <div className="progress" style={{ width: '75%' }}></div>
            </div>
        </div>
        <div className="message">
            <p>비밀번호 설정 및 인증을 완료하였습니다.</p>
        </div>
        <div className="container">
            <form id="authForm" onSubmit={handleSubmit}>
                <div className="name-email-group">
                    <div className="form-group">
                        <label htmlFor="name">상태 메시지와 프로필 사진을 골라주세요.</label>
                        <p className="text5">(상태메세지는 최대 16자)</p>
                        <input
                            type="text"
                            id="name"
                            placeholder="나의 한마디!"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <img
                            className="img"
                            src="<https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA1MTVfMTQw%2FMDAxNjg0MTA0ODEyMjYy.d91ak0ZAsuQUCXVHqdRAeYJyrk3Ooze7KjaPs1g41jQg.YOrbssXVNrIrTSVPVTmvCAdt70HTpFhmxNDA-iwFT14g.JPEG.utinging12%2FIMG_7698.JPG&type=sc960_832>"
                            alt="Profile"
                        />
                    </div>

                    <div className="form-group flex-row">
                        <div>
                            <label htmlFor="school">학교</label>
                            <input
                                type="text"
                                id="school"
                                required
                                value="가톨릭대학교" 
                                readOnly 
                                style={{ fontSize: '13px' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="major">학과</label>
                            <input
                                type="text"
                                id="major"
                                required
                                value={major}
                                onChange={(e) => setMajor(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group flex-row">
                        <div>
                            <label htmlFor="date">생년월일</label>
                            <input
                                type="text"
                                id="date"
                                placeholder="YYMMDD"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="gender">성별</label>
                            <input
                                type="text"
                                id="gender"
                                required
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="button-group">
                        <button type="submit" className="btn">다음으로</button>
                    </div>
                </div>
            </form>
            <p id="message">{message}</p>
        </div>
    </div>
);
};

export default Onboarding4Screen;
