import React, { useState } from 'react';
import './OnboardingPwScreen.css';
import { useNavigate } from 'react-router-dom';


const OnboardingPwScreen = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
        } else {
            setErrorMessage('');
            // 다음 단계로 진행하는 로직 추가
            alert('비밀번호가 일치합니다! 다음 단계로 진행합니다.');
        }
    };

    return (
        <div className="container">
            <div className="title-box">
                <h1>기본 정보를 입력해주세요.</h1>
                <div className="progress-bar">
                    <div className="progress" style={{ width: '50%' }}></div>
                </div>
            </div>

            <form id="authForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="password">
                        비밀번호를 입력해주세요. <span className="max-length">(최대 12자)</span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="a123455678901"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="code">비밀번호를 다시 한 번 입력해주세요.</label>
                    <input
                        type="password"
                        id="code"
                        className="code-input"
                        placeholder="a123455678901"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                {errorMessage && <p id="message">{errorMessage}</p>}

                <div className="button-group">
                    <button type="submit" className="btn">다음으로</button>
                </div>
            </form>
        </div>
    );
};

export default OnboardingPwScreen;
