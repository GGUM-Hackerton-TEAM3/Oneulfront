import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LoginScreen.css';

const LoginScreen = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = () => {
        console.log('email:', email);
        console.log('Password:', password);
        onLogin();
        navigate('/main')
    };


    const handleJoin = () => {
        navigate('/onboarding')
    };


    
    return (
        <div className="login-screen">
          <div className="login-tag" style={{ left: '255px', top: '72px', width: '113px', borderColor: '#83B987' }}>#보드게임</div>
          <div className="login-tag" style={{ left: '196px', top: '169px', width: '156px', borderColor: '#93C296' }}>#근처에서_봐요</div>
          <div className="login-tag" style={{ left: '33px', top: '169px', width: '78px', borderColor: '#83B987' }}>#조깅</div>
          <div className="login-tag" style={{ left: '93px', top: '116px', width: '95px', borderColor: '#93C296' }}>#달리기</div>
    
            <div className="login-container">
                <input
                    type="email"
                    placeholder="아이디를 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                />
            </div>
            <div className="login-container">
                <input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
            </div>
            <button onClick={handleLogin} className="login-button">로그인</button>
           

           
           
            <div className="footer">
                <a href="/signup" className="footer-link1" onClick={handleJoin}>회원가입</a>
                <a href="/find-account" className="footer-link2">계정찾기</a>
            </div>
        </div>
    );
};

export default LoginScreen;
