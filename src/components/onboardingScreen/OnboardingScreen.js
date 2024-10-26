import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingScreen.css';

function OnboardingScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const validCode = "123456"; // 실제로는 서버에서 발급받아야 함

    if (code === validCode) {
      setMessage(`인증 성공! ${name}님 환영합니다.`);
      setTimeout(() => {
        navigate('/onboardingPw'); 
      }, 8000); 
    } else {
      setMessage('인증 실패. 인증번호를 확인하세요.'); // 이 부분을 else 블록으로 이동
    }
  };

  return (
    <div className="App">
      <div className="title-box">
        <h1>기본 정보를 입력해주세요.</h1>
        <div className="progress-bar">
          <div className="progress" style={{ width: '25%' }}></div>
        </div>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="name-email-group">
            <div className="form-group">
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                placeholder="홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">학교 이메일</label>
              <input
                type="email"
                id="email"
                placeholder="example@naver.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group code-group">
            <label htmlFor="code"></label>
            <input
              type="text"
              id="code"
              className="code-input"
              placeholder="인증번호를 입력하세요."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn">인증하기</button>
          </div>
        </form>
        <p id="message">{message}</p>
      </div>
    </div>
  );
}

export default OnboardingScreen;
